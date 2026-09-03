import React, { useState } from 'react';
import { Award, CheckCircle2, ChevronDown, ChevronUp, Sparkles, MapPin, TrendingUp, Layers, AlertCircle } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';
import DetailedBreakdownModal from './DetailedBreakdownModal';
import VoiceButton from './VoiceButton';

export default function TopResultCard({ resultData, lang = 'en' }) {
  const [showDetails, setShowDetails] = useState(false);
  const t = SMART_I18N[lang] || SMART_I18N.en;

  const data = resultData || {
    quality_score: 87,
    overall_quality: 'GOOD',
    total_onions: 1,
    detected_onions_count: 1,
    grade_a: 100,
    urs: 0,
    grade_a_count: 1,
    urs_count: 0,
    expected_price: '₹2,600 / quintal',
    best_market: 'Lasalgaon APMC',
    selling_advice: 'Recommended to Sell'
  };

  const totalCount = data.detected_onions_count || data.total_onions || (data.grade_a_count + data.urs_count) || 1;
  const gradeACount = data.grade_a_count !== undefined ? data.grade_a_count : Math.round((data.grade_a / 100) * totalCount);
  const ursCount = data.urs_count !== undefined ? data.urs_count : Math.round((data.urs / 100) * totalCount);
  const overallQuality = data.overall_quality || (data.grade_a >= 65 ? 'GOOD' : data.urs >= 40 ? 'POOR' : 'AVERAGE');

  const labels = {
    mr: {
      resultBadge: "तपासणी सारांश",
      totalOnions: "एकूण कांदे",
      gradeALabel: "ग्रेड A",
      ursLabel: "URS (कमी प्रत)",
      overallQualityLabel: "एकूण गुणवत्ता",
      good: "🟢 चांगला दर्जा (GOOD)",
      average: "🟡 मध्यम दर्जा (AVERAGE)",
      poor: "🔴 निकृष्ट प्रत (POOR)",
      score: "गुण",
      apmcEstimate: "अधिकृत APMC भाव",
      highestReturn: "सर्वोत्तम बाजार समिती",
      recommendation: "सल्ला व शिफारस",
      recommendedToSell: "🟢 विक्रीस योग्य वेळ",
      viewDetails: "तांत्रिक विश्लेषण तपशील पहा ▼",
      hideDetails: "तांत्रिक विश्लेषण तपशील लपवा ▲"
    },
    hi: {
      resultBadge: "जांच सारांश",
      totalOnions: "कुल प्याज",
      gradeALabel: "ग्रेड A",
      ursLabel: "URS (कम गुणवत्ता)",
      overallQualityLabel: "कुल गुणवत्ता",
      good: "🟢 अच्छी गुणवत्ता (GOOD)",
      average: "🟡 औसत गुणवत्ता (AVERAGE)",
      poor: "🔴 खराब गुणवत्ता (POOR)",
      score: "स्कोर",
      apmcEstimate: "आधिकारिक मंडी भाव",
      highestReturn: "सर्वोत्तम मंडी",
      recommendation: "सलाह एवं सिफारिश",
      recommendedToSell: "🟢 बिक्री हेतु उपयुक्त समय",
      viewDetails: "तकनीकी विश्लेषण विवरण देखें ▼",
      hideDetails: "तकनीकी विश्लेषण विवरण छिपाएं ▲"
    },
    en: {
      resultBadge: "Batch Summary",
      totalOnions: "Total Onions",
      gradeALabel: "Grade A",
      ursLabel: "URS",
      overallQualityLabel: "Overall Quality",
      good: "🟢 GOOD QUALITY",
      average: "🟡 AVERAGE QUALITY",
      poor: "🔴 POOR QUALITY",
      score: "Score",
      apmcEstimate: "Official APMC Rate",
      highestReturn: "Target Mandi",
      recommendation: "Recommendation",
      recommendedToSell: "🟢 Recommended to Sell",
      viewDetails: "View Analysis Details ▼",
      hideDetails: "Hide Analysis Details ▲"
    }
  };

  const l = labels[lang] || labels.en;

  const qualityBadge = overallQuality === 'GOOD'
    ? { text: l.good, color: 'text-emerald-700 dark:text-[#66BB6A] bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800' }
    : overallQuality === 'POOR'
    ? { text: l.poor, color: 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800' }
    : { text: l.average, color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800' };

  const textToVoice = lang === 'mr'
    ? `तपासलेले एकूण कांदे ${totalCount}. एकूण गुणवत्ता ${overallQuality}. ग्रेड ए ${data.grade_a} टक्के आहे. अंदाजे बाजारभाव ${data.expected_price || 'उपलब्ध नाही'}.`
    : lang === 'hi'
    ? `जांचे गए कुल प्याज ${totalCount}। कुल गुणवत्ता ${overallQuality}। ग्रेड ए ${data.grade_a} प्रतिशत है। अनुमानित मंडी भाव ${data.expected_price || 'उपलब्ध नहीं'}।`
    : `Total onions analyzed: ${totalCount}. Overall quality is ${overallQuality}. Grade A is ${data.grade_a} percent. Expected market rate is ${data.expected_price || 'unavailable'}.`;

  return (
    <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-5 sm:p-6 shadow-sm space-y-6 transition-colors">
      
      {/* Top Banner Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-[#374151] pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-[#66BB6A] bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
            {l.resultBadge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#263238] dark:text-[#F5F7FA] mt-2 flex items-center gap-2">
            <span>{qualityBadge.text}</span>
          </h2>
        </div>

        <VoiceButton textToSpeak={textToVoice} lang={lang} />
      </div>

      {/* Main KPI Tiles (Total Onions, Grade A, URS, Overall Quality) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        
        {/* Total Onions */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#202A35] border border-slate-200 dark:border-[#374151] text-center">
          <span className="text-[11px] font-bold text-[#607D8B] dark:text-[#B8C2CC] uppercase block">{l.totalOnions}</span>
          <div className="text-3xl font-black text-[#263238] dark:text-[#F5F7FA] mt-1">{totalCount}</div>
          <span className="text-[11px] font-semibold text-[#607D8B] dark:text-[#B8C2CC] block mt-0.5">🧅 {totalCount === 1 ? 'Single Bulb' : 'Multi-Bulb Batch'}</span>
        </div>

        {/* Grade A */}
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase block">{l.gradeALabel}</span>
          <div className="text-3xl font-black text-emerald-700 dark:text-[#66BB6A] mt-1">{data.grade_a}%</div>
          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 block mt-0.5">{gradeACount} / {totalCount}</span>
        </div>

        {/* URS */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center">
          <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase block">{l.ursLabel}</span>
          <div className="text-3xl font-black text-amber-700 dark:text-amber-400 mt-1">{data.urs}%</div>
          <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 block mt-0.5">{ursCount} / {totalCount}</span>
        </div>

        {/* Overall Quality Score */}
        <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-center">
          <span className="text-[11px] font-bold text-purple-900 dark:text-purple-300 uppercase block">{l.score}</span>
          <div className="text-3xl font-black text-purple-800 dark:text-purple-300 mt-1">{data.quality_score}/100</div>
          <span className="text-[11px] font-bold text-purple-700 dark:text-purple-400 block mt-0.5">{overallQuality}</span>
        </div>

      </div>

      {/* Market Estimates Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        
        {/* Estimated Price */}
        <div className="p-4 rounded-2xl bg-[#F7F8FA] dark:bg-[#202A35] border border-slate-200 dark:border-[#374151] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#607D8B] dark:text-[#B8C2CC] uppercase block">{l.apmcEstimate}</span>
            <div className="text-xl font-black text-purple-800 dark:text-purple-300 mt-0.5">{data.expected_price || '₹2,600 / quintal'}</div>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-[#607D8B] dark:text-[#B8C2CC] block flex items-center justify-end gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              {data.best_market || 'Lasalgaon APMC'}
            </span>
          </div>
        </div>

        {/* Recommendation */}
        <div className="p-4 rounded-2xl bg-[#F7F8FA] dark:bg-[#202A35] border border-slate-200 dark:border-[#374151] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#607D8B] dark:text-[#B8C2CC] uppercase block">{l.recommendation}</span>
            <div className="text-sm font-black text-blue-800 dark:text-blue-300 mt-0.5 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              {data.selling_advice || l.recommendedToSell}
            </div>
          </div>
          {data.vision_ai_status && (
            <span className="text-[10px] font-mono text-[#607D8B] dark:text-[#B8C2CC] max-w-[40%] text-right truncate">
              {data.vision_ai_status}
            </span>
          )}
        </div>

      </div>

      {/* "View Analysis Details" Collapsible Toggle */}
      <div className="pt-2 text-center">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-100 dark:bg-[#202A35] hover:bg-slate-200 dark:hover:bg-[#263238] text-[#263238] dark:text-[#F5F7FA] font-extrabold text-xs transition-all shadow-sm border border-slate-200 dark:border-[#374151]"
        >
          <span>{showDetails ? l.hideDetails : l.viewDetails}</span>
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
