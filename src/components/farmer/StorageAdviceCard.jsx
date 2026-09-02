import React from 'react';
import { Home, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function StorageAdviceCard({ qualityScore = 87, lang = 'mr' }) {
  const t = SMART_I18N[lang] || SMART_I18N.mr;

  const isStore = qualityScore >= 80;
  const isPartial = qualityScore >= 65 && qualityScore < 80;

  return (
    <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-6 shadow-md space-y-4 transition-colors">
      
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#374151] pb-3">
        <h3 className="text-sm font-black text-[#263238] dark:text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
          <Home className="w-4 h-4 text-[#66BB6A]" />
          🏠 {t.shouldIStore}
        </h3>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          AI Storage Intelligence
        </span>
      </div>

      {/* Suggestion Card */}
      <div className={`p-5 rounded-2xl border text-center space-y-1 shadow-md ${
        isStore
          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400'
          : isPartial
          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-400'
          : 'bg-gradient-to-r from-rose-500 to-rose-600 text-white border-rose-400'
      }`}>
        <span className="text-[10px] font-black uppercase tracking-widest text-white/90 block">AI Suggestion</span>
        <div className="text-2xl sm:text-3xl font-black">
          {isStore ? `🟢 ${t.store}` : isPartial ? `🟡 ${t.sellSomeStoreSome}` : `🔴 ${t.sell}`}
        </div>
        <p className="text-xs font-semibold text-white/90 max-w-md mx-auto">
          {isStore
            ? '“Your onions are good quality with thick dry scale layers. Market prices show an upward trend over 2-3 months.”'
            : isPartial
            ? '“Consider selling 50% of stock now to lock in current prices, and store the remaining lot for peak rates.”'
            : '“Quality may degrade quickly during storage due to moisture or sprouting. Selling soon is recommended.”'}
        </p>
      </div>

      <p className="text-[11px] text-[#607D8B] dark:text-[#B8C2CC] text-center">
        * Clearly labeled as an AI suggestion, not guaranteed financial advice.
      </p>

    </div>
  );
}
