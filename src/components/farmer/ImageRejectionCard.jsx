import React from 'react';
import { AlertTriangle, Camera, Upload } from 'lucide-react';

export default function ImageRejectionCard({ onRetryCamera, onRetryUpload, lang = 'en' }) {
  const content = {
    mr: {
      title: "प्रतिमा योग्य नाही",
      msg: "कृपया कांद्याचा स्पष्ट फोटो काढा.",
      retake: "पुन्हा फोटो काढा",
      uploadAnother: "दुसरा फोटो अपलोड करा"
    },
    hi: {
      title: "फोटो उपयुक्त नहीं है",
      msg: "कृपया प्याज की स्पष्ट फोटो खींचें।",
      retake: "पुनः फोटो खींचें",
      uploadAnother: "दूसरी फोटो अपलोड करें"
    },
    en: {
      title: "Image Not Suitable",
      msg: "Please capture a clear photo of the onion.",
      retake: "Retake Photo",
      uploadAnother: "Upload Another Image"
    }
  };

  const c = content[lang] || content.en;

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
          {c.msg}
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
