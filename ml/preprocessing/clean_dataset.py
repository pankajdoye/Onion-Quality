import os
from pathlib import Path
from PIL import Image, ImageFile
import cv2

ImageFile.LOAD_TRUNCATED_IMAGES = True

BASE_DIR = Path(__file__).resolve().parent.parent.parent
RAW_DIR = BASE_DIR / "ml" / "datasets" / "raw"

def clean_images(directory: Path):
    print(f"Cleaning dataset at {directory}...", flush=True)
    removed_count = 0
    valid_count = 0

    for root, dirs, files in os.walk(directory):
        root_path = Path(root)
        rel_path = root_path.relative_to(RAW_DIR)
        parts = rel_path.parts
        if parts and parts[0] in ["extracted_rar", "vegqual_extracted"]:
            continue

        for f in files:
            file_path = root_path / f
            if file_path.suffix.lower() not in [".jpg", ".jpeg", ".png", ".bmp", ".webp"]:
                continue

            is_valid = True
            if file_path.stat().st_size == 0:
                is_valid = False

            if is_valid:
                try:
                    with Image.open(file_path) as img:
                        img.verify()
                except Exception:
                    is_valid = False

            if is_valid:
                img_cv = cv2.imread(str(file_path))
                if img_cv is None or img_cv.size == 0:
                    is_valid = False

            if not is_valid:
                print(f"Removing corrupted image: {file_path}", flush=True)
                try:
                    file_path.unlink()
                    removed_count += 1
                except Exception as e:
                    print(f"Failed to delete {file_path}: {e}", flush=True)
            else:
                valid_count += 1

    print(f"Clean complete. Total valid images: {valid_count}, Removed corrupted images: {removed_count}", flush=True)
    return valid_count, removed_count

if __name__ == "__main__":
    if RAW_DIR.exists():
        clean_images(RAW_DIR)
    else:
        print(f"Directory {RAW_DIR} does not exist. Run download_datasets.py first.", flush=True)
