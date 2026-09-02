import React, { useState } from 'react';
import { Eye, Sparkles } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function InteractiveImageResult({ sampleImage, lang = 'en' }) {
  const [viewMode, setViewMode] = useState('ai'); // 'original' or 'ai'
  const [selectedOnion, setSelectedOnion] = useState(null);
  const t = SMART_I18N[lang] || SMART_I18N.en;

  const notes = {
    mr: {
      bulb1: "उत्कृष्ट निर्यातक्षम कांदा",
      bulb2: "उत्कृष्ट निर्यातक्षम कांदा",
      bulb3: "कापलेला / साल दुखापत",
      bulb4: "मानेजवळ सडलेला भाग",
      bulb5: "१५mm हिरवा कोंब",
      bulb6: "४५mm पेक्षा लहान आकार",
      diameter: "कांद्याचा व्यास:",
      close: "बंद करा",
      preview: "फोटो प्रिव्ह्यू"
    },
    hi: {
      bulb1: "उत्कृष्ट निर्यात योग्य प्याज",
      bulb2: "उत्कृष्ट निर्यात योग्य प्याज",
      bulb3: "कटा हुआ / छिलका क्षतिग्रस्त",
      bulb4: "गर्दन के पास सड़न",
      bulb5: "15mm हरा अंकुर",
      bulb6: "45mm से छोटा आकार",
      diameter: "प्याज का व्यास:",
      close: "बंद करें",
      preview: "फोटो पूर्वावलोकन"
    },
    en: {
      bulb1: "Export Quality Bulb",
      bulb2: "Export Quality Bulb",
      bulb3: "Skin split / Cut",
      bulb4: "Neck rot spot",
      bulb5: "Green shoot 15mm",
      bulb6: "Below 45mm diameter",
      diameter: "Bulb Diameter:",
      close: "Close",
      preview: "Photo Preview"
    }
  };

  const n = notes[lang] || notes.en;

  const onions = [
    { id: 1, label: t.good || 'Good', status: 'good', x: 14, y: 18, w: 22, h: 25, color: 'border-emerald-500 bg-emerald-500/20 text-emerald-300', badge: 'bg-[#66BB6A] text-white', size: '72mm', note: n.bulb1 },
    { id: 2, label: t.good || 'Good', status: 'good', x: 40, y: 16, w: 24, h: 26, color: 'border-emerald-500 bg-emerald-500/20 text-emerald-300', badge: 'bg-[#66BB6A] text-white', size: '74mm', note: n.bulb2 },
    { id: 3, label: t.damaged || 'Damaged', status: 'damaged', x: 68, y: 22, w: 21, h: 24, color: 'border-amber-500 bg-amber-500/20 text-amber-300', badge: 'bg-[#F59E0B] text-white', size: '68mm', note: n.bulb3 },
    { id: 4, label: t.rotten || 'Rotten', status: 'rotten', x: 16, y: 54, w: 23, h: 25, color: 'border-rose-500 bg-rose-500/25 text-rose-300', badge: 'bg-[#EF5350] text-white', size: '64mm', note: n.bulb4 },
    { id: 5, label: t.sprouted || 'Sprouted', status: 'sprouted', x: 44, y: 55, w: 22, h: 28, color: 'border-orange-500 bg-orange-500/20 text-orange-300', badge: 'bg-orange-600 text-white', size: '66mm', note: n.bulb5 },
    { id: 6, label: t.small || 'Undersized', status: 'small', x: 73, y: 56, w: 14, h: 16, color: 'border-blue-500 bg-blue-500/20 text-blue-300', badge: 'bg-blue-600 text-white', size: '42mm', note: n.bulb6 }
  ];

  return (
    <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-6 shadow-md space-y-4 transition-colors">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-[#374151] pb-3">
        <div>
          <h3 className="text-sm font-black text-[#263238] dark:text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#66BB6A]" />
            {t.aiCheckedImage || "AI Visual Inspection"}
          </h3>
          <p className="text-xs text-[#607D8B] dark:text-[#B8C2CC] font-medium">{t.tapOnionInstruction || "Tap detected boxes for bulb details"}</p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-slate-100 dark:bg-[#202A35] p-1 rounded-2xl border border-slate-200 dark:border-[#374151] text-xs font-extrabold">
          <button
            onClick={() => setViewMode('original')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              viewMode === 'original' 
                ? 'bg-white dark:bg-[#121820] text-[#263238] dark:text-[#F5F7FA] shadow-sm' 
                : 'text-[#607D8B] dark:text-[#B8C2CC]'
            }`}
          >
            {t.originalImage || "Original"}
          </button>
          <button
            onClick={() => setViewMode('ai')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
              viewMode === 'ai' 
                ? 'bg-[#66BB6A] text-white shadow-sm font-black' 
                : 'text-[#607D8B] dark:text-[#B8C2CC]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t.aiCheckedImage || "AI Overlay"}
          </button>
        </div>
      </div>

      {/* Main Image Frame */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-slate-900 bg-slate-950 aspect-[4/3] max-h-96 flex items-center justify-center shadow-xl">
        {sampleImage ? (
          <img src={sampleImage} alt="Onion analysis frame" className="w-full h-full object-contain opacity-90" />
        ) : (
          <div className="text-slate-500 text-xs font-bold">{n.preview}</div>
        )}

        {/* Overlay Bounding Boxes */}
        {viewMode === 'ai' && onions.map((o) => (
          <div
            key={o.id}
            onClick={() => setSelectedOnion(selectedOnion?.id === o.id ? null : o)}
            style={{ left: `${o.x}%`, top: `${o.y}%`, width: `${o.w}%`, height: `${o.h}%` }}
            className={`absolute border-2 rounded-xl transition-all duration-200 cursor-pointer ${o.color} ${
              selectedOnion?.id === o.id ? 'scale-105 ring-4 ring-white z-30' : 'z-10'
            }`}
          >
            <div className={`absolute -top-5 left-0 px-2 py-0.5 rounded text-[10px] font-black shadow ${o.badge}`}>
              {o.label}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Onion Tap Card Popup */}
      {selectedOnion && (
        <div className="p-4 rounded-2xl bg-slate-900 dark:bg-[#18212B] border border-slate-700 dark:border-[#374151] text-white space-y-1 animate-in fade-in flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-xs font-extrabold ${selectedOnion.badge}`}>
                {selectedOnion.label}
              </span>
              <span className="text-xs font-mono font-bold text-[#66BB6A]">{n.diameter} {selectedOnion.size}</span>
            </div>
            <p className="text-xs text-slate-300 dark:text-[#B8C2CC] font-medium mt-1">{selectedOnion.note}</p>
          </div>
          <button onClick={() => setSelectedOnion(null)} className="text-xs text-slate-400 hover:text-white underline">{n.close}</button>
        </div>
      )}

      {/* Simple Color Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-bold text-[#263238] dark:text-[#F5F7FA]">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#66BB6A]"></span> 🟢 {t.good || "Healthy"}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#F59E0B]"></span> 🟡 {t.damaged || "Damaged"}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#EF5350]"></span> 🔴 {t.rotten || "Rotten"}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-500"></span> 🟠 {t.sprouted || "Sprouted"}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500"></span> 🔵 {t.small || "Undersized"}</span>
      </div>

    </div>
  );
}
