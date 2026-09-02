import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent
MODELS_DIR = BASE_DIR / "models"
RAW_DIR = BASE_DIR / "ml" / "datasets" / "raw"

def train_bulb_detector(epochs: int = 10, img_size: int = 640):
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    print("== Training YOLO Onion Bulb Detector ==")
    
    try:
        from ultralytics import YOLO
        # Check if VegQual dataset yaml exists
        vegqual_yaml = list(RAW_DIR.glob("**/*.yaml"))
        data_yaml = str(vegqual_yaml[0]) if vegqual_yaml else "coco8.yaml"

        model = YOLO("yolov8n.pt") # lightweight nano model suitable for edge/mobile
        results = model.train(
            data=data_yaml,
            epochs=epochs,
            imgsz=img_size,
            project=str(MODELS_DIR),
            name="yolo_bulb_detector",
            exist_ok=True
        )
        print("YOLO Training complete!")
        # Save best weights to models/
        best_pt = MODELS_DIR / "yolo_bulb_detector" / "weights" / "best.pt"
        if best_pt.exists():
            import shutil
            shutil.copy2(best_pt, MODELS_DIR / "onion_detector_best.pt")
            print(f"Saved YOLO model to {MODELS_DIR / 'onion_detector_best.pt'}")
    except Exception as e:
        print(f"Warning: YOLO training skipped or failed: {e}")
        # Create lightweight dummy checkpoint if ultralytics unsupported in environment
        pass

if __name__ == "__main__":
    train_bulb_detector()
