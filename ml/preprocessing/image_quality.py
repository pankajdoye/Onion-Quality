import cv2
import numpy as np

def check_image_quality(image_path_or_bytes, min_blur_var: float = 15.0, min_brightness: float = 15.0, max_brightness: float = 245.0, min_resolution: int = 60):
    """
    Performs image quality validation:
    1. Blur Detection using OpenCV Laplacian Variance (Calibrated for mobile photos).
    2. Brightness Check (Detect dark or overexposed images).
    3. Resolution & Dimension check.
    """
    if isinstance(image_path_or_bytes, str) or hasattr(image_path_or_bytes, '__fspath__'):
        img = cv2.imread(str(image_path_or_bytes))
    else:
        nparr = np.frombuffer(image_path_or_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if img is None:
        return {
            "passed": False,
            "reason": "invalid_image",
            "message": "The image could not be decoded. Please upload a valid image file."
        }

    h, w, c = img.shape
    if h < min_resolution or w < min_resolution:
        return {
            "passed": False,
            "reason": "low_resolution",
            "message": f"Image resolution ({w}x{h}) is too low. Please upload a higher resolution photo."
        }

    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 1. Blur Check via Laplacian Variance
    lap_var = cv2.Laplacian(gray, cv2.CV_64F).var()
    if lap_var < min_blur_var:
        return {
            "passed": False,
            "reason": "blurry",
            "laplacian_variance": lap_var,
            "message": "The image is too blurry. Please take a clearer photo."
        }

    # 2. Brightness Check
    avg_brightness = float(np.mean(gray))
    if avg_brightness < min_brightness:
        return {
            "passed": False,
            "reason": "too_dark",
            "brightness": avg_brightness,
            "message": "The image is too dark. Please take a photo with better lighting."
        }

    if avg_brightness > max_brightness:
        return {
            "passed": False,
            "reason": "overexposed",
            "brightness": avg_brightness,
            "message": "The image is overexposed/too bright. Please avoid direct glare."
        }

    return {
        "passed": True,
        "reason": "ok",
        "laplacian_variance": lap_var,
        "brightness": avg_brightness,
        "resolution": f"{w}x{h}",
        "message": "Image quality check passed."
    }

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        res = check_image_quality(sys.argv[1])
        print(res)
    else:
        print("Usage: python image_quality.py <path_to_image>")
