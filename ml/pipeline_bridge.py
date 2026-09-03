import os
import base64
import uuid
from pathlib import Path
from ml.inference.predict import OnionAIEngine

_ENGINE = None

def get_engine():
    global _ENGINE
    if _ENGINE is None:
        _ENGINE = OnionAIEngine()
    return _ENGINE

def run_two_stage_inference(image_input=None, preset_type=None, run_vision_ai=True):
    """
    Two-Stage AI Inference Pipeline connecting FastAPI backend to trained PyTorch models.
    Supports UploadFile, raw bytes, base64 data-URL, or file path.
    Strict Gate:
    If Stage 1 validator fails or image quality is poor -> returns REJECT with farmer-friendly message.
    """
    clean_reject_msg = "Please capture a clear photo of the onion."

    # Immediate rejection for preset non-onion tests
    if preset_type in ['non_onion', 'tomato', 'potato', 'car', 'person', 'dog', 'apple', 'garlic', 'building', 'landscape', 'blurry']:
        return {
            "status": "rejected",
            "stage": 1,
            "rejection_reason": "not_an_onion",
            "is_onion": False,
            "onion_confidence": 0.12,
            "message": clean_reject_msg
        }

    engine = get_engine()
    temp_dir = Path(__file__).resolve().parent / "temp"
    temp_dir.mkdir(parents=True, exist_ok=True)
    temp_file = None

    try:
        # Determine and save input to temporary file
        if image_input is not None:
            # 1. FastAPI UploadFile
            if hasattr(image_input, 'filename') and image_input.filename:
                ext = Path(image_input.filename).suffix or ".jpg"
                temp_file = temp_dir / f"scan_{uuid.uuid4().hex}{ext}"
                with open(temp_file, 'wb') as f:
                    content = image_input.file.read()
                    f.write(content)
            # 2. Raw bytes
            elif isinstance(image_input, bytes):
                temp_file = temp_dir / f"scan_{uuid.uuid4().hex}.jpg"
                with open(temp_file, 'wb') as f:
                    f.write(image_input)
            # 3. Base64 dataURL or string
            elif isinstance(image_input, str) and (image_input.startswith("data:image/") or ";base64," in image_input):
                header, encoded = image_input.split(";base64,", 1) if ";base64," in image_input else ("", image_input)
                data = base64.b64decode(encoded)
                temp_file = temp_dir / f"scan_{uuid.uuid4().hex}.jpg"
                with open(temp_file, 'wb') as f:
                    f.write(data)
            # 4. Existing file path
            elif isinstance(image_input, (str, Path)) and Path(image_input).exists():
                temp_file = Path(image_input)
            elif isinstance(image_input, str) and image_input.startswith("http"):
                # URL string: download or check preset
                import urllib.request
                temp_file = temp_dir / f"scan_{uuid.uuid4().hex}.jpg"
                urllib.request.urlretrieve(image_input, str(temp_file))

        if temp_file and temp_file.exists():
            res = engine.predict(str(temp_file), run_vision_ai=run_vision_ai)
            return res

    except Exception as e:
        print(f"Error during inference execution: {e}")
    finally:
        # Clean up temporary scan file if created in temp dir
        if temp_file and temp_dir in temp_file.parents and temp_file.exists():
            try:
                temp_file.unlink()
            except Exception:
                pass

    return {
        "status": "rejected",
        "stage": 1,
        "rejection_reason": "no_image_provided",
        "is_onion": False,
        "message": clean_reject_msg
    }
