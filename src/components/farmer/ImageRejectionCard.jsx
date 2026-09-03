import React, { useState } from 'react';
import { AlertTriangle, Camera, Upload, WifiOff, Link2, CheckCircle2, RefreshCw } from 'lucide-react';
import { getBackendUrl, setBackendUrl, checkBackendHealth } from '../../services/aiService';

export default function ImageRejectionCard({ message, rejectionReason, onRetryCamera, onRetryUpload, lang = 'en' }) {
  const isNetwork = rejectionReason === 'network_error' || (message && (message.includes('backend') || message.includes('connect')));
  const [customUrl, setCustomUrl] = useState(getBackendUrl());
  const [testStatus, setTestStatus] = useState(null); // 'testing', 'success', 'failed'

  const content = {
    mr: {
      title: "प्रतिमा योग्य नाही",
      msg: "कृपया कांद्याचा स्पष्ट फोटो काढा.",
      retake: "पुन्हा फोटो काढा",
      uploadAnother: "दुसरा फोटो अपलोड करा",
      netTitle: "AI बॅकएंड सर्व्हरशी संपर्क होत नाही",
      netMsg: "तुमचा Render बॅकएंड सुरू आहे का ते तपासा किंवा बॅकएंड URL प्रविष्ट करा.",
      connectBtn: "जोडा आणि तपासा (Connect & Test)",
      saveSuccess: "सर्व्हर यशस्वीरित्या जोडला गेला!"
    },
    hi: {
      title: "फोटो उपयुक्त नहीं है",
      msg: "कृपया प्याज की स्पष्ट फोटो खींचें।",
      retake: "पुनः फोटो खींचें",
      uploadAnother: "दूसरी फोटो अपलोड करें",
      netTitle: "AI बैकएंड सर्वर से कनेक्ट नहीं हो सका",
      netMsg: "कृपया जांचें कि आपका Render बैकएंड लाइव है या अपनी बैकएंड URL दर्ज करें।",
      connectBtn: "कनेक्ट एवं जांचें (Connect & Test)",
      saveSuccess: "सर्वर सफलतापूर्वक कनेक्ट हुआ!"
    },
    en: {
      title: "Image Not Suitable",
      msg: "Please capture a clear photo of the onion.",
      retake: "Retake Photo",
      uploadAnother: "Upload Another Image",
      netTitle: "AI Backend Server Not Connected",
      netMsg: "The frontend could not reach your AI backend. If Render is sleeping, it takes ~30s to wake up.",
      connectBtn: "Connect & Verify",
      saveSuccess: "Backend connected successfully!"
    }
  };

  const c = content[lang] || content.en;

  const handleTestConnection = async () => {
    setTestStatus('testing');
    const clean = setBackendUrl(customUrl);
    const health = await checkBackendHealth();
    if (health.online) {
      setTestStatus('success');
      setTimeout(() => {
        if (onRetryCamera) onRetryCamera();
      }, 1200);
    } else {
      setTestStatus('failed');
    }
  };

  // If Network Error: Show Backend Connection Helper
  if (isNetwork) {
    return (
      <div className="bg-white dark:bg-[#1F2933] rounded-3xl border-2 border-amber-400 dark:border-amber-700 p-6 sm:p-8 text-center space-y-5 shadow-md transition-colors">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center border border-amber-300 dark:border-amber-800">
          <WifiOff className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-amber-700 dark:text-amber-400">
            {c.netTitle}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-[#607D8B] dark:text-[#B8C2CC] max-w-md mx-auto">
            {message || c.netMsg}
          </p>
        </div>

        {/* URL Input & Quick Connect */}
        <div className="max-w-md mx-auto space-y-3 bg-[#F7F8FA] dark:bg-[#18212B] p-4 rounded-2xl border border-slate-200 dark:border-[#374151] text-left">
          <label className="text-xs font-bold text-[#263238] dark:text-[#F5F7FA] block flex items-center gap-1.5">
            <Link2 className="w-3.5 h-3.5 text-[#66BB6A]" />
            <span>Render Backend Web Service URL:</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://your-onion-backend.onrender.com"
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-[#374151] bg-white dark:bg-[#202A35] text-[#263238] dark:text-[#F5F7FA] font-mono focus:outline-none focus:ring-2 focus:ring-[#66BB6A]"
            />
            <button
              onClick={handleTestConnection}
              disabled={testStatus === 'testing'}
              className="px-4 py-2 rounded-xl bg-[#66BB6A] hover:bg-emerald-600 text-white font-extrabold text-xs shadow transition-all active:scale-95 shrink-0 flex items-center gap-1.5"
            >
              {testStatus === 'testing' ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5" />
              )}
              <span>{c.connectBtn}</span>
            </button>
          </div>

          {testStatus === 'success' && (
            <p className="text-xs font-bold text-emerald-600 dark:text-[#66BB6A] flex items-center gap-1">
              ✓ {c.saveSuccess}
            </p>
          )}

          {testStatus === 'failed' && (
            <p className="text-xs font-bold text-rose-600 dark:text-rose-400">
              ✗ Could not reach backend at {customUrl}. If Render is waking up, wait 30s and retry.
            </p>
          )}
        </div>

        {/* Retry Buttons */}
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={onRetryCamera}
            className="px-6 py-3 rounded-2xl bg-slate-900 dark:bg-[#202A35] hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
          >
            {c.retake}
          </button>
        </div>
      </div>
    );
  }

  // Standard Non-Onion Rejection Card
  return (
    <div className="bg-white dark:bg-[#1F2933] rounded-3xl border-2 border-rose-400 dark:border-rose-800 p-6 sm:p-8 text-center space-y-6 shadow-md transition-colors">
      
      {/* Warning Icon */}
      <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center border border-rose-300 dark:border-rose-800">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-black text-rose-700 dark:text-rose-400 flex items-center justify-center gap-2">
          <span>⚠ {c.title}</span>
        </h2>

        <p className="text-base font-semibold text-[#263238] dark:text-[#F5F7FA] max-w-md mx-auto leading-relaxed">
          {message || c.msg}
        </p>
      </div>

      {/* 2 Simple Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto pt-2">
        <button
          onClick={onRetryCamera}
          className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
        >
          <Camera className="w-4 h-4 text-amber-200" />
          <span>{c.retake}</span>
        </button>

        <button
          onClick={onRetryUpload}
          className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-900 dark:bg-[#202A35] hover:bg-slate-800 dark:hover:bg-[#263238] text-white font-extrabold text-xs shadow-md transition-all active:scale-95 border border-slate-700 dark:border-[#374151]"
        >
          <Upload className="w-4 h-4 text-[#66BB6A]" />
          <span>{c.uploadAnother}</span>
        </button>
      </div>

    </div>
  );
}
