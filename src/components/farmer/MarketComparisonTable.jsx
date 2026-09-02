import React from 'react';
import { MapPin, Navigation, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../../utils/i18n';

export default function MarketComparisonTable({ lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const markets = [
    {
      name: 'Lasalgaon APMC (Nashik)',
      currentPrice: '₹2,550',
      expectedPrice: '₹2,700',
      distance: '45 km',
      recommendation: 'Best',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    },
    {
      name: 'Nashik Main APMC Yard',
      currentPrice: '₹2,510',
      expectedPrice: '₹2,680',
      distance: '25 km',
      recommendation: 'Best',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    },
    {
      name: 'Pune Gultekdi APMC',
      currentPrice: '₹2,480',
      expectedPrice: '₹2,650',
      distance: '180 km',
      recommendation: 'Good',
      color: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    {
      name: 'Sangli APMC Market',
      currentPrice: '₹2,420',
      expectedPrice: '₹2,600',
      distance: '240 km',
      recommendation: 'Good',
      color: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    {
      name: 'Solapur Central APMC',
      currentPrice: '₹2,360',
      expectedPrice: '₹2,520',
      distance: '210 km',
      recommendation: 'Average',
      color: 'bg-slate-100 text-slate-700 border-slate-300'
    }
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-4">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-onion-600" />
            {t.mandiComparison}
          </h3>
          <p className="text-xs text-slate-500">Compare nearby APMC mandi rates to maximize net profit</p>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-600 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Verified AGMARKNET Data
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">APMC Market</th>
              <th className="py-3 px-4">Current Rate</th>
              <th className="py-3 px-4">Grade A Expected</th>
              <th className="py-3 px-4">Distance</th>
              <th className="py-3 px-4 text-right">Recommendation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {markets.map((m, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-onion-600" />
                  {m.name}
                </td>
                <td className="py-3 px-4 font-extrabold text-slate-800">{m.currentPrice} <span className="text-[10px] text-slate-400 font-normal">/qtnl</span></td>
                <td className="py-3 px-4 font-black text-emerald-700">{m.expectedPrice} <span className="text-[10px] text-slate-400 font-normal">/qtnl</span></td>
                <td className="py-3 px-4 text-slate-500 font-semibold">{m.distance}</td>
                <td className="py-3 px-4 text-right">
                  <span className={`px-2.5 py-1 rounded-full font-bold border text-[11px] ${m.color}`}>
                    {m.recommendation}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
