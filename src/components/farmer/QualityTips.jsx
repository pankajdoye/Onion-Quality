import React from 'react';
import { Sparkles, ShieldCheck, Sun, Layers, AlertCircle } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function QualityTips({ lang = 'mr' }) {
  const t = SMART_I18N[lang] || SMART_I18N.mr;

  const tips = [
    {
      title: 'Avoid Rotten Onions',
      desc: 'Remove damaged or soft neck onions immediately to prevent black mold spread.',
      icon: ShieldCheck,
      color: 'bg-emerald-100 text-emerald-800'
    },
    {
      title: 'Reduce Moisture',
      desc: 'Keep onions thoroughly field-cured and dry before moving to storage structures.',
      icon: Sun,
      color: 'bg-amber-100 text-amber-800'
    },
    {
      title: 'Prevent Sprouting',
      desc: 'Store in well-ventilated bamboo structures (Kanda Chawl) with low humidity.',
      icon: Sparkles,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      title: 'Sort Before Selling',
      desc: 'Separate Grade A (>60mm) bulbs from smaller onions to get maximum mandi price.',
      icon: Layers,
      color: 'bg-blue-100 text-blue-800'
    }
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-4">
      
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-onion-600" />
          🧅 {t.improveQualityTips}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tips.map((t, idx) => {
          const Icon = t.icon;
          return (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className={`p-2.5 rounded-xl font-bold ${t.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-slate-900">{t.title}</h4>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed mt-0.5">{t.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
