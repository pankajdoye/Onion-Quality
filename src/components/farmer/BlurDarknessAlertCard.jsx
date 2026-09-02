import React from 'react';
import { Camera, Sun, ShieldAlert, RefreshCw, CheckCircle2 } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function BlurDarknessAlertCard({ reason = 'blurry', onRetry, lang = 'mr' }) {
  const t = SMART_I18N[lang] || SMART_I18N.mr;

  const isDark = reason === 'too_dark';
  const isBlur = reason === 'extremely_blurry';

  return (
    <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 text-center space-y-5 shadow-xl animate-in zoom-in-95">
      
      <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center shadow-inner">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <div className="space-y-1">
        <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
          STAGE 1 IMAGE QUALITY ALERT
        </span>
        <h3 className="text-2xl font-black text-slate-900 mt-1">📸 Please take a clearer photo</h3>
        <p className="text-xs text-slate-600 font-semibold max-w-sm mx-auto">
          {isDark
            ? 'The uploaded image is too dark for accurate defect analysis.'
            : isBlur
            ? 'The photo is out of focus or blurry.'
            : 'Image resolution or lighting is insufficient.'}
        </p>
      </div>

      {/* Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-800 text-left max-w-md mx-auto">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Keep onions close to the camera</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Use good lighting & avoid shadows</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
          <Camera className="w-4 h-4 text-onion-600 flex-shrink-0" />
          <span>Keep camera steady</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Capture multiple onions</span>
        </div>
      </div>

      <button
        onClick={onRetry}
        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold text-xs shadow-lg hover:from-amber-600 transition-all active:scale-95 inline-flex items-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Try Again / Capture New Photo</span>
      </button>

    </div>
  );
}
