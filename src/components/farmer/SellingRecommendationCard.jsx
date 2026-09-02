import React from 'react';
import { Calendar, TrendingUp, AlertCircle, Info, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../../utils/i18n';

export default function SellingRecommendationCard({
  recommendation = '🟢 SELL NOW',
  expectedRange = '₹2,500 – ₹2,800 / quintal',
  currentPrice = '₹2,550 / quintal',
  marketName = 'Lasalgaon APMC',
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const isSellNow = recommendation.includes('SELL NOW');
  const isWait = recommendation.includes('WAIT');

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Calendar className="w-4 h-4 text-onion-600" />
          {t.bestTimeToSell}
        </h3>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
          AI Trend Analysis
        </span>
      </div>

      {/* Main Recommendation Badge */}
      <div className={`p-6 rounded-2xl border text-center space-y-2 shadow-inner ${
        isSellNow
          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-400'
          : isWait
          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-400'
          : 'bg-gradient-to-r from-rose-500 to-rose-600 text-white border-rose-400'
      }`}>
        <span className="text-xs font-extrabold uppercase tracking-widest text-white/90 block">
          Recommendation
        </span>
        <div className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow-sm">
          {recommendation}
        </div>
        <p className="text-xs font-semibold text-white/90 max-w-md mx-auto">
          {isSellNow
            ? 'Current prices in Lasalgaon & Nashik APMC are optimal for Grade A/B crop lots.'
            : isWait
            ? 'Prices are trending upwards. Waiting 1-2 weeks is expected to yield higher rates.'
            : 'Arrivals are increasing. Selling soon minimizes risks of price drop.'}
        </p>
      </div>

      {/* Price Comparison Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Expected Price Target</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{expectedRange}</span>
          <span className="text-[11px] text-slate-500 font-medium">Based on current quality & market</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Current Market Rate</span>
          <span className="text-2xl font-black text-onion-700 mt-1 block">{currentPrice}</span>
          <span className="text-[11px] text-slate-500 font-medium">{marketName}</span>
        </div>
      </div>

      {/* Historical Trend explanation */}
      <div className="p-3.5 rounded-xl bg-onion-50/70 border border-onion-200 text-xs text-onion-950 flex items-start gap-2.5">
        <TrendingUp className="w-5 h-5 text-onion-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Historical Seasonal Pattern:</span> Prices in August-September traditionally see an upward trend of 8-12% due to festive demand in urban APMC mandis.
        </div>
      </div>

      {/* Decision-Support Disclaimer (Requirement #16) */}
      <div className="p-3 rounded-xl bg-slate-100 text-[11px] text-slate-500 flex items-start gap-2">
        <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Decision-Support Notice:</strong> {t.disclaimer}
        </p>
      </div>

    </div>
  );
}
