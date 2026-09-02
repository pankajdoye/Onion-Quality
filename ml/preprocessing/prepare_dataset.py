import os
import random
import shutil
from pathlib import Path
from collections import defaultdict

BASE_DIR = Path(__file__).resolve().parent.parent.parent
RAW_DIR = BASE_DIR / "ml" / "datasets" / "raw"
DATASETS_DIR = BASE_DIR / "ml" / "datasets"

TRAIN_RATIO = 0.70
VAL_RATIO = 0.15
TEST_RATIO = 0.15

def split_and_copy_stratified(files, task_name, class_name):
    random.seed(42)
    shuffled_files = list(files)
    random.shuffle(shuffled_files)

    n_total = len(shuffled_files)
    n_train = int(n_total * TRAIN_RATIO)
    n_val = int(n_total * VAL_RATIO)

    train_files = shuffled_files[:n_train]
    val_files = shuffled_files[n_train:n_train + n_val]
    test_files = shuffled_files[n_train + n_val:]

    split_map = {
        "train": train_files,
        "validation": val_files,
        "test": test_files
    }

    counts = {"train": 0, "validation": 0, "test": 0}

    for split_name, f_list in split_map.items():
        dst_dir = DATASETS_DIR / split_name / task_name / class_name
        # Clear existing split folder first
        if dst_dir.exists():
            shutil.rmtree(dst_dir)
        dst_dir.mkdir(parents=True, exist_ok=True)
        
        for src_p in f_list:
            shutil.copy2(src_p, dst_dir / src_p.name)
            counts[split_name] += 1

    return counts

def prepare_splits():
    print("== Preparing Datasets Splits (70% Train / 15% Val / 15% Test) ==", flush=True)

    onion_files = []
    non_onion_files = []

    bulb_leaf_dir = RAW_DIR / "onion_bulb_leaf"
    vegqual_dir = RAW_DIR / "vegqual"

    if bulb_leaf_dir.exists():
        onion_files.extend(list(bulb_leaf_dir.glob("**/*.jpg")) + list(bulb_leaf_dir.glob("**/*.png")))
    if vegqual_dir.exists():
        onion_files.extend(list((vegqual_dir / "onion_fresh").glob("*.*")))
        onion_files.extend(list((vegqual_dir / "onion_defective").glob("*.*")))
        non_onion_files.extend(list((vegqual_dir / "non_onion").glob("*.*")))

    print(f"Total ONION images collected: {len(onion_files)}", flush=True)
    print(f"Total NON_ONION images collected: {len(non_onion_files)}", flush=True)

    # 1. Onion Validator Task (onion vs non_onion)
    c_on = split_and_copy_stratified(onion_files, "validator", "onion")
    c_non = split_and_copy_stratified(non_onion_files, "validator", "non_onion")

    print(f"Validator dataset split: ONION {c_on}, NON_ONION {c_non}", flush=True)

    # 2. Image Type Classifier (bulb vs leaf vs non_onion)
    bulb_files = []
    leaf_files = []
    if bulb_leaf_dir.exists():
        bulb_files.extend(list((bulb_leaf_dir / "bulb_healthy").glob("*.*")))
        bulb_files.extend(list((bulb_leaf_dir / "bulb_unhealthy").glob("*.*")))
        leaf_files.extend(list((bulb_leaf_dir / "leaf_healthy").glob("*.*")))
        leaf_files.extend(list((bulb_leaf_dir / "leaf_unhealthy").glob("*.*")))
    if vegqual_dir.exists():
        bulb_files.extend(list((vegqual_dir / "onion_fresh").glob("*.*")))
        bulb_files.extend(list((vegqual_dir / "onion_defective").glob("*.*")))

    split_and_copy_stratified(bulb_files, "type", "bulb")
    split_and_copy_stratified(leaf_files, "type", "leaf")
    split_and_copy_stratified(non_onion_files, "type", "non_onion")

    # 3. Bulb Quality Classifier (healthy vs defective)
    healthy_bulbs = []
    defective_bulbs = []
    if bulb_leaf_dir.exists():
        healthy_bulbs.extend(list((bulb_leaf_dir / "bulb_healthy").glob("*.*")))
        defective_bulbs.extend(list((bulb_leaf_dir / "bulb_unhealthy").glob("*.*")))
    if vegqual_dir.exists():
        healthy_bulbs.extend(list((vegqual_dir / "onion_fresh").glob("*.*")))
        defective_bulbs.extend(list((vegqual_dir / "onion_defective").glob("*.*")))

    split_and_copy_stratified(healthy_bulbs, "quality", "healthy")
    split_and_copy_stratified(defective_bulbs, "quality", "defective")

    # 4. Leaf Classifier (leaf_healthy vs leaf_unhealthy)
    healthy_leaves = []
    unhealthy_leaves = []
    if bulb_leaf_dir.exists():
        healthy_leaves.extend(list((bulb_leaf_dir / "leaf_healthy").glob("*.*")))
        unhealthy_leaves.extend(list((bulb_leaf_dir / "leaf_unhealthy").glob("*.*")))

    split_and_copy_stratified(healthy_leaves, "leaf", "healthy")
    split_and_copy_stratified(unhealthy_leaves, "leaf", "unhealthy")

    print("== Dataset Splits Complete ==", flush=True)

if __name__ == "__main__":
    prepare_splits()
