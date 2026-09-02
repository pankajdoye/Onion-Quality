import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';

export default function GradeDonutChart() {
  const data = [
    { name: 'Grade A (Export)', value: 68.4, color: '#10b981' },
    { name: 'Grade B (Standard)', value: 20.4, color: '#f59e0b' },
    { name: 'URS (Reject)', value: 11.2, color: '#ef4444' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <PieIcon className="w-4 h-4 text-onion-600" />
          Overall Grade Distribution
        </h3>
        <span className="text-[11px] text-slate-400 font-semibold">Cumulative Batches</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip formatter={(val) => [`${val}%`, 'Yield Share']} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
