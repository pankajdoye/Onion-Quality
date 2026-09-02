import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';
import Tooltip from '../common/Tooltip';

export default function QualityScoreGauge({ score = 87, confidence = 94 }) {
  // Calculate gauge circle stroke offset
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getGaugeColor = (val) => {
    if (val >= 85) return 'stroke-emerald-500 text-emerald-600';
    if (val >= 70) return 'stroke-amber-500 text-amber-600';
    return 'stroke-rose-500 text-rose-600';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col items-center text-center justify-between">
      
      <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-onion-600" />
          Overall Quality Score
        </span>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
          AI Evaluated
        </span>
      </div>

      {/* SVG Circular Progress Gauge */}
      <div className="relative w-40 h-40 flex items-center justify-center my-2">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            className="stroke-slate-100"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Animated progress circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            className={`transition-all duration-1000 ease-out ${getGaugeColor(score)}`}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Inner Score Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {score}
          </span>
          <span className="text-xs font-bold text-slate-400">/ 100</span>
        </div>
      </div>

      {/* Quality Badge */}
      <div className="mt-2 text-xs font-extrabold text-slate-800">
        {score >= 85 ? (
          <span className="text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            🌟 Grade A (Export Quality)
          </span>
        ) : score >= 70 ? (
          <span className="text-amber-700 font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            ⚡ Grade B (Commercial Quality)
          </span>
        ) : (
          <span className="text-rose-700 font-bold bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            ⚠️ URS / Reject Grade
          </span>
        )}
      </div>

      {/* AI Confidence Indicator (Requirement #19) */}
      <div className="w-full mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-slate-600 font-semibold">
          <ShieldCheck className="w-4 h-4 text-onion-600" />
          <span>AI Model Confidence:</span>
          <Tooltip text="Confidence represents the model's estimated certainty in the detected quality classification based on YOLOv11 multi-spectral inference." />
        </div>
        <span className="font-extrabold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
          {confidence}%
        </span>
      </div>

    </div>
  );
}
