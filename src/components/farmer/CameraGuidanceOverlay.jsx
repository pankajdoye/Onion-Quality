import React from 'react';
import { Camera, Sun, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS } from '../../utils/i18n';

export default function CameraGuidanceOverlay({ lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 space-y-3">
      <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider">
        <Sparkles className="w-4 h-4 text-amber-600" />
        <span>{t.cameraTipTitle}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs text-amber-950 font-medium">
        <div className="flex items-center gap-2 bg-white/80 p-2 rounded-xl border border-amber-200/60">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{t.cameraTip1}</span>
        </div>
        <div className="flex items-center gap-2 bg-white/80 p-2 rounded-xl border border-amber-200/60">
          <Sun className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>{t.cameraTip2}</span>
        </div>
        <div className="flex items-center gap-2 bg-white/80 p-2 rounded-xl border border-amber-200/60">
          <Camera className="w-4 h-4 text-onion-600 flex-shrink-0" />
          <span>{t.cameraTip3}</span>
        </div>
        <div className="flex items-center gap-2 bg-white/80 p-2 rounded-xl border border-amber-200/60">
          <ShieldAlert className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span>Avoid blurred or dark photos</span>
        </div>
      </div>
    </div>
  );
}
