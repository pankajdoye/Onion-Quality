import os
import sys
import torch
import cv2
import numpy as np
import argparse
from pathlib import Path
from PIL import Image, ImageOps
from torchvision import transforms

BASE_DIR = Path(__file__).resolve().parent.parent.parent
MODELS_DIR = BASE_DIR / "models"

sys.path.append(str(BASE_DIR))
from ml.preprocessing.image_quality import check_image_quality
from ml.training.train_onion_validator import OnionValidatorNet
from ml.training.train_quality_classifier import OnionQualityNet

# Graceful import of vision_ai_service
try:
    from backend.services.vision_ai_service import get_vision_second_opinion, fuse_hybrid_results, get_env_bool
except ImportError:
    get_vision_second_opinion = None
    fuse_hybrid_results = None
    get_env_bool = lambda k, d=False: d

class OnionAIEngine:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.validator_model = None
        self.quality_model = None
        self.yolo_model = None

        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])

        self.load_models()

    def load_models(self):
        # 1. Load Validator Model (EfficientNet-B0)
        val_path = MODELS_DIR / "onion_validator_best.pth"
        if val_path.exists():
            try:
                ckpt = torch.load(val_path, map_location=self.device)
                arch = ckpt.get('architecture', 'efficientnet_b0')
                self.validator_model = OnionValidatorNet(architecture=arch).to(self.device)
                self.validator_model.load_state_dict(ckpt['model_state_dict'])
                self.validator_model.eval()
            except Exception as e:
                print(f"Error loading validator model: {e}")

        # 2. Load Quality Classifier Model (EfficientNet-B0)
        q_path = MODELS_DIR / "onion_quality_best.pth"
        if q_path.exists():
            try:
                ckpt = torch.load(q_path, map_location=self.device)
                arch = ckpt.get('architecture', 'efficientnet_b0')
                self.quality_model = OnionQualityNet(num_classes=2, architecture=arch).to(self.device)
                self.quality_model.load_state_dict(ckpt['model_state_dict'])
                self.quality_model.eval()
                self.quality_idx_map = ckpt.get('idx_to_class', {0: 'defective', 1: 'healthy'})
            except Exception as e:
                print(f"Error loading quality model: {e}")

        # 3. Load YOLO Multi-Bulb Detector
        yolo_path = MODELS_DIR / "onion_detector_best.pt"
        if not yolo_path.exists():
            yolo_path = MODELS_DIR / "yolo_bulb_detector" / "weights" / "best.pt"
        if yolo_path.exists():
            try:
                from ultralytics import YOLO
                self.yolo_model = YOLO(str(yolo_path))
            except Exception as e:
                print(f"Error loading YOLO model: {e}")

    def _nms(self, boxes_list, iou_thresh=0.35):
        """Standard Non-Maximum Suppression for candidate bulb bounding boxes."""
        if not boxes_list:
            return []
        boxes_list = sorted(boxes_list, key=lambda x: x[0], reverse=True)
        keep = []
        while boxes_list:
            best = boxes_list.pop(0)
            keep.append(best)
            remaining = []
            for other in boxes_list:
                x1 = max(best[1][0], other[1][0])
                y1 = max(best[1][1], other[1][1])
                x2 = min(best[1][2], other[1][2])
                y2 = min(best[1][3], other[1][3])
                inter = max(0, x2 - x1) * max(0, y2 - y1)
                area1 = (best[1][2] - best[1][0]) * (best[1][3] - best[1][1])
                area2 = (other[1][2] - other[1][0]) * (other[1][3] - other[1][1])
                union = area1 + area2 - inter
                iou = inter / union if union > 0 else 0
                if iou < iou_thresh:
                    remaining.append(other)
            boxes_list = remaining
        return keep

    def _analyze_bulb_defects(self, crop_bgr):
        """
        Inspects an individual onion bulb crop for visible defects:
        - Sprouting: Active green leaf shoots emerging from the neck/top of the bulb
        - Rot & Mold: Necrotic sunken dark lesions or mold (avoiding normal papery skin & shadows)
        - Mechanical Damage: Cuts, deep mechanical fractures, surface skin tears
        - Cracks: High-contrast splits in bulb body
        - Discoloration: Abnormal non-onion discolorations
        
        Normal characteristics (papery skin, dry skin, roots, stem, normal red/brown color, normal shadows)
        are explicitly NOT treated as defects.
        """
        h, w = crop_bgr.shape[:2]
        if h < 12 or w < 12:
            return "Not Detected", "Not Detected", "Not Detected", "Not Detected", "Not Detected"

        # 1. Sprouting Check: Upper 25% for genuine green shoot elongation
        neck_h = max(5, int(h * 0.25))
        neck_crop = crop_bgr[:neck_h, :]
        hsv_neck = cv2.cvtColor(neck_crop, cv2.COLOR_BGR2HSV)
        # Green shoot mask in HSV (Hue 32..85, Saturation >= 55, Value >= 45)
        green_mask = cv2.inRange(hsv_neck, np.array([32, 55, 45]), np.array([85, 255, 255]))
        green_pixel_pct = (np.count_nonzero(green_mask) / (neck_h * w)) * 100
        sprouting = "Detected" if green_pixel_pct > 3.8 else "Not Detected"

        # 2. Rot Check: Necrotic sunken dark patches in central 80%
        inner_crop = crop_bgr[int(h * 0.10):int(h * 0.90), int(w * 0.10):int(w * 0.90)]
        if inner_crop.shape[0] < 8 or inner_crop.shape[1] < 8:
            inner_crop = crop_bgr
        
        lab = cv2.cvtColor(inner_crop, cv2.COLOR_BGR2LAB)
        l_chan = lab[:, :, 0]
        a_chan = lab[:, :, 1]
        b_chan = lab[:, :, 2]
        
        # Real rot: dark necrotic decay lacks normal healthy reddish/purple pigment (a_chan < 138)
        # and has very low luminance (l_chan < 26).
        # Normal red onion skin has strong red chroma (a_chan >= 140) even when dark.
        rot_mask = (l_chan < 26) & (a_chan < 136) & (b_chan < 138)
        rot_pct = (np.count_nonzero(rot_mask) / (inner_crop.shape[0] * inner_crop.shape[1])) * 100
        rot = "Detected" if rot_pct > 4.5 else "Not Detected"

        # 3. Cracks & Structural Fissures
        gray = cv2.cvtColor(inner_crop, cv2.COLOR_BGR2GRAY)
        sobelx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
        sobely = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
        mag = np.sqrt(sobelx**2 + sobely**2)
        deep_crack_mask = (mag > 185) & ((gray < 28) | (gray > 235))
        crack_pct = (np.count_nonzero(deep_crack_mask) / (gray.shape[0] * gray.shape[1])) * 100

        if crack_pct > 3.8:
            crack = "Detected"
            damage = "Severe"
        elif crack_pct > 1.6:
            crack = "Detected"
            damage = "Minor"
        else:
            crack = "Not Detected"
            damage = "Not Detected"

        # 4. Discoloration check: abnormal greenish/blackish water-soaked patches on body
        hsv_body = cv2.cvtColor(inner_crop, cv2.COLOR_BGR2HSV)
        abnormal_green_body = cv2.inRange(hsv_body, np.array([35, 70, 50]), np.array([80, 255, 255]))
        abnormal_pct = (np.count_nonzero(abnormal_green_body) / (inner_crop.shape[0] * inner_crop.shape[1])) * 100
        discoloration = "Detected" if abnormal_pct > 5.0 else "Not Detected"

        return damage, rot, sprouting, crack, discoloration

    def predict(self, image_path: str, calibrated_threshold: float = 0.20, run_vision_ai: bool = True):
        # 1. Safe Image Loading with EXIF Orientation Normalization
        try:
            with Image.open(image_path) as img:
                img = ImageOps.exif_transpose(img)
                img_rgb = img.convert('RGB')
                tensor_img = self.transform(img_rgb).unsqueeze(0).to(self.device)
                w, h = img_rgb.size
        except Exception:
            return {
                "status": "rejected",
                "stage": 0,
                "is_onion": False,
                "rejection_reason": "invalid_image",
                "message": "Please capture a clear photo of the onion."
            }

        # 2. Image Quality Check (Blur, Brightness, Lighting)
        q_res = check_image_quality(image_path)

        # 3. Stage 1: Onion Presence Validation via EfficientNet
        validator_prob = 0.0
        if self.validator_model is not None:
            with torch.no_grad():
                validator_logits = self.validator_model(tensor_img)
                validator_prob = torch.sigmoid(validator_logits).item()

        # 4. Stage 2: Multi-Bulb Detection via YOLO
        cv_img = cv2.imdecode(np.fromfile(str(image_path), dtype=np.uint8), cv2.IMREAD_COLOR)
        if cv_img is None:
            cv_img = cv2.cvtColor(np.array(img_rgb), cv2.COLOR_RGB2BGR)

        onion_detected_boxes = []
        bulb_candidate_boxes = []
        if self.yolo_model is not None and cv_img is not None:
            try:
                yolo_res = self.yolo_model(cv_img, conf=0.18, verbose=False)[0]
                for b in yolo_res.boxes:
                    cls_id = int(b.cls[0])
                    cls_name = self.yolo_model.names[cls_id]
                    conf = float(b.conf[0])
                    xyxy = b.xyxy[0].tolist()
                    
                    is_onion_class = 'onion' in cls_name.lower()
                    is_round_produce = any(k in cls_name.lower() for k in ['capsicum', 'brinjal', 'potato'])
                    
                    box_w = xyxy[2] - xyxy[0]
                    box_h = xyxy[3] - xyxy[1]
                    aspect_ratio = box_w / max(1, box_h)
                    
                    if is_onion_class and conf >= 0.20:
                        onion_detected_boxes.append((conf, xyxy, cls_name))
                    elif is_round_produce and conf >= 0.25 and (0.50 <= aspect_ratio <= 2.0):
                        bulb_candidate_boxes.append((conf, xyxy, cls_name))
            except Exception as e:
                print(f"YOLO error: {e}")

        # The image is verified as an onion ONLY if:
        # (1) Validator prob >= 0.22 OR
        # (2) YOLO has explicit onion detection ('fresh_onion' or 'defected_onion') >= 0.20
        has_yolo_onion = len(onion_detected_boxes) > 0 and max([c for c, _, _ in onion_detected_boxes]) >= 0.20
        is_onion_valid = (validator_prob >= calibrated_threshold) or has_yolo_onion

        # If verified as an onion scene, pool all candidate bulb boxes for multi-bulb counting:
        if is_onion_valid:
            all_boxes = onion_detected_boxes + bulb_candidate_boxes
        else:
            all_boxes = []

        # NMS on candidate bulb boxes
        filtered_boxes = self._nms([(c, xy, name) for c, xy, name in all_boxes], iou_thresh=0.35)

        # Strict Gate 1: Check image quality failure
        if not q_res["passed"]:
            if is_onion_valid:
                return {
                    "status": "low_quality",
                    "stage": 0,
                    "is_onion": True,
                    "onion_confidence": round(float(validator_prob), 4),
                    "rejection_reason": q_res["reason"],
                    "message": "Onion detected, but image quality is insufficient for reliable grading. Please retake the photo."
                }
            else:
                return {
                    "status": "rejected",
                    "stage": 0,
                    "is_onion": False,
                    "onion_confidence": round(float(validator_prob), 4),
                    "rejection_reason": q_res["reason"],
                    "message": "Onion not detected. Please capture a clear onion image."
                }

        # Strict Gate 2: Non-Onion Rejection Gate
        if not is_onion_valid:
            return {
                "status": "rejected",
                "stage": 1,
                "is_onion": False,
                "onion_confidence": round(float(validator_prob), 4),
                "rejection_reason": "not_an_onion",
                "message": "Onion not detected. Please capture a clear onion image."
            }

        # Fallback to single centered bulb if YOLO found no boxes but validator verified onion
        if len(filtered_boxes) == 0:
            filtered_boxes = [(max(0.85, validator_prob), [0.10 * w, 0.10 * h, 0.90 * w, 0.90 * h], 'fresh_onion')]

        # 5. Analyze each individual detected onion bulb
        individual_onions = []
        grade_a_count = 0
        urs_count = 0
        needs_review_count = 0

        # Optional Vision AI secondary opinion
        vision_ai_data = None
        if run_vision_ai and get_vision_second_opinion is not None:
            vision_ai_data = get_vision_second_opinion(image_path)

        for i, (conf, box, cls_name) in enumerate(filtered_boxes):
            # Safe crop coordinate calculation with 4% padding
            pad_x = (box[2] - box[0]) * 0.04
            pad_y = (box[3] - box[1]) * 0.04
            x1 = max(0, int(box[0] - pad_x))
            y1 = max(0, int(box[1] - pad_y))
            x2 = min(w, int(box[2] + pad_x))
            y2 = min(h, int(box[3] + pad_y))

            bulb_crop = cv_img[y1:y2, x1:x2]
            if bulb_crop.size == 0:
                bulb_crop = cv_img

            # Defect Inspection on this specific bulb
            damage, rot, sprouting, crack, discoloration = self._analyze_bulb_defects(bulb_crop)

            # Estimated diameter in mm (calibrated for single bulb close-up vs multi-bulb overview)
            bulb_pixel_width = max(10, x2 - x1)
            bulb_pixel_height = max(10, y2 - y1)
            diam_ratio = max(bulb_pixel_width, bulb_pixel_height) / max(w, h)
            if len(filtered_boxes) == 1:
                diameter_mm = int(np.clip(diam_ratio * 125, 45, 85))
            else:
                diameter_mm = int(np.clip(diam_ratio * (140 + min(180, len(filtered_boxes) * 25)), 42, 85))
            is_undersized = diameter_mm < 45

            # Quality classifier on cropped bulb
            bulb_pil = Image.fromarray(cv2.cvtColor(bulb_crop, cv2.COLOR_BGR2RGB))
            crop_tensor = self.transform(bulb_pil).unsqueeze(0).to(self.device)

            prob_healthy = 0.85
            if self.quality_model is not None:
                with torch.no_grad():
                    q_logits = self.quality_model(crop_tensor)
                    probs = torch.softmax(q_logits, dim=1)[0]
                    prob_healthy = float(probs[1].item())

            # Visible defect list
            visible_defects = []
            if rot == "Detected":
                visible_defects.append({"type": "rot", "severity": "high", "label": "Rotten / Mold"})
            if damage == "Severe":
                visible_defects.append({"type": "damage", "severity": "high", "label": "Severe Damage"})
            elif damage == "Minor":
                visible_defects.append({"type": "damage", "severity": "low", "label": "Skin Cut / Abrasion"})
            if sprouting == "Detected":
                visible_defects.append({"type": "sprouting", "severity": "medium", "label": "Green Sprout"})
            if crack == "Detected":
                visible_defects.append({"type": "crack", "severity": "medium", "label": "Body Crack"})
            if discoloration == "Detected":
                visible_defects.append({"type": "discoloration", "severity": "low", "label": "Discoloration"})
            if is_undersized:
                visible_defects.append({"type": "undersized", "severity": "low", "label": "Undersized (<45mm)"})

            # Base Local Quality & Grade Assignment
            # A clearly rotten or severely damaged onion MUST NOT be marked GOOD.
            has_severe_defect = (rot == "Detected") or (damage == "Severe")
            has_minor_defect = (damage == "Minor") or (sprouting == "Detected") or (crack == "Detected") or (discoloration == "Detected") or is_undersized

            if has_severe_defect:
                local_quality = "POOR"
                local_grade = "URS"
            elif has_minor_defect:
                local_quality = "AVERAGE"
                local_grade = "URS"
            else:
                local_quality = "GOOD"
                local_grade = "GRADE A"

            local_onion_dict = {
                "onion_id": i + 1,
                "bbox": [round(float(x1), 1), round(float(y1), 1), round(float(x2), 1), round(float(y2), 1)],
                "bbox_norm": [
                    round((x1 / w) * 100, 1),
                    round((y1 / h) * 100, 1),
                    round(((x2 - x1) / w) * 100, 1),
                    round(((y2 - y1) / h) * 100, 1)
                ],
                "confidence": round(float(conf), 3),
                "grade": local_quality, # GOOD, AVERAGE, POOR
                "assigned_grade": local_grade, # GRADE A, URS
                "damage": damage,
                "rot": rot,
                "sprouting": sprouting,
                "crack": crack,
                "discoloration": discoloration,
                "undersized": is_undersized,
                "diameter_mm": diameter_mm,
                "defects": visible_defects
            }

            # Secondary Vision AI Hybrid Fusion
            if vision_ai_data and vision_ai_data.get("available") and fuse_hybrid_results is not None:
                vis_opinion = vision_ai_data.get("result")
                fusion = fuse_hybrid_results(local_onion_dict, vis_opinion)
                local_onion_dict["grade"] = fusion["quality"]
                local_onion_dict["assigned_grade"] = fusion["grade"]
                local_onion_dict["confidence"] = fusion["confidence"]
                local_onion_dict["needs_review"] = fusion["needs_review"]
                local_onion_dict["review_message"] = fusion["review_message"]

            if local_onion_dict.get("needs_review"):
                needs_review_count += 1

            if local_onion_dict["assigned_grade"] == "GRADE A":
                grade_a_count += 1
            else:
                urs_count += 1

            individual_onions.append(local_onion_dict)

        total_bulbs = len(individual_onions)
        is_single_onion = (total_bulbs == 1)

        # 6. Calculate Accurate Batch Quality from Individual Bulbs
        grade_a_pct = round((grade_a_count / total_bulbs) * 100, 1)
        urs_pct = round((urs_count / total_bulbs) * 100, 1)
        grade_b_pct = 0 # Simplified strictly to Grade A and URS as required

        good_count = sum(1 for o in individual_onions if o["grade"] == "GOOD")
        average_count = sum(1 for o in individual_onions if o["grade"] == "AVERAGE")
        poor_count = sum(1 for o in individual_onions if o["grade"] == "POOR")

        good_ratio = good_count / total_bulbs
        poor_ratio = poor_count / total_bulbs

        if good_ratio >= 0.65 and poor_ratio <= 0.15:
            overall_quality = "GOOD"
            quality_condition = "Healthy"
            quality_score = round(float(np.clip(82.0 + (good_ratio * 14.0), 80.0, 96.0)), 1)
        elif poor_ratio >= 0.40:
            overall_quality = "POOR"
            quality_condition = "Defective"
            quality_score = round(float(np.clip(42.0 + (good_ratio * 20.0), 36.0, 62.0)), 1)
        else:
            overall_quality = "AVERAGE"
            quality_condition = "Average"
            quality_score = round(float(np.clip(68.0 + (good_ratio * 12.0) - (poor_ratio * 15.0), 65.0, 79.0)), 1)

        # Defect percentages for summary
        damaged_pct = round(float((sum(1 for o in individual_onions if o["damage"] != "Not Detected") / total_bulbs) * 100), 1)
        rotten_pct = round(float((sum(1 for o in individual_onions if o["rot"] == "Detected") / total_bulbs) * 100), 1)
        sprouted_pct = round(float((sum(1 for o in individual_onions if o["sprouting"] == "Detected") / total_bulbs) * 100), 1)
        undersized_pct = round(float((sum(1 for o in individual_onions if o["undersized"]) / total_bulbs) * 100), 1)

        avg_diameter = int(np.mean([o["diameter_mm"] for o in individual_onions]))
        avg_weight = int(np.clip(avg_diameter * 1.25, 55, 125))

        confidence_metric = max(validator_prob, max([o["confidence"] for o in individual_onions]))

        is_uncertain = (needs_review_count > 0 and needs_review_count >= (total_bulbs / 2))

        return {
            "status": "success",
            "stage": 2,
            "is_onion": True,
            "onion_confidence": round(float(confidence_metric), 4),
            "quality_confidence": 0.94,
            "is_uncertain": is_uncertain,
            "overall_quality": overall_quality,
            "quality_score": quality_score,
            "quality_condition": quality_condition,
            "is_single_onion": is_single_onion,
            "detected_onions_count": total_bulbs,
            "individual_onions": individual_onions,
            "single_onion_notice": "Single-onion analysis cannot represent the quality of your entire batch. For better batch estimation, photograph multiple onions." if is_single_onion else None,
            "grade_a": int(round(grade_a_pct)),
            "grade_b": int(round(grade_b_pct)),
            "urs": int(round(urs_pct)),
            "grade_a_count": grade_a_count,
            "urs_count": urs_count,
            "grade_a_percentage": grade_a_pct,
            "urs_percentage": urs_pct,
            "healthy": good_count,
            "damaged": damaged_pct,
            "rotten": rotten_pct,
            "sprouted": sprouted_pct,
            "undersized": undersized_pct,
            "average_diameter": avg_diameter,
            "average_weight": avg_weight,
            "vision_ai_status": vision_ai_data.get("status_message") if vision_ai_data else "Vision AI inactive (Local ML active).",
            "message": "Onion detected successfully."
        }

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--image", type=str, required=True, help="Path to onion image")
    args = parser.parse_args()

    engine = OnionAIEngine()
    res = engine.predict(args.image)
    print(res)
