import React from 'react';
import { CheckCircle2, AlertTriangle, Biohazard, Sprout, Minimize2, Sliders } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function DetailedBreakdownModal({ data, lang = 'mr' }) {
  const t = SMART_I18N[lang] || SMART_I18N.mr;

  return (
    <div className="pt-4 border-t border-slate-200 dark:border-[#374151] space-y-6 animate-in fade-in transition-colors">
      
      {/* 5 Onion Defect Counts */}
      <div className="space-y-2">
        <h4 className="text-xs font-black uppercase tracking-wider text-[#263238] dark:text-[#F5F7FA] flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#66BB6A]" />
          Individual Onion Counts (200 Analyzed)
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 block">{t.healthyCount}</span>
            <span className="text-2xl font-black text-emerald-700 dark:text-[#66BB6A] mt-1 block">{data.healthy}</span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
            <span className="text-[11px] font-bold text-amber-900 dark:text-[#F59E0B] block">{t.damagedCount}</span>
            <span className="text-2xl font-black text-amber-700 dark:text-amber-400 mt-1 block">{data.damaged}</span>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
            <span className="text-[11px] font-bold text-rose-900 dark:text-[#EF5350] block">{t.rottenCount}</span>
            <span className="text-2xl font-black text-rose-700 dark:text-rose-400 mt-1 block">{data.rotten}</span>
          </div>

          <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800">
            <span className="text-[11px] font-bold text-orange-900 dark:text-orange-300 block">{t.sproutedCount}</span>
            <span className="text-2xl font-black text-orange-700 dark:text-orange-400 mt-1 block">{data.sprouted}</span>
          </div>

          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 col-span-2 sm:col-span-1">
            <span className="text-[11px] font-bold text-blue-900 dark:text-blue-300 block">{t.undersizedCount}</span>
            <span className="text-2xl font-black text-blue-700 dark:text-blue-400 mt-1 block">{data.undersized}</span>
          </div>
        </div>
      </div>

      {/* Grade Tier Percentage Bars (Green, Yellow, Red) */}
      <div className="space-y-3">
        <h4 className="text-xs font-black uppercase tracking-wider text-[#263238] dark:text-[#F5F7FA]">
          Grade Tier Breakdown (%)
        </h4>

        {/* Grade A - Green */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-emerald-800 dark:text-[#66BB6A] flex items-center gap-1">🟢 {t.gradeA}</span>
            <span className="text-emerald-700 dark:text-[#66BB6A] font-extrabold">{data.grade_a}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-[#202A35] h-3 rounded-full overflow-hidden border border-slate-200 dark:border-[#374151]">
            <div className="bg-[#66BB6A] h-full rounded-full transition-all duration-1000" style={{ width: `${data.grade_a}%` }}></div>
          </div>
        </div>

        {/* Grade B - Yellow */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-amber-800 dark:text-[#F59E0B] flex items-center gap-1">🟡 {t.gradeB}</span>
            <span className="text-amber-700 dark:text-[#F59E0B] font-extrabold">{data.grade_b}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-[#202A35] h-3 rounded-full overflow-hidden border border-slate-200 dark:border-[#374151]">
            <div className="bg-[#F59E0B] h-full rounded-full transition-all duration-1000" style={{ width: `${data.grade_b}%` }}></div>
          </div>
        </div>

        {/* URS - Red */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-rose-800 dark:text-[#EF5350] flex items-center gap-1">🔴 {t.urs}</span>
            <span className="text-rose-700 dark:text-[#EF5350] font-extrabold">{data.urs}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-[#202A35] h-3 rounded-full overflow-hidden border border-slate-200 dark:border-[#374151]">
            <div className="bg-[#EF5350] h-full rounded-full transition-all duration-1000" style={{ width: `${data.urs}%` }}></div>
          </div>
        </div>
      </div>

    </div>
  );
}
