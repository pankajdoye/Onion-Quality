import React from 'react';
import { Layers, Award, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';

export default function KpiCards() {
  const kpis = [
    {
      title: 'Total Samples Analyzed',
      value: '1,420',
      change: '+14% this week',
      isPositive: true,
      icon: Layers,
      color: 'onion',
      bg: 'bg-onion-50',
      border: 'border-onion-200',
      text: 'text-onion-950',
      accent: 'text-onion-600'
    },
    {
      title: 'Average Quality Score',
      value: '84.6 / 100',
      change: '+2.4 pts vs avg',
      isPositive: true,
      icon: Award,
      color: 'emerald',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-950',
      accent: 'text-emerald-600'
    },
    {
      title: 'Grade A Average',
      value: '68.4%',
      change: '+5.1% yield',
      isPositive: true,
      icon: Sparkles,
      color: 'purple',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-950',
      accent: 'text-purple-600'
    },
    {
      title: 'URS (Reject) Average',
      value: '11.2%',
      change: '-1.8% rejection drop',
      isPositive: true,
      icon: ShieldAlert,
      color: 'rose',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-950',
      accent: 'text-rose-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className={`p-5 rounded-2xl border ${kpi.bg} ${kpi.border} shadow-sm transition-all hover:shadow-md flex flex-col justify-between space-y-3`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{kpi.title}</span>
              <div className={`p-2 rounded-xl bg-white shadow-sm border border-slate-200/60`}>
                <Icon className={`w-5 h-5 ${kpi.accent}`} />
              </div>
            </div>

            <div>
              <div className={`text-3xl font-extrabold tracking-tight ${kpi.text}`}>
                {kpi.value}
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{kpi.change}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
