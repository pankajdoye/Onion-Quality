import React from 'react';
import { Layers } from 'lucide-react';

export default function GradeDistribution({ gradeA = 72, gradeB = 18, urs = 10, totalCount = 200 }) {
  const countA = Math.round((gradeA / 100) * totalCount);
  const countB = Math.round((gradeB / 100) * totalCount);
  const countURS = totalCount - countA - countB;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
      
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-onion-600" />
          Grade Distribution
        </h3>
        <span className="text-xs text-slate-500 font-semibold">Total Analyzed: {totalCount} onions</span>
      </div>

      {/* Grade Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        {/* Grade A Card */}
        <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
              🟢 Grade A
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
              Premium
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-emerald-700">{gradeA}%</span>
            <span className="text-xs font-semibold text-emerald-800">{countA} onions</span>
          </div>
          <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${gradeA}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-emerald-800 font-medium">Export standard (&gt;60mm, zero rot)</p>
        </div>

        {/* Grade B Card */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
              🟡 Grade B
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
              Standard
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-amber-700">{gradeB}%</span>
            <span className="text-xs font-semibold text-amber-800">{countB} onions</span>
          </div>
          <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${gradeB}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-amber-800 font-medium">Domestic mandi market (45-60mm)</p>
        </div>

        {/* URS Card */}
        <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-rose-900 flex items-center gap-1.5">
              🔴 URS
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-200 text-rose-900">
              Reject / Standard
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-rose-700">{urs}%</span>
            <span className="text-xs font-semibold text-rose-800">{countURS} onions</span>
          </div>
          <div className="w-full bg-rose-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-rose-600 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${urs}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-rose-800 font-medium">Un-graded / Reject / Processing level</p>
        </div>

      </div>

      {/* Combined Multi-bar Stack */}
      <div className="space-y-1.5 pt-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
          <span>Overall Batch Composition Breakdown</span>
          <span>100% Total</span>
        </div>
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
          <div style={{ width: `${gradeA}%` }} className="bg-emerald-500 h-full transition-all duration-1000" title={`Grade A: ${gradeA}%`}></div>
          <div style={{ width: `${gradeB}%` }} className="bg-amber-400 h-full transition-all duration-1000" title={`Grade B: ${gradeB}%`}></div>
          <div style={{ width: `${urs}%` }} className="bg-rose-500 h-full transition-all duration-1000" title={`URS: ${urs}%`}></div>
        </div>
      </div>

    </div>
  );
}
