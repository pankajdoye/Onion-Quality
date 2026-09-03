import React from 'react';
import { Camera, Sun, ShieldAlert, RefreshCw, CheckCircle2 } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function BlurDarknessAlertCard({ message, reason = 'blurry', onRetake, lang = 'en' }) {
  const t = SMART_I18N[lang] || SMART_I18N.en;

  const labels = {
    mr: {
      badge: "इमेज गुणवत्ता इशारा",
      title: "कांदा आढळला, परंतु विश्वासार्ह ग्रेडिंगसाठी फोटोची गुणवत्ता अपुरी आहे.",
      sub: "कृपया स्पष्ट प्रकाशात पुन्हा फोटो काढा.",
      retakeBtn: "पुन्हा फोटो काढा (Retake Photo)",
      tip1: "कांदे कॅमेऱ्यासमोर स्पष्ट ठेवा",
      tip2: "चांगला प्रकाश ठेवा आणि सावली टाळा",
      tip3: "कॅमेरा स्थिर ठेवा आणि जवळून फोटो काढा",
      tip4: "लॉट तपासणीसाठी एकाच वेळी अनेक कांदे ठेवा"
    },
    hi: {
      badge: "फोटो गुणवत्ता चेतावनी",
      title: "प्याज पहचाना गया, लेकिन सटीक ग्रेडिंग के लिए फोटो की गुणवत्ता पर्याप्त नहीं है।",
      sub: "कृपया अच्छी रोशनी में पुनः फोटो खींचें।",
      retakeBtn: "पुनः फोटो खींचें (Retake Photo)",
      tip1: "प्याज को कैमरे के सामने स्पष्ट रखें",
      tip2: "पर्याप्त रोशनी रखें और छाया से बचें",
      tip3: "कैमरा स्थिर रखें और पास से फोटो लें",
      tip4: "सटीक मूल्यांकन हेतु कई प्याज एक साथ रखें"
    },
    en: {
      badge: "Image Quality Alert",
      title: "Onion detected, but image quality is insufficient for reliable grading.",
      sub: "Please retake the photo with clear lighting and steady focus.",
      retakeBtn: "Retake Photo",
      tip1: "Place onions clearly in camera frame",
      tip2: "Ensure adequate lighting & avoid dark shadows",
      tip3: "Keep camera steady and in focus",
      tip4: "Capture multiple onions for batch grading"
    }
  };

  const l = labels[lang] || labels.en;

  return (
    <div className="bg-white dark:bg-[#1F2933] rounded-3xl border-2 border-amber-300 dark:border-amber-700 p-6 sm:p-8 text-center space-y-5 shadow-xl animate-in zoom-in-95 transition-colors">
      
      <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center shadow-inner">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800">
          {l.badge}
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-[#263238] dark:text-[#F5F7FA] mt-1 max-w-lg mx-auto">
          {message || l.title}
        </h3>
        <p className="text-xs text-[#607D8B] dark:text-[#B8C2CC] font-semibold max-w-sm mx-auto">
          {l.sub}
        </p>
      </div>

      {/* Farmer Guidance Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-[#263238] dark:text-[#F5F7FA] text-left max-w-md mx-auto">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#202A35] border border-slate-200 dark:border-[#374151] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#66BB6A] flex-shrink-0" />
          <span>{l.tip1}</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#202A35] border border-slate-200 dark:border-[#374151] flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <span>{l.tip2}</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#202A35] border border-slate-200 dark:border-[#374151] flex items-center gap-2">
          <Camera className="w-4 h-4 text-emerald-600 dark:text-[#66BB6A] flex-shrink-0" />
          <span>{l.tip3}</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#202A35] border border-slate-200 dark:border-[#374151] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#66BB6A] flex-shrink-0" />
          <span>{l.tip4}</span>
        </div>
      </div>

      <div>
        <button
          onClick={onRetake}
          className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{l.retakeBtn}</span>
        </button>
      </div>

    </div>
  );
}
