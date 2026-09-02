import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { TrendingUp, Calendar, MapPin, Filter, ShieldCheck } from 'lucide-react';
import { AGRI_CENTERS } from '../data/sampleData';

export default function MarketTrendsPage() {
  const [selectedMarket, setSelectedMarket] = useState('Lasalgaon APMC (Nashik)');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [trendRange, setTrendRange] = useState('1year');

  const data2026 = [
    { month: 'Jan', gradeA: 2200, gradeB: 1900, urs: 1350 },
    { month: 'Feb', gradeA: 2350, gradeB: 2000, urs: 1420 },
    { month: 'Mar', gradeA: 2500, gradeB: 2150, urs: 1500 },
    { month: 'Apr', gradeA: 2650, gradeB: 2280, urs: 1600 },
    { month: 'May', gradeA: 2800, gradeB: 2400, urs: 1720 },
    { month: 'Jun', gradeA: 2950, gradeB: 2520, urs: 1800 },
    { month: 'Jul', gradeA: 2850, gradeB: 2450, urs: 1750 },
    { month: 'Aug', gradeA: 2700, gradeB: 2350, urs: 1700 },
  ];

  const dataMultiYear = [
    { year: '2022', gradeA: 2100, modal: 1850 },
    { year: '2023', gradeA: 2350, modal: 2050 },
    { year: '2024', gradeA: 2600, modal: 2280 },
    { year: '2025', gradeA: 2900, modal: 2550 },
    { year: '2026', gradeA: 2700, modal: 2450 },
  ];

  const chartData = trendRange === '5year' ? dataMultiYear : data2026;
  const xKey = trendRange === '5year' ? 'year' : 'month';

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-onion-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-emerald-400" />
            Historical APMC Market Price Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Analyze historical onion mandi rates (2022–2026) across Maharashtra APMCs to identify high-profit selling windows.
          </p>
        </div>

        <span className="text-xs font-mono bg-slate-800 text-emerald-400 px-3 py-1.5 rounded-xl border border-slate-700 font-bold flex items-center gap-1">
          <ShieldCheck className="w-4 h-4" />
          Source: AGMARKNET MSAMB Feed
        </span>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Filter className="w-4 h-4 text-onion-600" />
            Interactive Historical Filters
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Select Market */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Select Mandi Market</label>
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:border-onion-600"
            >
              {AGRI_CENTERS.map((c, idx) => (
                <option key={idx} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Select Year */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Select Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:border-onion-600"
            >
              <option value="2026">2026 (Current Year)</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          {/* Time Trend Comparison Range */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Trend Range</label>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setTrendRange('1year')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  trendRange === '1year' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1-Year Monthly
              </button>
              <button
                onClick={() => setTrendRange('5year')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  trendRange === '5year' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                5-Year Trend
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Recharts Historical Area Graph */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Price Trajectory — {selectedMarket} ({trendRange === '5year' ? '2022–2026' : selectedYear})
            </h3>
            <p className="text-xs text-slate-500">Rate per quintal (₹) across Grade A, Grade B, and URS quality tiers</p>
          </div>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="ursG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey={xKey} tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit="₹" domain={[1000, 3500]} />
              <Tooltip formatter={(val) => [`₹${val} / quintal`]} contentStyle={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 700 }} />
              <Area type="monotone" name="Grade A (Export Rate)" dataKey="gradeA" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#gA)" />
              {trendRange !== '5year' && (
                <>
                  <Area type="monotone" name="Grade B (Standard Rate)" dataKey="gradeB" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#gB)" />
                  <Area type="monotone" name="URS (Reject Rate)" dataKey="urs" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#ursG)" />
                </>
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
