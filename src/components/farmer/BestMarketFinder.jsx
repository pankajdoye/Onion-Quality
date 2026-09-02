import React, { useState } from 'react';
import { MapPin, Navigation, Truck, Award, CheckCircle2 } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function BestMarketFinder({ lang = 'mr' }) {
  const t = SMART_I18N[lang] || SMART_I18N.mr;
  const [quantity, setQuantity] = useState(20);

  const markets = [
    {
      name: 'Lasalgaon APMC (Nashik)',
      pricePerQtnl: 2650,
      transportPerQtnl: 150,
      distance: '45 km',
      isBestOverall: false
    },
    {
      name: 'Nashik Main APMC Yard',
      pricePerQtnl: 2610,
      transportPerQtnl: 60,
      distance: '25 km',
      isBestOverall: true // Higher net after transport!
    },
    {
      name: 'Pune Gultekdi APMC',
      pricePerQtnl: 2580,
      transportPerQtnl: 250,
      distance: '180 km',
      isBestOverall: false
    },
    {
      name: 'Sangli APMC Market',
      pricePerQtnl: 2520,
      transportPerQtnl: 280,
      distance: '240 km',
      isBestOverall: false
    }
  ];

  return (
    <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-6 shadow-md space-y-5 transition-colors">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-[#374151] pb-3">
        <div>
          <h3 className="text-sm font-black text-[#263238] dark:text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#66BB6A]" />
            📍 {t.bestMarketTitle || "Best Market Net Return"}
          </h3>
          <p className="text-xs text-[#607D8B] dark:text-[#B8C2CC] font-medium">Includes transport cost calculation to find true net earnings</p>
        </div>
      </div>

      {/* Recommended Best Option Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-xl">
            ⭐
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-100 block">{t.bestOptionForYou || "Best Return Option"}</span>
            <h4 className="text-lg font-black text-white">Nashik Main APMC Yard (₹2,550 Net / Qtnl)</h4>
          </div>
        </div>
        <span className="hidden sm:inline-block px-3 py-1 bg-white text-emerald-800 text-xs font-black rounded-full shadow">
          Lowest Transport Cost
        </span>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#F7F8FA] dark:bg-[#202A35] text-[#607D8B] dark:text-[#B8C2CC] font-bold uppercase text-[10px] border-b border-slate-200 dark:border-[#374151]">
            <tr>
              <th className="py-3 px-3">Market</th>
              <th className="py-3 px-3">Mandi Rate</th>
              <th className="py-3 px-3">Transport / Qtnl</th>
              <th className="py-3 px-3">Net Earnings</th>
              <th className="py-3 px-3 text-right">Recommendation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-[#374151]">
            {markets.map((m, idx) => {
              const netPerQtnl = m.pricePerQtnl - m.transportPerQtnl;
              return (
                <tr key={idx} className={`hover:bg-slate-50 dark:hover:bg-[#202A35]/60 transition-colors ${m.isBestOverall ? 'bg-emerald-50/50 dark:bg-emerald-950/30 font-bold' : ''}`}>
                  <td className="py-3 px-3 text-[#263238] dark:text-[#F5F7FA] flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-[#66BB6A]" />
                    {m.name} ({m.distance})
                  </td>
                  <td className="py-3 px-3 font-extrabold text-[#263238] dark:text-[#F5F7FA]">₹{m.pricePerQtnl.toLocaleString()}</td>
                  <td className="py-3 px-3 font-semibold text-[#EF5350]">- ₹{m.transportPerQtnl}</td>
                  <td className="py-3 px-3 font-black text-emerald-700 dark:text-[#66BB6A] text-sm">₹{netPerQtnl.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right">
                    {m.isBestOverall ? (
                      <span className="px-2.5 py-1 rounded-full font-black text-[11px] bg-[#66BB6A] text-white shadow">
                        ⭐ Best Option
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full font-semibold text-[11px] bg-slate-100 dark:bg-[#202A35] text-[#607D8B] dark:text-[#B8C2CC] border border-slate-200 dark:border-[#374151]">
                        Average Option
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
