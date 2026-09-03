import React, { useState } from 'react';
import { Eye, Sparkles, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function InteractiveImageResult({ sampleImage, individualOnions = [], lang = 'en' }) {
  const [viewMode, setViewMode] = useState('ai'); // 'original' or 'ai'
  const [selectedOnion, setSelectedOnion] = useState(null);
  const t = SMART_I18N[lang] || SMART_I18N.en;

  const labels = {
    mr: {
      bulbPrefix: "कांदा #",
      diameter: "कांद्याचा व्यास:",
      confidence: "विश्वासार्हता:",
      defects: "दोष:",
      noDefects: "कोणताही दोष नाही (निरोगी)",
      close: "बंद करा",
      preview: "फोटो प्रिव्ह्यू",
      bulbListTitle: "तपासणी केलेले वैयक्तिक कांदे",
      viewDetails: "तपशील पहा",
      hideDetails: "तपशील लपवा"
    },
    hi: {
      bulbPrefix: "प्याज #",
      diameter: "प्याज का व्यास:",
      confidence: "सटीकता:",
      defects: "पहचाने गए दोष:",
      noDefects: "कोई दोष नहीं (स्वस्थ)",
      close: "बंद करें",
      preview: "फोटो पूर्वावलोकन",
      bulbListTitle: "जांचे गए व्यक्तिगत प्याज",
      viewDetails: "विवरण देखें",
      hideDetails: "विवरण छिपाएं"
    },
    en: {
      bulbPrefix: "Onion #",
      diameter: "Bulb Diameter:",
      confidence: "Confidence:",
      defects: "Detected Defects:",
      noDefects: "No visible defects (Sound & Healthy)",
      close: "Close",
      preview: "Photo Preview",
      bulbListTitle: "Individual Onion Inspection",
      viewDetails: "View Details",
      hideDetails: "Hide Details"
    }
  };

  const l = labels[lang] || labels.en;

  // Format onions array safely
  const onions = Array.isArray(individualOnions) && individualOnions.length > 0
    ? individualOnions.map((o) => {
        const isGood = o.grade === 'GOOD' || o.assigned_grade === 'GRADE A';
        const isPoor = o.grade === 'POOR';
        
        let color = 'border-amber-500 bg-amber-500/20 text-amber-300';
        let badge = 'bg-[#F59E0B] text-white';
        let status = 'AVERAGE';

        if (isGood) {
          color = 'border-emerald-500 bg-emerald-500/20 text-emerald-300';
          badge = 'bg-[#66BB6A] text-white';
          status = 'GOOD';
        } else if (isPoor) {
          color = 'border-rose-500 bg-rose-500/25 text-rose-300';
          badge = 'bg-[#EF5350] text-white';
          status = 'POOR';
        }

        const defectItems = [];
        if (o.rot === 'Detected') defectItems.push(lang === 'mr' ? 'सडलेला / बुरशी' : lang === 'hi' ? 'सड़न / फफूंद' : 'Rotten / Mold');
        if (o.damage === 'Severe') defectItems.push(lang === 'mr' ? 'गंभीर नुकसान' : lang === 'hi' ? 'गंभीर क्षति' : 'Severe Damage');
        else if (o.damage === 'Minor') defectItems.push(lang === 'mr' ? 'साल कट' : lang === 'hi' ? 'छिलका कटना' : 'Skin Cut');
        if (o.sprouting === 'Detected') defectItems.push(lang === 'mr' ? 'हिरवा कोंब' : lang === 'hi' ? 'हरा अंकुर' : 'Sprouting');
        if (o.crack === 'Detected') defectItems.push(lang === 'mr' ? 'तडा' : lang === 'hi' ? 'दरार' : 'Crack');
        if (o.undersized) defectItems.push(lang === 'mr' ? 'लहान आकार (<४५mm)' : lang === 'hi' ? 'छोटा आकार (<45mm)' : 'Undersized (<45mm)');

        return {
          id: o.onion_id,
          label: `${l.bulbPrefix}${o.onion_id}: ${o.assigned_grade || status}`,
          status,
          assignedGrade: o.assigned_grade || (isGood ? 'GRADE A' : 'URS'),
          x: o.bbox_norm ? o.bbox_norm[0] : 10,
          y: o.bbox_norm ? o.bbox_norm[1] : 10,
          w: o.bbox_norm ? o.bbox_norm[2] : 25,
          h: o.bbox_norm ? o.bbox_norm[3] : 25,
          color,
          badge,
          size: `${o.diameter_mm || 65} mm`,
          confidence: `${Math.round((o.confidence || 0.85) * 100)}%`,
          defectText: defectItems.length > 0 ? defectItems.join(', ') : l.noDefects,
          defectsList: defectItems
        };
      })
    : [];

  return (
    <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-5 sm:p-6 shadow-md space-y-4 transition-colors">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-[#374151] pb-3">
        <div>
          <h3 className="text-sm font-black text-[#263238] dark:text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#66BB6A]" />
            {t.aiCheckedImage || "AI Visual Inspection"}
          </h3>
          <p className="text-xs text-[#607D8B] dark:text-[#B8C2CC] font-medium">
            {t.tapOnionInstruction || "Tap detected boxes for individual bulb details"}
          </p>
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

      {/* Main Image Frame with Overlays */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-slate-900 bg-slate-950 aspect-[4/3] max-h-96 flex items-center justify-center shadow-xl">
        {sampleImage ? (
          <img src={sampleImage} alt="Onion analysis frame" className="w-full h-full object-contain opacity-95" />
        ) : (
          <div className="text-slate-500 text-xs font-bold">{l.preview}</div>
        )}

        {/* Dynamic Overlay Bounding Boxes */}
        {viewMode === 'ai' && onions.map((o) => (
          <div
            key={o.id}
            onClick={() => setSelectedOnion(selectedOnion?.id === o.id ? null : o)}
            style={{ left: `${o.x}%`, top: `${o.y}%`, width: `${o.w}%`, height: `${o.h}%` }}
            className={`absolute border-2 rounded-xl transition-all duration-200 cursor-pointer ${o.color} ${
              selectedOnion?.id === o.id ? 'scale-105 ring-4 ring-white z-30' : 'z-10 hover:scale-[1.02]'
            }`}
          >
            <div className={`absolute -top-5 left-0 px-2 py-0.5 rounded text-[10px] font-black shadow whitespace-nowrap ${o.badge}`}>
              {o.label}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Onion Tap Card Popup */}
      {selectedOnion && (
        <div className="p-4 rounded-2xl bg-slate-900 dark:bg-[#18212B] border border-slate-700 dark:border-[#374151] text-white space-y-2 animate-in fade-in flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded text-xs font-black ${selectedOnion.badge}`}>
                {selectedOnion.label}
              </span>
              <span className="text-xs font-mono font-bold text-[#66BB6A]">{l.diameter} {selectedOnion.size}</span>
              <span className="text-xs font-mono font-bold text-slate-300">({l.confidence} {selectedOnion.confidence})</span>
            </div>
            <p className="text-xs text-slate-300 dark:text-[#B8C2CC] font-medium">
              <strong className="text-white">{l.defects}</strong> {selectedOnion.defectText}
            </p>
          </div>
          <button 
            onClick={() => setSelectedOnion(null)} 
            className="text-xs text-slate-400 hover:text-white underline self-end sm:self-center"
          >
            {l.close}
          </button>
        </div>
      )}

      {/* Color Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-bold text-[#263238] dark:text-[#F5F7FA]">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#66BB6A]"></span> 🟢 {t.good || "Grade A (Good)"}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#F59E0B]"></span> 🟡 {t.average || "URS (Average)"}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#EF5350]"></span> 🔴 {t.poor || "URS (Defective/Poor)"}</span>
      </div>

      {/* Individual Onion Detailed Cards List (PHASE 17 Requirement) */}
      {onions.length > 0 && (
        <div className="pt-4 border-t border-slate-100 dark:border-[#374151] space-y-3">
          <h4 className="text-xs font-black text-[#263238] dark:text-[#F5F7FA] uppercase tracking-wider">
            {l.bulbListTitle} ({onions.length})
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {onions.map((o) => (
              <div 
                key={o.id}
                onClick={() => setSelectedOnion(o)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedOnion?.id === o.id
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 ring-2 ring-emerald-400'
                    : 'border-slate-200 dark:border-[#374151] bg-[#F7F8FA] dark:bg-[#202A35] hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${o.status === 'GOOD' ? 'bg-[#66BB6A]' : o.status === 'POOR' ? 'bg-[#EF5350]' : 'bg-[#F59E0B]'}`}></span>
                    <span className="font-extrabold text-xs text-[#263238] dark:text-[#F5F7FA]">{l.bulbPrefix}{o.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${o.badge}`}>
                      {o.assignedGrade} ({o.status})
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#607D8B] dark:text-[#B8C2CC]">
                    {o.confidence}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-[#607D8B] dark:text-[#B8C2CC] font-medium">
                  <span>{l.diameter} {o.size}</span>
                  <span className="truncate max-w-[50%] text-right font-semibold text-[#263238] dark:text-[#F5F7FA]">
                    {o.defectText}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
