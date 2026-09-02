import json
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent
REPORTS_DIR = BASE_DIR / "reports"

def plot_confusion_matrices():
    metrics_path = REPORTS_DIR / "metrics.json"
    if not metrics_path.exists():
        print(f"Metrics file {metrics_path} not found. Run evaluate.py first.")
        return

    with open(metrics_path, 'r', encoding='utf-8') as f:
        metrics = json.load(f)

    fig, axes = plt.subplots(1, 2, figsize=(12, 5))

    # 1. Onion Validator Confusion Matrix
    if "onion_validator" in metrics:
        cm_dict = metrics["onion_validator"]["confusion_matrix"]
        cm_arr = np.array([
            [cm_dict["TN"], cm_dict["FP"]],
            [cm_dict["FN"], cm_dict["TP"]]
        ])
        sns.heatmap(cm_arr, annot=True, fmt='d', cmap='Blues', ax=axes[0],
                    xticklabels=["Not Onion", "Onion"],
                    yticklabels=["Not Onion", "Onion"])
        axes[0].set_title("Onion Validator Confusion Matrix")
        axes[0].set_xlabel("Predicted Label")
        axes[0].set_ylabel("True Label")

    # 2. Quality Classifier Confusion Matrix
    if "quality_classifier" in metrics:
        cm_arr = np.array(metrics["quality_classifier"]["confusion_matrix"])
        classes = metrics["quality_classifier"].get("target_classes", ["Defective", "Healthy"])
        sns.heatmap(cm_arr, annot=True, fmt='d', cmap='Greens', ax=axes[1],
                    xticklabels=classes, yticklabels=classes)
        axes[1].set_title("Onion Quality Classifier Confusion Matrix")
        axes[1].set_xlabel("Predicted Label")
        axes[1].set_ylabel("True Label")

    plt.tight_layout()
    output_png = REPORTS_DIR / "confusion_matrix.png"
    plt.savefig(output_png, dpi=300)
    plt.close()
    print(f"Saved confusion matrix plot to {output_png}")

if __name__ == "__main__":
    plot_confusion_matrices()
