import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { Maximize2, Scale, Ruler } from 'lucide-react';

export default function SizeDistributionChart({ avgDiameter = 68, avgWeight = 82 }) {
  const data = [
    { category: 'Small (<50mm)', percentage: 15, color: '#3b82f6' },
    { category: 'Medium (50-75mm)', percentage: 55, color: '#10b981' },
    { category: 'Large (>75mm)', percentage: 30, color: '#8b5cf6' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Maximize2 className="w-4 h-4 text-onion-600" />
          Onion Size Distribution Analysis
        </h3>
        <span className="text-xs text-slate-500 font-semibold">AGMARK Caliper Standards</span>
      </div>

      {/* Key Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Average Diameter */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-onion-50 to-purple-50 border border-onion-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-onion-600 text-white flex items-center justify-center shadow-md">
            <Ruler className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Bulb Diameter</span>
            <div className="text-2xl font-extrabold text-slate-900 flex items-baseline gap-1">
              <span>{avgDiameter}</span>
              <span className="text-sm font-bold text-onion-700">mm</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Standard Grade Range: 60-75 mm</p>
          </div>
        </div>

        {/* Estimated Weight */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Bulb Weight</span>
            <div className="text-2xl font-extrabold text-slate-900 flex items-baseline gap-1">
              <span>{avgWeight}</span>
              <span className="text-sm font-bold text-emerald-700">grams</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Derived from volumetric contour AI</p>
          </div>
        </div>

      </div>

      {/* Recharts Bar Chart */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-700">Bulb Caliper Category Breakdown (%):</span>
        <div className="h-52 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="category" tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit="%" />
              <RechartsTooltip
                formatter={(val) => [`${val}%`, 'Distribution']}
                contentStyle={{ borderRadius: '12px', borderColor: '#e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              />
              <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
