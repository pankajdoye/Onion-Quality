import React from 'react';
import { AlertTriangle, Biohazard, Sprout, Minimize2, AlertCircle } from 'lucide-react';

export default function DefectCards({ defects, totalOnions = 200 }) {
  const defectItems = [
    {
      key: 'damaged',
      title: 'Damaged',
      icon: AlertTriangle,
      percentage: defects?.damaged || 12,
      count: Math.round(((defects?.damaged || 12) / 100) * totalOnions),
      severity: (defects?.damaged || 12) > 15 ? 'High' : (defects?.damaged || 12) > 8 ? 'Medium' : 'Low',
      color: 'amber',
      bg: 'bg-amber-50/70',
      border: 'border-amber-200',
      text: 'text-amber-900',
      badge: 'bg-amber-100 text-amber-800'
    },
    {
      key: 'rotten',
      title: 'Rotten',
      icon: Biohazard,
      percentage: defects?.rotten || 5,
      count: Math.round(((defects?.rotten || 5) / 100) * totalOnions),
      severity: (defects?.rotten || 5) > 5 ? 'High' : (defects?.rotten || 5) > 2 ? 'Medium' : 'Low',
      color: 'rose',
      bg: 'bg-rose-50/70',
      border: 'border-rose-200',
      text: 'text-rose-900',
      badge: 'bg-rose-100 text-rose-800'
    },
    {
      key: 'sprouted',
      title: 'Sprouted',
      icon: Sprout,
      percentage: defects?.sprouted || 3,
      count: Math.round(((defects?.sprouted || 3) / 100) * totalOnions),
      severity: (defects?.sprouted || 3) > 10 ? 'High' : (defects?.sprouted || 3) > 5 ? 'Medium' : 'Low',
      color: 'purple',
      bg: 'bg-purple-50/70',
      border: 'border-purple-200',
      text: 'text-purple-900',
      badge: 'bg-purple-100 text-purple-800'
    },
    {
      key: 'undersized',
      title: 'Undersized',
      icon: Minimize2,
      percentage: defects?.undersized || 8,
      count: Math.round(((defects?.undersized || 8) / 100) * totalOnions),
      severity: (defects?.undersized || 8) > 12 ? 'High' : (defects?.undersized || 8) > 6 ? 'Medium' : 'Low',
      color: 'blue',
      bg: 'bg-blue-50/70',
      border: 'border-blue-200',
      text: 'text-blue-900',
      badge: 'bg-blue-100 text-blue-800'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
      
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500" />
          Detected Defects Breakdown
        </h3>
        <span className="text-xs text-slate-500 font-semibold">4 Defect Categories</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {defectItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.key}
              className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${item.bg} ${item.border}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg bg-white shadow-sm border border-slate-200/80`}>
                    <Icon className="w-5 h-5 text-slate-800" />
                  </div>
                  <span className={`text-sm font-bold ${item.text}`}>{item.title}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.badge}`}>
                  {item.severity} severity
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-3">
                <span className="text-3xl font-extrabold text-slate-900">{item.percentage}%</span>
                <span className="text-xs font-semibold text-slate-600">{item.count} onions</span>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Tolerance Limit</span>
                <span className="font-semibold text-slate-700">
                  {item.key === 'rotten' ? 'Max 5%' : item.key === 'damaged' ? 'Max 15%' : 'Max 10%'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
