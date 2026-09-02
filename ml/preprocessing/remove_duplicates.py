import os
import hashlib
from pathlib import Path
from PIL import Image
import imagehash

BASE_DIR = Path(__file__).resolve().parent.parent.parent
RAW_DIR = BASE_DIR / "ml" / "datasets" / "raw"

def get_md5_hash(file_path: Path) -> str:
    hasher = hashlib.md5()
    with open(file_path, 'rb') as f:
        buf = f.read(65536)
        while len(buf) > 0:
            hasher.update(buf)
            buf = f.read(65536)
    return hasher.hexdigest()

def remove_exact_duplicates(directory: Path):
    print(f"Removing exact duplicates in {directory}...", flush=True)
    seen_hashes = {}
    duplicates = []
    
    for root, dirs, files in os.walk(directory):
        root_path = Path(root)
        rel_path = root_path.relative_to(RAW_DIR)
        parts = rel_path.parts
        if parts and parts[0] in ["extracted_rar", "vegqual_extracted"]:
            continue

        for f in files:
            file_path = root_path / f
            if file_path.suffix.lower() in [".jpg", ".jpeg", ".png", ".bmp", ".webp"]:
                h = get_md5_hash(file_path)
                if h in seen_hashes:
                    duplicates.append(file_path)
                else:
                    seen_hashes[h] = file_path

    print(f"Found {len(duplicates)} exact duplicates.", flush=True)
    for dup in duplicates:
        try:
            dup.unlink()
        except Exception as e:
            print(f"Failed to delete {dup}: {e}", flush=True)
    return len(duplicates)

def remove_near_duplicates(directory: Path):
    print("Removing near-duplicates using perceptual hash buckets...", flush=True)
    seen_phashes = set()
    removed = 0

    for root, dirs, files in os.walk(directory):
        root_path = Path(root)
        rel_path = root_path.relative_to(RAW_DIR)
        parts = rel_path.parts
        if parts and parts[0] in ["extracted_rar", "vegqual_extracted"]:
            continue

        for f in files:
            file_path = root_path / f
            if file_path.suffix.lower() in [".jpg", ".jpeg", ".png", ".bmp", ".webp"]:
                try:
                    with Image.open(file_path) as img:
                        ph = str(imagehash.dhash(img))
                        if ph in seen_phashes:
                            file_path.unlink()
                            removed += 1
                        else:
                            seen_phashes.add(ph)
                except Exception:
                    pass
    print(f"Removed {removed} near-duplicate images.", flush=True)
    return removed

if __name__ == "__main__":
    if RAW_DIR.exists():
        remove_exact_duplicates(RAW_DIR)
        try:
            remove_near_duplicates(RAW_DIR)
        except Exception as e:
            print(f"Skipping near-duplicate check: {e}", flush=True)
    else:
        print(f"Directory {RAW_DIR} does not exist.", flush=True)
