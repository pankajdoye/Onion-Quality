import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { QUALITY_TREND_DATA } from '../../data/sampleData';

export default function QualityTrendChart() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-onion-600" />
            Quality Trend Across Batches
          </h3>
          <p className="text-xs text-slate-500">Historical quality score & Grade A % trajectory across APMC procurement batches</p>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-600">Last 9 Batches</span>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={QUALITY_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#be2b6d" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#be2b6d" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="gradeAColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="batch" tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[40, 100]} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', borderColor: '#e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              formatter={(val, name) => [
                `${val}${name === 'score' ? ' / 100' : '%'}`,
                name === 'score' ? 'Quality Score' : 'Grade A %'
              ]}
            />
            <Area type="monotone" dataKey="score" stroke="#be2b6d" strokeWidth={3} fillOpacity={1} fill="url(#scoreColor)" />
            <Area type="monotone" dataKey="gradeA" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#gradeAColor)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
