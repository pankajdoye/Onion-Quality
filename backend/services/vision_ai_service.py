"""
Vision AI Service Provider Abstraction

Provides a secondary visual reasoning and verification layer using Gemini or OpenAI Vision.
Ensures:
- Server-side API key protection (keys are NEVER sent to the client, frontend, or logged)
- Structured JSON output with strict validation and sanitization
- Robust fallback to local ML if Vision AI is disabled, unavailable, times out, or errors
- Configurable hybrid fusion logic:
    Local model + Vision AI + confidence + deterministic rules
    Disagreement -> "NEEDS REVIEW"
"""

import os
import json
import base64
import logging
from pathlib import Path
from typing import Dict, Any, Optional, Tuple

logger = logging.getLogger(__name__)

# Configurable settings via environment variables (with safe defaults)
def get_env_bool(key: str, default: bool = False) -> bool:
    val = os.environ.get(key, "").strip().lower()
    if val in ("true", "1", "yes", "on"):
        return True
    if val in ("false", "0", "no", "off"):
        return False
    return default

def get_env_float(key: str, default: float) -> float:
    try:
        return float(os.environ.get(key, default))
    except (ValueError, TypeError):
        return default

VISION_AI_ENABLED = get_env_bool("VISION_AI_ENABLED", False)
VISION_PROVIDER = os.environ.get("VISION_PROVIDER", "gemini").strip().lower()
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "").strip()
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "").strip()
VISION_AI_CONFIDENCE_THRESHOLD = get_env_float("VISION_AI_CONFIDENCE_THRESHOLD", 0.70)
VISION_AI_ONLY_ON_DISAGREEMENT = get_env_bool("VISION_AI_ONLY_ON_DISAGREEMENT", True)

VISION_PROMPT = """You are an expert post-harvest agricultural quality inspector specializing in onion quality grading.
Analyze this onion photograph or cropped bulb.
Inspect carefully for:
1. True rot: soft/sunken/decayed necrotic tissue or visible black/blue/gray fungal mold (Aspergillus niger, Botrytis).
   NOTE: Do NOT treat normal dry outer papery skin, roots, stem, minor peeling, normal red/purple/brown coloration, or natural shadows as rot or defects!
2. Sprouting: active green leaf shoots emerging from the neck/top of the bulb.
3. Cracks & mechanical cuts: deep fractures or structural breaks.
4. Severe damage: bruising, squashed sections, skin tears exposing inner flesh.
5. Undersized: bulb appears smaller than standard 45mm market size.
6. Abnormal discoloration: unnatural black, green, or water-soaked patches.

Return ONLY a valid JSON object matching EXACTLY this structure with NO extra markdown formatting:
{
  "is_onion": true,
  "confidence": 0.95,
  "quality": "GOOD",
  "quality_confidence": 0.90,
  "grade": "A",
  "defects": [
    {
      "type": "rot",
      "confidence": 0.88,
      "severity": "high"
    }
  ],
  "sprouted": false,
  "damaged": false,
  "rotten": false,
  "undersized": false,
  "cracked": false,
  "discoloration": false,
  "needs_review": false
}

Rules for quality and grade:
- If clearly rotten or severely damaged: quality MUST be "POOR", grade MUST be "URS".
- If sprouted, cracked, or minor damage: quality is "AVERAGE", grade is "URS" (or Grade B).
- If sound, intact, and well-cured: quality is "GOOD", grade is "A".
- If ambiguous or image unclear: set "needs_review": true.
"""

def _encode_image_to_base64(image_path_or_bytes, max_dim: int = 640) -> Tuple[Optional[str], str]:
    """Resizes and encodes image file or bytes into lightweight base64 string for Vision API."""
    import io
    from PIL import Image, ImageOps
    try:
        if isinstance(image_path_or_bytes, (str, Path)):
            path = Path(image_path_or_bytes)
            if not path.exists():
                return None, "image/jpeg"
            pil_img = Image.open(path)
        elif isinstance(image_path_or_bytes, bytes):
            pil_img = Image.open(io.BytesIO(image_path_or_bytes))
        else:
            return None, "image/jpeg"

        pil_img = ImageOps.exif_transpose(pil_img).convert('RGB')
        pil_img.thumbnail((max_dim, max_dim))
        buf = io.BytesIO()
        pil_img.save(buf, format='JPEG', quality=85)
        return base64.b64encode(buf.getvalue()).decode('utf-8'), "image/jpeg"
    except Exception as e:
        logger.warning(f"Error encoding image to base64: {e}")
    return None, "image/jpeg"

