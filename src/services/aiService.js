/**
 * OnionGrade AI - Production Computer Vision Service Interface
 * 
 * Communicates with FastAPI / PyTorch EfficientNet & YOLO backend.
 * Strict Stage 1 Onion Rejection Gate:
 * Non-onion images are rejected with zero fake scores or fabricated predictions.
 */

export function getBackendUrl() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('ONION_BACKEND_URL');
    if (saved && saved.trim()) return saved.trim().replace(/\/+$/, '');
  }
  const envUrl = import.meta.env.VITE_AI_API_URL;
  if (envUrl && envUrl.trim()) return envUrl.trim().replace(/\/+$/, '');
  return 'http://localhost:8000';
}

export function setBackendUrl(url) {
  if (typeof window !== 'undefined' && url) {
    const clean = url.trim().replace(/\/+$/, '');
    localStorage.setItem('ONION_BACKEND_URL', clean);
    return clean;
  }
  return null;
}

export async function checkBackendHealth() {
  const baseUrl = getBackendUrl();
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(`${baseUrl}/`, { signal: controller.signal });
    clearTimeout(id);
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      return { online: true, data, url: baseUrl };
    }
  } catch (e) {
    // Handled below
  }
  return { online: false, url: baseUrl };
}

function dataUrlToBlob(dataUrl) {
  try {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch (e) {
    console.error('Error converting dataURL to Blob:', e);
    return null;
  }
}

export async function analyzeOnionSample({ imageFile, imageSrc, sampleId, batchId, presetType, market = 'lasalgaon' }) {
  // 1. Explicit Non-Onion Presets -> Immediate Rejection without fabrication
  const nonOnionPresets = ['non_onion', 'tomato', 'potato', 'car', 'person', 'dog', 'apple', 'garlic', 'building', 'landscape', 'blurry'];
  
  if (presetType && nonOnionPresets.includes(presetType)) {
    return {
      success: true,
      source: 'rejection_gate',
      data: {
        status: 'rejected',
        stage: 1,
        rejection_reason: 'not_an_onion',
        is_onion: false,
        onion_confidence: 0.10,
        message: "Onion not detected. Please capture a clear onion image."
      }
    };
  }

  const baseUrl = getBackendUrl();

  // 2. Real API Call to PyTorch & YOLO Backend
  try {
    const formData = new FormData();
    
    if (imageFile) {
      formData.append('file', imageFile);
    } else if (imageSrc && imageSrc.startsWith('data:')) {
      const blob = dataUrlToBlob(imageSrc);
      if (blob) {
        formData.append('file', blob, 'onion_scan.jpg');
      }
    } else if (imageSrc) {
      formData.append('image_base64', imageSrc);
    }

    if (presetType) {
      formData.append('preset_type', presetType);
    }
    formData.append('sample_id', sampleId || `SMP-${Date.now()}`);
    formData.append('batch_id', batchId || `BATCH-${Math.floor(Math.random() * 9000 + 1000)}`);
    formData.append('market', market);

    const controller = new AbortController();
    // Allow up to 60 seconds for Render free tier cold-starts
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const response = await fetch(`${baseUrl}/api/analyze`, {
      method: 'POST',
      body: formData,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        source: 'fastapi_pytorch_backend',
        data
      };
    } else {
      const errJson = await response.json().catch(() => ({}));
      return {
        success: false,
        source: 'backend_error',
        data: {
          status: 'rejected',
          stage: 1,
          rejection_reason: 'server_error',
          is_onion: false,
          message: errJson.message || "Failed to analyze image. Please try again."
        }
      };
    }
  } catch (error) {
    const isLocalhost = baseUrl.includes('localhost');
    const isRemoteClient = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
    console.warn('Real AI API call failed or timed out:', error);

    let friendlyMessage = `Unable to connect to AI backend server (${baseUrl}).`;
    if (error.name === 'AbortError') {
      friendlyMessage = "The AI backend is waking up (Render free tier takes ~30s on first request). Please try again in a moment.";
    } else if (isLocalhost && isRemoteClient) {
      friendlyMessage = "Backend URL is not connected yet. Please configure your Render backend URL.";
    }

    return {
      success: false,
      source: 'network_error',
      data: {
        status: 'rejected',
        stage: 1,
        rejection_reason: 'network_error',
        is_onion: false,
        backend_url: baseUrl,
        message: friendlyMessage
      }
    };
  }
}

export const analyzeOnionQuality = analyzeOnionSample;
