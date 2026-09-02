import React from 'react';
import { Building2, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function ProcurementSummary({
  totalOnions = 200,
  gradeA = 72,
  gradeB = 18,
  urs = 10,
  recommendation = 'Sample meets recommended Grade A procurement threshold.'
}) {
  const countA = Math.round((gradeA / 100) * totalOnions);
  const countB = Math.round((gradeB / 100) * totalOnions);
  const countURS = totalOnions - countA - countB;

  const isApproved = gradeA >= 65 && urs <= 15;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Building2 className="w-4 h-4 text-onion-600" />
          Procurement Summary & Center Threshold
        </h3>
        <span className="text-xs font-semibold text-slate-500">APMC Mandi Evaluation</span>
      </div>

      {/* Grid of Key Numbers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Analyzed</span>
          <span className="text-2xl font-extrabold text-slate-900">{totalOnions}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Bulbs</span>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Grade A</span>
          <span className="text-2xl font-extrabold text-emerald-700">{countA}</span>
          <span className="text-[10px] text-emerald-600 block mt-0.5">Bulbs</span>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Grade B</span>
          <span className="text-2xl font-extrabold text-amber-700">{countB}</span>
          <span className="text-[10px] text-amber-600 block mt-0.5">Bulbs</span>
        </div>

        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-center">
          <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block">URS</span>
          <span className="text-2xl font-extrabold text-rose-700">{countURS}</span>
          <span className="text-[10px] text-rose-600 block mt-0.5">Bulbs</span>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-100/70 border border-emerald-300 text-center">
          <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider block">Estimated Grade A</span>
          <span className="text-2xl font-extrabold text-emerald-800">{gradeA}%</span>
          <span className="text-[10px] text-emerald-700 block mt-0.5">Export Quality</span>
        </div>

        <div className="p-3.5 rounded-xl bg-rose-100/70 border border-rose-300 text-center">
          <span className="text-[10px] font-bold text-rose-900 uppercase tracking-wider block">Estimated URS</span>
          <span className="text-2xl font-extrabold text-rose-800">{urs}%</span>
          <span className="text-[10px] text-rose-700 block mt-0.5">Reject / Standard</span>
        </div>

      </div>

      {/* Clear Threshold Statement Box */}
      <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm ${
        isApproved
          ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300 text-emerald-950'
          : 'bg-gradient-to-r from-rose-50 to-amber-50 border-rose-300 text-rose-950'
      }`}>
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-xl text-white shadow-md ${isApproved ? 'bg-emerald-600' : 'bg-rose-600'}`}>
            {isApproved ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                isApproved ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
              }`}>
                {isApproved ? 'Threshold Met: PASS' : 'Threshold Alert: REJECT / RE-SORT'}
              </span>
              <span className="text-xs font-semibold text-slate-500">APMC Rule #402</span>
            </div>
            <h4 className="text-base font-extrabold mt-1">
              “{recommendation}”
            </h4>
            <p className="text-xs opacity-80 mt-0.5">
              {isApproved
                ? 'Batch is certified for premium procurement pricing and fast-track clearance.'
                : 'High defect concentration detected. Manual re-sorting or price adjustment required.'}
            </p>
          </div>
        </div>

        <div className="flex-shrink-0">
          <button className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs shadow transition-all ${
            isApproved
              ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
              : 'bg-rose-700 hover:bg-rose-800 text-white'
          }`}>
            <span>Procurement Action</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