def call_gemini_vision(b64_img: str, mime_type: str = "image/jpeg") -> Optional[Dict[str, Any]]:
    """Calls Gemini API via HTTPS using standard requests / urllib."""
    api_key = os.environ.get("GEMINI_API_KEY", GEMINI_API_KEY)
    if not api_key:
        return None

    import requests

    model_name = os.environ.get("GEMINI_MODEL", "gemini-3.6-flash").strip()
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"
    payload = {
        "contents": [{
            "parts": [
                {"text": VISION_PROMPT},
                {
                    "inline_data": {
                        "mime_type": mime_type,
                        "data": b64_img
                    }
                }
            ]
        }],
        "generationConfig": {
            "response_mime_type": "application/json",
            "temperature": 0.1,
            "maxOutputTokens": 800
        }
    }

    try:
        resp = requests.post(url, json=payload, timeout=8)
        if resp.status_code != 200:
            logger.warning(f"Gemini Vision API status {resp.status_code}: {resp.text[:120]}")
            return None
        
        result_json = resp.json()
        candidates = result_json.get("candidates", [])
        if not candidates:
            return None
        
        text_content = candidates[0].get("content", {}).get("parts", [{}])[0].get("text", "")
        return _sanitize_vision_json(text_content)
    except Exception as e:
        logger.warning(f"Gemini Vision API call failed: {e}")
        return None

def call_openai_vision(b64_img: str, mime_type: str = "image/jpeg") -> Optional[Dict[str, Any]]:
    """Calls OpenAI API (GPT-4o) via HTTPS using standard requests."""
    api_key = os.environ.get("OPENAI_API_KEY", OPENAI_API_KEY)
    if not api_key:
        return None

    import requests

    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": VISION_PROMPT},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:{mime_type};base64,{b64_img}",
                            "detail": "low"
                        }
                    }
                ]
            }
        ],
        "response_format": {"type": "json_object"},
        "temperature": 0.1,
        "max_tokens": 800
    }

    try:
        resp = requests.post(url, headers=headers, json=payload, timeout=8)
        if resp.status_code != 200:
            logger.warning(f"OpenAI Vision API status {resp.status_code}: {resp.text[:120]}")
            return None
        
        result_json = resp.json()
        choices = result_json.get("choices", [])
        if not choices:
            return None
        
        text_content = choices[0].get("message", {}).get("content", "")
        return _sanitize_vision_json(text_content)
    except Exception as e:
        logger.warning(f"OpenAI Vision API call failed: {e}")
        return None

def _sanitize_vision_json(raw_text: str) -> Optional[Dict[str, Any]]:
    """Strictly parses and sanitizes the JSON response from Vision AI."""
    if not raw_text:
        return None
    cleaned = raw_text.strip()
    if cleaned.startswith("```json"):
        cleaned = cleaned[7:]
    if cleaned.startswith("```"):
        cleaned = cleaned[3:]
    if cleaned.endswith("```"):
        cleaned = cleaned[:-3]
    cleaned = cleaned.strip()

    try:
        data = json.loads(cleaned)
    except Exception:
        return None

    # Schema validation & sanitization
    is_onion = bool(data.get("is_onion", True))
    confidence = float(data.get("confidence", 0.90))
    quality = str(data.get("quality", "GOOD")).upper().strip()
    if quality not in ("GOOD", "AVERAGE", "POOR"):
        quality = "AVERAGE"
    quality_conf = float(data.get("quality_confidence", 0.85))
    grade = str(data.get("grade", "A")).upper().strip()
    if grade not in ("A", "URS", "GRADE A", "GRADE B"):
        grade = "A" if quality == "GOOD" else "URS"

    defects = data.get("defects", [])
    if not isinstance(defects, list):
        defects = []

    return {
        "is_onion": is_onion,
        "confidence": min(1.0, max(0.0, confidence)),
        "quality": quality,
        "quality_confidence": min(1.0, max(0.0, quality_conf)),
        "grade": "GRADE A" if grade in ("A", "GRADE A") else "URS",
        "defects": defects,
        "sprouted": bool(data.get("sprouted", False)),
        "damaged": bool(data.get("damaged", False)),
        "rotten": bool(data.get("rotten", False)),
        "undersized": bool(data.get("undersized", False)),
        "cracked": bool(data.get("cracked", False)),
        "discoloration": bool(data.get("discoloration", False)),
        "needs_review": bool(data.get("needs_review", False))
    }

