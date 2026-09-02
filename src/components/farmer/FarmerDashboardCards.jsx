import React from 'react';
import { Award, TrendingUp, Clock, Calendar } from 'lucide-react';
import { TRANSLATIONS } from '../../utils/i18n';

export default function FarmerDashboardCards({
  qualityGrade = 'Grade A',
  qualityScore = 87,
  expectedPrice = '₹2,600 / quintal',
  trend = 'Rising (+8%)',
  recommendation = '🟢 SELL NOW',
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="space-y-6">
      
      {/* 4 Large Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: My Onion Quality */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-50 to-emerald-100/80 border border-emerald-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
            🧅
          </div>
          <div>
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">{t.yourQuality}</span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{qualityGrade}</div>
            <span className="text-xs font-extrabold text-emerald-700">Score: {qualityScore}/100</span>
          </div>
        </div>

        {/* Card 2: Expected Price */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-onion-50 to-purple-100/80 border border-onion-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-onion-600 text-white flex items-center justify-center text-2xl font-black shadow-md">
            ₹
          </div>
          <div>
            <span className="text-[11px] font-bold text-onion-900 uppercase tracking-wider block">{t.expectedPrice}</span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{expectedPrice}</div>
            <span className="text-xs font-semibold text-onion-700">Lasalgaon APMC</span>
          </div>
        </div>

        {/* Card 3: Market Trend */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-50 to-amber-100/80 border border-amber-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">{t.marketTrend}</span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{trend}</div>
            <span className="text-xs font-semibold text-amber-800">Festive Season Surge</span>
          </div>
        </div>

        {/* Card 4: Best Time to Sell */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100/80 border border-blue-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block">{t.bestTimeToSell}</span>
            <div className="text-lg font-black text-slate-900 mt-0.5">{recommendation}</div>
            <span className="text-xs font-semibold text-blue-700">Optimal Window</span>
          </div>
        </div>

      </div>

    </div>
  );
}
