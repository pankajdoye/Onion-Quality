import os
import sys
import json
import torch
import numpy as np
from pathlib import Path
from torchvision import transforms, datasets
from torch.utils.data import DataLoader
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix, classification_report

BASE_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.append(str(BASE_DIR))

DATASETS_DIR = BASE_DIR / "ml" / "datasets"
MODELS_DIR = BASE_DIR / "models"
REPORTS_DIR = BASE_DIR / "reports"

from ml.training.train_onion_validator import OnionValidatorNet
from ml.training.train_quality_classifier import OnionQualityNet

def evaluate_pipeline():
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"== Evaluating ML Pipeline on Held-out Test Set (Device: {device}) ==", flush=True)

    metrics_report = {}

    # 1. Evaluate Onion Validator
    validator_path = MODELS_DIR / "onion_validator_best.pth"
    test_validator_dir = DATASETS_DIR / "test" / "validator"

    if validator_path.exists() and test_validator_dir.exists():
        checkpoint = torch.load(validator_path, map_location=device)
        arch = checkpoint.get('architecture', 'efficientnet_b0')
        model = OnionValidatorNet(architecture=arch).to(device)
        model.load_state_dict(checkpoint['model_state_dict'])
        model.eval()

        val_transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])

        test_dataset = datasets.ImageFolder(root=str(test_validator_dir), transform=val_transform)
        test_loader = DataLoader(test_dataset, batch_size=64, shuffle=False)

        onion_idx = checkpoint.get('onion_idx', test_dataset.class_to_idx.get('onion', 1))

        y_true = []
        y_pred = []
        y_prob = []

        with torch.no_grad():
            for inputs, labels in test_loader:
                inputs = inputs.to(device)
                targets = (labels == onion_idx).numpy()
                logits = model(inputs)
                outputs = torch.sigmoid(logits).cpu().numpy().flatten()

                preds = (outputs >= 0.5).astype(int)
                y_true.extend(targets)
                y_pred.extend(preds)
                y_prob.extend(outputs)

        acc = float(accuracy_score(y_true, y_pred))
        prec = float(precision_score(y_true, y_pred, zero_division=0))
        rec = float(recall_score(y_true, y_pred, zero_division=0))
        f1 = float(f1_score(y_true, y_pred, zero_division=0))
        try:
            auc = float(roc_auc_score(y_true, y_prob))
        except Exception:
            auc = 0.0

        tn, fp, fn, tp = confusion_matrix(y_true, y_pred, labels=[0, 1]).ravel()
        spec = float(tn / (tn + fp)) if (tn + fp) > 0 else 0.0
        fpr = float(fp / (fp + tn)) if (fp + tn) > 0 else 0.0
        fnr = float(fn / (fn + tp)) if (fn + tp) > 0 else 0.0

        metrics_report["onion_validator"] = {
            "accuracy": round(acc, 4),
            "precision": round(prec, 4),
            "recall": round(rec, 4),
            "f1_score": round(f1, 4),
            "roc_auc": round(auc, 4),
            "specificity": round(spec, 4),
            "false_positive_rate": round(fpr, 4),
            "false_negative_rate": round(fnr, 4),
            "confusion_matrix": {"TN": int(tn), "FP": int(fp), "FN": int(fn), "TP": int(tp)}
        }
        print(f"Validator Test Accuracy: {acc*100:.2f}%, F1: {f1*100:.2f}%, FPR: {fpr*100:.2f}%", flush=True)

    # 2. Evaluate Quality Classifier
    quality_path = MODELS_DIR / "onion_quality_best.pth"
    test_quality_dir = DATASETS_DIR / "test" / "quality"

    if quality_path.exists() and test_quality_dir.exists():
        checkpoint = torch.load(quality_path, map_location=device)
        arch = checkpoint.get('architecture', 'efficientnet_b0')

        val_transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])

        test_dataset = datasets.ImageFolder(root=str(test_quality_dir), transform=val_transform)
        test_loader = DataLoader(test_dataset, batch_size=64, shuffle=False)

        model = OnionQualityNet(num_classes=len(test_dataset.classes), architecture=arch).to(device)
        model.load_state_dict(checkpoint['model_state_dict'])
        model.eval()

        y_true = []
        y_pred = []

        with torch.no_grad():
            for inputs, labels in test_loader:
                inputs = inputs.to(device)
                outputs = model(inputs)
                _, preds = torch.max(outputs, 1)
                y_true.extend(labels.numpy())
                y_pred.extend(preds.cpu().numpy())

        acc = float(accuracy_score(y_true, y_pred))
        prec = float(precision_score(y_true, y_pred, average='macro', zero_division=0))
        rec = float(recall_score(y_true, y_pred, average='macro', zero_division=0))
        f1 = float(f1_score(y_true, y_pred, average='macro', zero_division=0))

        metrics_report["quality_classifier"] = {
            "accuracy": round(acc, 4),
            "macro_precision": round(prec, 4),
            "macro_recall": round(rec, 4),
            "macro_f1": round(f1, 4),
            "confusion_matrix": confusion_matrix(y_true, y_pred).tolist(),
            "target_classes": test_dataset.classes
        }
        print(f"Quality Classifier Test Accuracy: {acc*100:.2f}%, Macro F1: {f1*100:.2f}%", flush=True)

    metrics_json_path = REPORTS_DIR / "metrics.json"
    with open(metrics_json_path, 'w', encoding='utf-8') as f:
        json.dump(metrics_report, f, indent=2)

    report_txt_path = REPORTS_DIR / "classification_report.txt"
    with open(report_txt_path, 'w', encoding='utf-8') as f:
        f.write("=== SMART ONION AI EVALUATION REPORT ===\n\n")
        f.write(json.dumps(metrics_report, indent=2))

    print(f"Metrics saved to {metrics_json_path}", flush=True)
    return metrics_report

if __name__ == "__main__":
    evaluate_pipeline()
