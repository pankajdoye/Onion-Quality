import React from 'react';
import { AlertTriangle, Camera, Upload, WifiOff, RefreshCw } from 'lucide-react';

export default function ImageRejectionCard({ message, rejectionReason, onRetryCamera, onRetryUpload, lang = 'en' }) {
  const isNetworkOrServer = rejectionReason === 'network_error' || rejectionReason === 'server_error';

  const content = {
    mr: {
      title: isNetworkOrServer ? "सर्व्हर संपर्क त्रुटी" : "प्रतिमा योग्य नाही",
      msg: isNetworkOrServer 
        ? "AI बॅकएंड सर्व्हरशी संपर्क होऊ शकला नाही. सर्व्हर सुरू होत असावा (Render ला ~30 सेकंद लागतात). कृपया पुन्हा प्रयत्न करा."
        : "कृपया कांद्याचा स्पष्ट फोटो काढा.",
      retake: isNetworkOrServer ? "पुन्हा प्रयत्न करा" : "पुन्हा फोटो काढा",
      uploadAnother: "दुसरा फोटो अपलोड करा"
    },
    hi: {
      title: isNetworkOrServer ? "सर्वर कनेक्ट नहीं हुआ" : "फोटो उपयुक्त नहीं है",
      msg: isNetworkOrServer 
        ? "AI बैकएंड सर्वर से संपर्क नहीं हो पाया। सर्वर शुरू हो रहा हो सकता है (Render पर पहली बार में ~30 सेकंड लगते हैं)। कृपया पुनः प्रयास करें।"
        : "कृपया प्याज की स्पष्ट फोटो खींचें।",
      retake: isNetworkOrServer ? "पुनः प्रयास करें" : "पुनः फोटो खींचें",
      uploadAnother: "दूसरी फोटो अपलोड करें"
    },
    en: {
      title: isNetworkOrServer ? "Server Connection Issue" : "Image Not Suitable",
      msg: isNetworkOrServer 
        ? "Unable to connect to AI backend. If the backend is waking up (Render free tier takes ~30s on cold start), please try again."
        : "Please capture a clear photo of the onion.",
      retake: isNetworkOrServer ? "Retry Now" : "Retake Photo",
      uploadAnother: "Upload Another Image"
    }
  };

  const c = content[lang] || content.en;

  return (
    <div className={`bg-white dark:bg-[#1F2933] rounded-3xl border-2 ${
      isNetworkOrServer ? 'border-amber-400 dark:border-amber-700' : 'border-rose-400 dark:border-rose-800'
    } p-6 sm:p-8 text-center space-y-6 shadow-md transition-colors`}>
      
      {/* Warning Icon */}
      <div className={`w-16 h-16 rounded-2xl ${
        isNetworkOrServer ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-800' : 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-800'
      } mx-auto flex items-center justify-center`}>
        {isNetworkOrServer ? <WifiOff className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
      </div>

      <div className="space-y-2">
        <h2 className={`text-2xl font-black ${
          isNetworkOrServer ? 'text-amber-700 dark:text-amber-400' : 'text-rose-700 dark:text-rose-400'
        } flex items-center justify-center gap-2`}>
          <span>⚠ {c.title}</span>
        </h2>

        <p className="text-base font-semibold text-[#263238] dark:text-[#F5F7FA] max-w-md mx-auto leading-relaxed">
          {message || c.msg}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto pt-2">
        <button
          onClick={onRetryCamera}
          className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl ${
            isNetworkOrServer ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-rose-600 hover:bg-rose-700 text-white'
          } font-extrabold text-xs shadow-md transition-all active:scale-95`}
        >
          {isNetworkOrServer ? <RefreshCw className="w-4 h-4" /> : <Camera className="w-4 h-4 text-amber-200" />}
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
