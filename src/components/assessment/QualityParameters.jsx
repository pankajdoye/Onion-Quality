import React from 'react';
import { Sliders, Sparkles } from 'lucide-react';

export default function QualityParameters({
  appearance = 92,
  sizeUniformity = 84,
  damageLevel = 88,
  rottenness = 96,
  sprouting = 94,
  overallQuality = 87
}) {
  const parameters = [
    { label: 'Appearance & Skin Integrity', value: appearance, desc: 'Color richness, dry outer scale integrity, zero mud staining' },
    { label: 'Size Uniformity Index', value: sizeUniformity, desc: 'Diameter variation standard deviation across batch' },
    { label: 'Freedom from Mechanical Damage', value: damageLevel, desc: 'Absence of harvesting cuts, skin splits, or pressure bruises' },
    { label: 'Rottenness & Fungal Immunity', value: rottenness, desc: 'Absence of neck rot, soft spots, and internal mold' },
    { label: 'Dormancy & Non-Sprouting', value: sprouting, desc: 'Bulb firmness and absence of visible green foliage shoots' },
    { label: 'Overall Cumulative Quality', value: overallQuality, desc: 'Weighted AGMARK index synthesis', highlight: true }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
      
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Sliders className="w-4 h-4 text-onion-600" />
          Quality Score Breakdown Parameters
        </h3>
        <span className="text-xs text-slate-500 font-semibold">AGMARK Quality Index</span>
      </div>

      <div className="space-y-4">
        {parameters.map((param, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-xl transition-all ${
              param.highlight
                ? 'bg-onion-50/80 border border-onion-200 shadow-sm'
                : 'bg-slate-50/60 border border-slate-100 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-xs font-bold ${param.highlight ? 'text-onion-950 flex items-center gap-1.5' : 'text-slate-800'}`}>
                {param.highlight && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                {param.label}
              </span>
              <span className={`text-sm font-extrabold ${
                param.value >= 90
                  ? 'text-emerald-600'
                  : param.value >= 75
                  ? 'text-amber-600'
                  : 'text-rose-600'
              }`}>
                {param.value}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mb-1">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  param.highlight
                    ? 'bg-gradient-to-r from-onion-700 to-onion-500'
                    : param.value >= 90
                    ? 'bg-emerald-500'
                    : param.value >= 75
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${param.value}%` }}
              ></div>
            </div>

            <p className="text-[10px] text-slate-500">{param.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
