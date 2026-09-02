import os
import sys
import shutil
import zipfile
import subprocess
import requests
import yaml
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent
RAW_DIR = BASE_DIR / "ml" / "datasets" / "raw"

ONION_LEAVES_BULB_SRC = BASE_DIR / "Onion Leaves and Bulb Dataset" / "New Onion - Copy"
ONION_DATASET_SRC = BASE_DIR / "Onion dataset" / "Onion dataset"

VEGQUAL_FIGSHARE_URL = "https://ndownloader.figshare.com/files/62799448"

def prepare_raw_datasets():
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    print(f"== Dataset Acquisition Starting at {RAW_DIR} ==", flush=True)

    onion_bulb_leaf_dst = RAW_DIR / "onion_bulb_leaf"
    vegqual_dst = RAW_DIR / "vegqual"
    (vegqual_dst / "onion_fresh").mkdir(parents=True, exist_ok=True)
    (vegqual_dst / "onion_defective").mkdir(parents=True, exist_ok=True)
    (vegqual_dst / "non_onion").mkdir(parents=True, exist_ok=True)

    # 1. Process VegQual Dataset
    vegqual_extract = RAW_DIR / "vegqual_extracted"
    yaml_files = list(vegqual_extract.glob("**/*.yaml"))
    
    if yaml_files:
        data_yaml_p = yaml_files[0]
        with open(data_yaml_p, 'r', encoding='utf-8') as f:
            yaml_data = yaml.safe_load(f)
        class_names = yaml_data.get('names', [])
        print(f"VegQual class list ({len(class_names)}): {class_names}", flush=True)

        image_files = list(vegqual_extract.glob("**/*.jpg")) + list(vegqual_extract.glob("**/*.png"))
        print(f"Sorting {len(image_files)} VegQual images...", flush=True)

        fresh_cnt = 0
        defective_cnt = 0
        non_onion_cnt = 0

        for img_p in image_files:
            # Locate label file
            label_p = img_p.parent.parent / "labels" / f"{img_p.stem}.txt"
            if not label_p.exists():
                label_p = img_p.parent / f"{img_p.stem}.txt"

            is_fresh_onion = False
            is_defected_onion = False
            is_non_onion = False

            if label_p.exists():
                with open(label_p, 'r') as lf:
                    for line in lf:
                        parts = line.strip().split()
                        if parts:
                            cls_id = int(parts[0])
                            if cls_id < len(class_names):
                                c_name = class_names[cls_id].lower()
                                if c_name == 'fresh_onion':
                                    is_fresh_onion = True
                                elif c_name == 'defected_onion':
                                    is_defected_onion = True
                                else:
                                    is_non_onion = True
                            elif cls_id in [4, 10]:
                                if cls_id == 10:
                                    is_fresh_onion = True
                                else:
                                    is_defected_onion = True
                            else:
                                is_non_onion = True

            if is_fresh_onion:
                shutil.copy2(img_p, vegqual_dst / "onion_fresh" / img_p.name)
                fresh_cnt += 1
            elif is_defected_onion:
                shutil.copy2(img_p, vegqual_dst / "onion_defective" / img_p.name)
                defective_cnt += 1
            elif is_non_onion:
                shutil.copy2(img_p, vegqual_dst / "non_onion" / img_p.name)
                non_onion_cnt += 1

        print(f"VegQual sorting finished: Fresh Onions={fresh_cnt}, Defective Onions={defective_cnt}, Non-Onions={non_onion_cnt}", flush=True)

    print("== Dataset Ingestion Complete ==", flush=True)

if __name__ == "__main__":
    prepare_raw_datasets()
