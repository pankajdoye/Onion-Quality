import React, { useState } from 'react';
import { Award, CheckCircle2, ChevronDown, ChevronUp, Sparkles, MapPin, TrendingUp } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';
import DetailedBreakdownModal from './DetailedBreakdownModal';
import VoiceButton from './VoiceButton';

export default function TopResultCard({ resultData, lang = 'en' }) {
  const [showDetails, setShowDetails] = useState(false);
  const t = SMART_I18N[lang] || SMART_I18N.en;

  const data = resultData || {
    quality_score: 87,
    grade_a: 72,
    grade_b: 18,
    urs: 10,
    healthy: 144,
    damaged: 24,
    rotten: 10,
    sprouted: 6,
    undersized: 16,
    expected_price: '₹2,600 / quintal',
    best_market: 'Lasalgaon APMC',
    selling_advice: 'Prices are currently rising'
  };

  const textToVoice = lang === 'mr'
    ? `तुमचा तपासणी निकाल चांगला आहे. ग्रेड ए बहत्तर टक्के आहे. अंदाजे बाजारभाव २६०० रुपये प्रति क्विंटल आहे.`
    : lang === 'hi'
    ? `आपका जांच परिणाम अच्छा है। ग्रेड ए बहत्तर प्रतिशत है। अनुमानित मंडी भाव दो हजार छह सौ रुपये प्रति क्विंटल है।`
    : `Your result is Good Quality. Grade A is 72 percent. Expected price is 2,600 rupees per quintal. Best market is Lasalgaon.`;

  return (
    <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-6 shadow-sm space-y-6 transition-colors">
      
      {/* Top Banner Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-[#374151] pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-[#66BB6A] bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
            {t.yourResultTitle || "Analysis Result"}
          </span>
          <h2 className="text-3xl font-black text-[#263238] dark:text-[#F5F7FA] mt-2 flex items-center gap-2">
            <span>🟢 {t.goodQuality || "Good Quality"}</span>
          </h2>
        </div>

        <VoiceButton textToSpeak={textToVoice} lang={lang} />
      </div>

      {/* 4 Main Summary Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Grade A */}
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase block">{t.gradeA || "Grade A"}</span>
          <div className="text-4xl font-black text-emerald-700 dark:text-[#66BB6A] mt-1">{data.grade_a}%</div>
          <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 block mt-1">Score: {data.quality_score}/100</span>
        </div>

        {/* Expected Price */}
        <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-center">
          <span className="text-[11px] font-bold text-purple-900 dark:text-purple-300 uppercase block">{t.expectedPrice || "Market Price"}</span>
          <div className="text-2xl font-black text-purple-800 dark:text-purple-300 mt-2">{data.expected_price}</div>
          <span className="text-[11px] text-purple-700 dark:text-purple-400 font-semibold block mt-1">Official APMC Estimate</span>
        </div>

        {/* Best Market */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center">
          <span className="text-[11px] font-bold text-amber-900 dark:text-[#F59E0B] uppercase block">{t.bestMarket || "Target Mandi"}</span>
          <div className="text-xl font-black text-amber-800 dark:text-amber-300 mt-2 flex items-center justify-center gap-1">
            <MapPin className="w-4 h-4 text-amber-600 dark:text-[#F59E0B]" />
            {data.best_market}
          </div>
          <span className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold block mt-1">Highest Net Return</span>
        </div>

        {/* Selling Advice */}
        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center">
          <span className="text-[11px] font-bold text-blue-900 dark:text-blue-300 uppercase block">Recommendation</span>
          <div className="text-sm font-black text-blue-800 dark:text-blue-300 mt-2 flex items-center justify-center gap-1">
            <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            {data.selling_advice}
          </div>
          <span className="text-[11px] text-blue-700 dark:text-blue-400 font-semibold block mt-1">🟢 Recommended to Sell</span>
        </div>

      </div>

      {/* "See More Details" Collapsible Toggle */}
      <div className="pt-2 text-center">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-100 dark:bg-[#202A35] hover:bg-slate-200 dark:hover:bg-[#263238] text-[#263238] dark:text-[#F5F7FA] font-extrabold text-xs transition-all shadow-sm border border-slate-200 dark:border-[#374151]"
        >
          <span>{showDetails ? (t.hideDetails || "Hide Details ▲") : (t.seeMoreDetails || "See More Details ▼")}</span>
        </button>
      </div>

      {/* Collapsible Detailed Breakdown Modal */}
      {showDetails && (
        <DetailedBreakdownModal
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
          data={data}
          lang={lang}
        />
      )}

    </div>
  );
}
