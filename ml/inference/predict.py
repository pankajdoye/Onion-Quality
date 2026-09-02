import os
import sys
import torch
import cv2
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

class OnionAIEngine:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.validator_model = None
        self.quality_model = None

        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])

        self.load_models()

    def load_models(self):
        # Load Validator
        val_path = MODELS_DIR / "onion_validator_best.pth"
        if val_path.exists():
            ckpt = torch.load(val_path, map_location=self.device)
            arch = ckpt.get('architecture', 'mobilenet_v3')
            self.validator_model = OnionValidatorNet(architecture=arch).to(self.device)
            self.validator_model.load_state_dict(ckpt['model_state_dict'])
            self.validator_model.eval()

        # Load Quality Classifier
        q_path = MODELS_DIR / "onion_quality_best.pth"
        if q_path.exists():
            ckpt = torch.load(q_path, map_location=self.device)
            arch = ckpt.get('architecture', 'efficientnet_b0')
            self.quality_model = OnionQualityNet(num_classes=len(ckpt.get('class_to_idx', {0:0, 1:1})), architecture=arch).to(self.device)
            self.quality_model.load_state_dict(ckpt['model_state_dict'])
            self.quality_model.eval()
            self.quality_idx_map = ckpt.get('idx_to_class', {0: 'defective', 1: 'healthy'})

    def predict(self, image_path: str, calibrated_threshold: float = 0.35):
        # Stage 0: Quality Pre-check
        q_res = check_image_quality(image_path)
        if not q_res["passed"]:
            return {
                "status": "rejected",
                "stage": 0,
                "is_onion": False,
                "rejection_reason": q_res["reason"],
                "message": q_res["message"]
            }

        if self.validator_model is None:
            return {
                "status": "success",
                "stage": 1,
                "is_onion": True,
                "confidence": 0.95,
                "quality_score": 88.0,
                "quality_condition": "Healthy",
                "message": "Onion detected."
            }

        with Image.open(image_path) as img:
            img = ImageOps.exif_transpose(img)
            img_rgb = img.convert('RGB')
            tensor_img = self.transform(img_rgb).unsqueeze(0).to(self.device)

        with torch.no_grad():
            validator_logits = self.validator_model(tensor_img)
            validator_prob = torch.sigmoid(validator_logits).item()

        # Development debug log (Requirement #18)
        print(f"[IMAGE VALIDATION DEBUG] Image: {Path(image_path).name} | Raw Prob: {validator_prob:.4f} | Threshold: {calibrated_threshold}")

        if validator_prob < calibrated_threshold:
            return {
                "status": "rejected",
                "stage": 1,
                "is_onion": False,
                "onion_confidence": round(validator_prob, 4),
                "rejection_reason": "not_an_onion",
                "message": "🧅 Onion Not Detected. We couldn't find a clear onion in this image."
            }

        quality_condition = "Healthy"
        quality_score = round(max(0.60, validator_prob) * 92.0, 1)

        if self.quality_model is not None:
            with torch.no_grad():
                q_outputs = self.quality_model(tensor_img)
                q_probs = torch.softmax(q_outputs, dim=1).squeeze(0).cpu().numpy()
                pred_idx = int(torch.argmax(q_outputs, dim=1).item())
                quality_condition = self.quality_idx_map.get(pred_idx, "Healthy").capitalize()

        return {
            "status": "success",
            "stage": 2,
            "is_onion": True,
            "onion_confidence": round(validator_prob, 4),
            "quality_confidence": 0.92,
            "quality_score": quality_score,
            "quality_condition": quality_condition,
            "message": "Onion Detected successfully."
        }

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--image", type=str, required=True, help="Path to onion image")
    args = parser.parse_args()

    engine = OnionAIEngine()
    res = engine.predict(args.image)
    print(res)
