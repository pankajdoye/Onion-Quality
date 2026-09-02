import React, { useRef } from 'react';
import { Camera, Upload, CheckCircle2, Image as ImageIcon, ShieldAlert } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function OneTapCheck({ onImageSelected, onPresetTestSelected, lang = 'en' }) {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const t = SMART_I18N[lang] || SMART_I18N.en;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      onImageSelected(evt.target.result);
    };
    reader.readAsDataURL(file);
  };

  const labels = {
    mr: {
      sub: "त्वरित संगणक दृष्टी गुणवत्ता तपासणीसाठी फोटो निवडा",
      presetsTitle: "सत्यापन चाचणी पर्याय:",
      presetsSub: "स्टेज १ तपासणी तपासा",
      batchBtn: "✅ खरा कांदा लॉट",
      singleBtn: "🧅 १ कांदा (Single)",
      rejectBtn: "❌ इतर भाजी (टोमॅटो)"
    },
    hi: {
      sub: "त्वरित कंप्यूटर विज़न गुणवत्ता जांच के लिए फोटो चुनें",
      presetsTitle: "सत्यापन परीक्षण विकल्प:",
      presetsSub: "स्टेज 1 गेट जांचें",
      batchBtn: "✅ असली प्याज लॉट",
      singleBtn: "🧅 1 प्याज (Single)",
      rejectBtn: "❌ अन्य सब्जी (टमाटर)"
    },
    en: {
      sub: "Select a photo for instant computer vision grading",
      presetsTitle: "Verification Testing Presets:",
      presetsSub: "Click to test Stage 1 Gate",
      batchBtn: "✅ Real Onion Batch",
      singleBtn: "🧅 Single Onion",
      rejectBtn: "❌ Non-Onion (Tomato)"
    }
  };

  const l = labels[lang] || labels.en;

  return (
    <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-6 sm:p-8 shadow-sm text-center space-y-6 transition-colors">
      
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-[#66BB6A] mx-auto flex items-center justify-center shadow-inner">
        <Camera className="w-8 h-8" />
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-black text-[#263238] dark:text-[#F5F7FA]">{t.uploadTitle || "Capture or Upload Clear Onion Photo"}</h2>
        <p className="text-xs text-[#607D8B] dark:text-[#B8C2CC] font-semibold mt-1">{l.sub}</p>
      </div>

      {/* 2 Main Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-[#66BB6A] hover:bg-emerald-600 text-white font-extrabold text-base shadow-md transition-all active:scale-95"
        >
          <Camera className="w-6 h-6 text-amber-200" />
          <span>{t.takePhoto || "📷 Capture Onion Image"}</span>
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-slate-900 dark:bg-[#202A35] text-white font-extrabold text-base shadow-md hover:bg-slate-800 dark:hover:bg-[#263238] transition-all active:scale-95 border border-slate-700 dark:border-[#374151]"
        >
          <ImageIcon className="w-6 h-6 text-[#66BB6A]" />
          <span>{t.uploadPhoto || "🖼️ Upload Photo"}</span>
        </button>
      </div>

      {/* Simple Instructions */}
      <div className="pt-2 border-t border-slate-100 dark:border-[#374151] grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-bold text-[#607D8B] dark:text-[#B8C2CC]">
        <span className="flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#66BB6A]" /> {t.tip1 || "Clear view of onions"}</span>
        <span className="flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#66BB6A]" /> {t.tip2 || "Adequate lighting"}</span>
        <span className="flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#66BB6A]" /> {t.tip3 || "Steady camera"}</span>
      </div>

      {/* Preset Test Scenarios */}
      <div className="pt-4 border-t border-slate-100 dark:border-[#374151] space-y-2">
        <div className="flex items-center justify-between text-xs font-extrabold text-[#263238] dark:text-[#F5F7FA]">
          <span className="flex items-center gap-1">
            <ShieldAlert className="w-4 h-4 text-[#F59E0B]" /> {l.presetsTitle}
          </span>
          <span className="text-[10px] text-[#607D8B] dark:text-[#B8C2CC] font-semibold">{l.presetsSub}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <button
            onClick={() => onPresetTestSelected('clear_batch', 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80')}
            className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-200"
          >
            {l.batchBtn}
          </button>

          <button
            onClick={() => onPresetTestSelected('single_onion', 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80')}
            className="px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-800 hover:bg-amber-200"
          >
            {l.singleBtn}
          </button>

          <button
            onClick={() => onPresetTestSelected('tomato', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80')}
            className="px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-300 font-bold border border-rose-300 dark:border-rose-800 hover:bg-rose-200"
          >
            {l.rejectBtn}
          </button>
        </div>
      </div>

    </div>
  );
}