def get_vision_second_opinion(image_path_or_bytes) -> Dict[str, Any]:
    """
    Executes secondary visual reasoning using the configured provider.
    Returns:
    {
        "available": bool,
        "provider": str,
        "result": Optional[dict],
        "status_message": str
    }
    """
    enabled = get_env_bool("VISION_AI_ENABLED", VISION_AI_ENABLED)
    provider = os.environ.get("VISION_PROVIDER", VISION_PROVIDER).lower()

    if not enabled:
        return {
            "available": False,
            "provider": provider,
            "result": None,
            "status_message": "Vision AI disabled. Local quality model active."
        }

    b64_img, mime_type = _encode_image_to_base64(image_path_or_bytes)
    if not b64_img:
        return {
            "available": False,
            "provider": provider,
            "result": None,
            "status_message": "Could not encode image for Vision AI."
        }

    result = None
    if provider == "gemini":
        result = call_gemini_vision(b64_img, mime_type)
    elif provider == "openai":
        result = call_openai_vision(b64_img, mime_type)
    else:
        # Fallback to whichever key exists
        if os.environ.get("GEMINI_API_KEY", GEMINI_API_KEY):
            provider = "gemini"
            result = call_gemini_vision(b64_img, mime_type)
        elif os.environ.get("OPENAI_API_KEY", OPENAI_API_KEY):
            provider = "openai"
            result = call_openai_vision(b64_img, mime_type)

    if result is not None:
        return {
            "available": True,
            "provider": provider,
            "result": result,
            "status_message": f"Verified with {provider.capitalize()} Vision AI."
        }
    else:
        return {
            "available": False,
            "provider": provider,
            "result": None,
            "status_message": "Vision AI unavailable. Result generated using the local quality model."
        }

def fuse_hybrid_results(local_onion: Dict[str, Any], vision_result: Optional[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Hybrid Decision Fusion:
    LOCAL MODEL + VISION AI + CONFIDENCE + DETERMINISTIC RULES.
    
    If both agree: reinforce confidence.
    If they disagree significantly (e.g. Local: GOOD (0.55), Vision: POOR (0.90)):
        FINAL: "NEEDS REVIEW"
        "AI models disagree. Please retake the image or manually inspect the onion."
    Never manufacture certainty.
    """
    if not vision_result or not vision_result.get("is_onion", True):
        # Local model only
        return {
            "quality": local_onion.get("grade", "GOOD"),
            "grade": "GRADE A" if local_onion.get("grade") == "GOOD" else "URS",
            "confidence": local_onion.get("confidence", 0.85),
            "agreement": "local_only",
            "needs_review": False,
            "review_message": None
        }

    loc_quality = local_onion.get("grade", "GOOD").upper() # "GOOD", "AVERAGE", "POOR"
    vis_quality = vision_result.get("quality", "GOOD").upper()
    vis_conf = vision_result.get("quality_confidence", 0.85)
    loc_conf = local_onion.get("confidence", 0.80)

    # Check for strong disagreement
    is_polar_disagreement = (
        (loc_quality == "GOOD" and vis_quality == "POOR") or
        (loc_quality == "POOR" and vis_quality == "GOOD")
    )

    if is_polar_disagreement:
        # Strict rule: clearly rotten or damaged bulb cannot be called GOOD
        if vision_result.get("rotten") or vision_result.get("damaged") or local_onion.get("rot") == "Detected":
            final_quality = "POOR"
            final_grade = "URS"
            needs_review = True
            review_msg = "AI models disagree on defect severity. Please retake the image or manually inspect the onion."
        else:
            final_quality = "NEEDS REVIEW"
            final_grade = "NEEDS REVIEW"
            needs_review = True
            review_msg = "AI models disagree. Please retake the image or manually inspect the onion."
        final_conf = round((loc_conf + vis_conf) / 2.0, 3)
        agreement = "disagree"
    elif loc_quality == vis_quality:
        final_quality = loc_quality
        final_grade = "GRADE A" if loc_quality == "GOOD" else "URS"
        # Reinforce confidence when models agree
        final_conf = min(0.98, round(max(loc_conf, vis_conf) + 0.04, 3))
        needs_review = False
        review_msg = None
        agreement = "agree"
    else:
        # Minor difference (e.g. GOOD vs AVERAGE or AVERAGE vs POOR)
        if "POOR" in (loc_quality, vis_quality):
            final_quality = "POOR"
            final_grade = "URS"
        elif "AVERAGE" in (loc_quality, vis_quality):
            final_quality = "AVERAGE"
            final_grade = "URS"
        else:
            final_quality = "GOOD"
            final_grade = "GRADE A"
        final_conf = round((loc_conf + vis_conf) / 2.0, 3)
        needs_review = False
        review_msg = None
        agreement = "partial"

    return {
        "quality": final_quality,
        "grade": final_grade,
        "confidence": final_conf,
        "agreement": agreement,
        "needs_review": needs_review,
        "review_message": review_msg
    }
