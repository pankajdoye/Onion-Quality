import os
import json
from pathlib import Path
from PIL import Image

BASE_DIR = Path(__file__).resolve().parent.parent.parent
RAW_DIR = BASE_DIR / "ml" / "datasets" / "raw"
REPORTS_DIR = BASE_DIR / "reports"

def inspect_dataset():
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    report_data = {
        "total_images": 0,
        "by_dataset": {},
        "by_class": {},
        "dimensions": [],
        "missing_labels": 0,
        "corrupted_files": 0,
    }

    if not RAW_DIR.exists():
        print(f"RAW directory {RAW_DIR} does not exist.", flush=True)
        return report_data

    for root, dirs, files in os.walk(RAW_DIR):
        root_path = Path(root)
        rel_path = root_path.relative_to(RAW_DIR)
        parts = rel_path.parts
        if not parts or parts[0] in ["extracted_rar", "vegqual_extracted"]:
            continue
        dataset_name = parts[0]
        class_name = parts[-1] if len(parts) > 1 else "root"

        if dataset_name not in report_data["by_dataset"]:
            report_data["by_dataset"][dataset_name] = 0

        for f in files:
            file_path = root_path / f
            if file_path.suffix.lower() not in [".jpg", ".jpeg", ".png", ".bmp", ".webp"]:
                continue

            report_data["total_images"] += 1
            report_data["by_dataset"][dataset_name] += 1
            report_data["by_class"][class_name] = report_data["by_class"].get(class_name, 0) + 1

            try:
                with Image.open(file_path) as img:
                    w, h = img.size
                    report_data["dimensions"].append((w, h))
            except Exception:
                report_data["corrupted_files"] += 1

    if report_data["dimensions"]:
        avg_w = sum(d[0] for d in report_data["dimensions"]) / len(report_data["dimensions"])
        avg_h = sum(d[1] for d in report_data["dimensions"]) / len(report_data["dimensions"])
        report_data["average_dimensions"] = f"{int(avg_w)}x{int(avg_h)}"
    else:
        report_data["average_dimensions"] = "N/A"

    del report_data["dimensions"]

    print("== Dataset Inspection Summary ==", flush=True)
    print(f"Total Images: {report_data['total_images']}", flush=True)
    print(f"By Dataset: {json.dumps(report_data['by_dataset'], indent=2)}", flush=True)
    print(f"By Class: {json.dumps(report_data['by_class'], indent=2)}", flush=True)
    print(f"Average Resolution: {report_data['average_dimensions']}", flush=True)

    json_path = REPORTS_DIR / "dataset_report.json"
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(report_data, f, indent=2)

    html_path = REPORTS_DIR / "dataset_report.html"
    html_content = f"""<!DOCTYPE html>
<html>
<head>
    <title>Dataset Inspection Report - Smart Onion AI</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 30px; background-color: #f4f6f8; }}
        .card {{ background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px; }}
        h1 {{ color: #2c3e50; }}
        table {{ width: 100%; border-collapse: collapse; margin-top: 10px; }}
        th, td {{ border: 1px solid #ddd; padding: 10px; text-align: left; }}
        th {{ background-color: #eef2f5; }}
    </style>
</head>
<body>
    <h1>🧅 Smart Onion AI - Dataset Inspection Report</h1>
    <div class="card">
        <h3>Overview</h3>
        <p><strong>Total Images:</strong> {report_data['total_images']}</p>
        <p><strong>Average Dimensions:</strong> {report_data['average_dimensions']}</p>
        <p><strong>Corrupted Files:</strong> {report_data['corrupted_files']}</p>
    </div>
    <div class="card">
        <h3>Images by Dataset</h3>
        <table>
            <tr><th>Dataset</th><th>Image Count</th></tr>
            {"".join(f"<tr><td>{k}</td><td>{v}</td></tr>" for k, v in report_data['by_dataset'].items())}
        </table>
    </div>
    <div class="card">
        <h3>Images by Class</h3>
        <table>
            <tr><th>Class</th><th>Image Count</th></tr>
            {"".join(f"<tr><td>{k}</td><td>{v}</td></tr>" for k, v in report_data['by_class'].items())}
        </table>
    </div>
</body>
</html>
"""
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

    print(f"Reports generated: {json_path} and {html_path}", flush=True)
    return report_data

if __name__ == "__main__":
    inspect_dataset()
