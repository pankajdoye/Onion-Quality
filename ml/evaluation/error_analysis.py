import os
import sys
import json
import torch
from pathlib import Path
from torchvision import transforms, datasets
from torch.utils.data import DataLoader
from PIL import Image

BASE_DIR = Path(__file__).resolve().parent.parent.parent
sys.path.append(str(BASE_DIR))

DATASETS_DIR = BASE_DIR / "ml" / "datasets"
MODELS_DIR = BASE_DIR / "models"
REPORTS_DIR = BASE_DIR / "reports"

from ml.training.train_onion_validator import OnionValidatorNet
from ml.training.train_quality_classifier import OnionQualityNet

def generate_error_analysis():
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print("== Generating Error Analysis & Reports ==", flush=True)

    errors = {
        "false_positives": [],
        "false_negatives": [],
        "quality_mismatches": []
    }

    validator_path = MODELS_DIR / "onion_validator_best.pth"
    test_validator_dir = DATASETS_DIR / "test" / "validator"

    if validator_path.exists() and test_validator_dir.exists():
        checkpoint = torch.load(validator_path, map_location=device)
        model = OnionValidatorNet(architecture=checkpoint.get('architecture', 'efficientnet_b0')).to(device)
        model.load_state_dict(checkpoint['model_state_dict'])
        model.eval()

        val_transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])

        test_dataset = datasets.ImageFolder(root=str(test_validator_dir), transform=val_transform)
        onion_idx = checkpoint.get('onion_idx', test_dataset.class_to_idx.get('onion', 1))

        for idx, (img_path, true_cls) in enumerate(test_dataset.samples[:200]): # sample 200 for fast analysis
            try:
                with Image.open(img_path) as img:
                    t = val_transform(img.convert('RGB')).unsqueeze(0).to(device)
                    with torch.no_grad():
                        logits = model(t)
                        prob = torch.sigmoid(logits).item()
                    
                    is_true_onion = (true_cls == onion_idx)
                    pred_onion = (prob >= 0.5)

                    if not is_true_onion and pred_onion:
                        errors["false_positives"].append({"file": Path(img_path).name, "confidence": round(prob, 4)})
                    elif is_true_onion and not pred_onion:
                        errors["false_negatives"].append({"file": Path(img_path).name, "confidence": round(prob, 4)})
            except Exception:
                pass

    err_json_path = REPORTS_DIR / "error_analysis.json"
    with open(err_json_path, 'w', encoding='utf-8') as f:
        json.dump(errors, f, indent=2)

    metrics_path = REPORTS_DIR / "metrics.json"
    metrics = {}
    if metrics_path.exists():
        with open(metrics_path, 'r', encoding='utf-8') as f:
            metrics = json.load(f)

    v_acc = metrics.get("onion_validator", {}).get("accuracy", 0.0) * 100
    q_acc = metrics.get("quality_classifier", {}).get("accuracy", 0.0) * 100

    html_report_path = REPORTS_DIR / "training_report.html"
    html_content = f"""<!DOCTYPE html>
<html>
<head>
    <title>Smart Onion AI - Model Training & Evaluation Report</title>
    <style>
        body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 30px; background-color: #f8fafc; color: #1e293b; }}
        .header {{ background: #0f172a; color: white; padding: 25px; border-radius: 12px; margin-bottom: 25px; }}
        .grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }}
        .card {{ background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }}
        .metric-value {{ font-size: 32px; font-weight: bold; color: #0284c7; margin: 10px 0; }}
        table {{ width: 100%; border-collapse: collapse; margin-top: 15px; }}
        th, td {{ padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }}
        th {{ background-color: #f1f5f9; }}
    </style>
</head>
<body>
    <div class="header">
        <h1>🧅 Smart Onion AI - Model Training & Evaluation Report</h1>
        <p>End-to-End Multi-Stage AI Pipeline Performance on Unseen Test Split</p>
    </div>

    <div class="grid">
        <div class="card">
            <h3>Stage 1: Onion Validator (Binary Classifier)</h3>
            <div class="metric-value">{v_acc:.1f}%</div>
            <p><strong>Accuracy:</strong> {metrics.get("onion_validator", {}).get("accuracy", 0):.4f}</p>
            <p><strong>Precision:</strong> {metrics.get("onion_validator", {}).get("precision", 0):.4f}</p>
            <p><strong>Recall:</strong> {metrics.get("onion_validator", {}).get("recall", 0):.4f}</p>
            <p><strong>F1 Score:</strong> {metrics.get("onion_validator", {}).get("f1_score", 0):.4f}</p>
            <p><strong>False Positive Rate:</strong> {metrics.get("onion_validator", {}).get("false_positive_rate", 0):.4f}</p>
        </div>

        <div class="card">
            <h3>Stage 2: Onion Quality Classifier</h3>
            <div class="metric-value">{q_acc:.1f}%</div>
            <p><strong>Accuracy:</strong> {metrics.get("quality_classifier", {}).get("accuracy", 0):.4f}</p>
            <p><strong>Macro F1:</strong> {metrics.get("quality_classifier", {}).get("macro_f1", 0):.4f}</p>
            <p><strong>Macro Precision:</strong> {metrics.get("quality_classifier", {}).get("macro_precision", 0):.4f}</p>
            <p><strong>Macro Recall:</strong> {metrics.get("quality_classifier", {}).get("macro_recall", 0):.4f}</p>
        </div>
    </div>

    <div class="card" style="margin-top: 20px;">
        <h3>Error Analysis Breakdown</h3>
        <p><strong>False Positives (Non-onion predicted as onion):</strong> {len(errors["false_positives"])}</p>
        <p><strong>False Negatives (Onion predicted as non-onion):</strong> {len(errors["false_negatives"])}</p>
    </div>
</body>
</html>
"""
    with open(html_report_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

    print(f"Error analysis saved to {err_json_path} and {html_report_path}", flush=True)

if __name__ == "__main__":
    generate_error_analysis()
