import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function WhenToSellCard({ lang = 'en' }) {
  const t = SMART_I18N[lang] || SMART_I18N.en;
  const [timeRange, setTimeRange] = useState('1year');

  const data1M = [
    { label: 'W1', price: 2350 },
    { label: 'W2', price: 2420 },
    { label: 'W3', price: 2500 },
    { label: 'W4', price: 2550 }
  ];

  const data1Y = [
    { label: 'Jan', price: 2200 },
    { label: 'Mar', price: 2500 },
    { label: 'May', price: 2800 },
    { label: 'Jul', price: 2850 },
    { label: 'Aug', price: 2700 }
  ];

  const data5Y = [
    { label: '2022', price: 2100 },
    { label: '2023', price: 2350 },
    { label: '2024', labelFull: '2024', price: 2600 },
    { label: '2025', price: 2900 },
    { label: '2026', price: 2700 }
  ];

  const chartData = timeRange === '1month' ? data1M : timeRange === '5year' ? data5Y : data1Y;

  const labels = {
    mr: {
      title: "कांदा कधी विकावा (सल्ला)",
      sub: "भविष्यकालीन भाव कल आणि विक्री निर्णय समर्थन",
      score: "विक्री संधी गुण",
      verdictTag: "AI विक्री सल्ला",
      verdictTitle: "🟢 कांदा विकण्यासाठी अनुकूल वेळ",
      verdictDesc: "सध्या बाजार समित्यांमध्ये चांगला भाव मिळत असून सणासुदीच्या मागणीमुळे भाव टिकून आहेत.",
      currentPrice: "सध्याचा भाव",
      expectedTarget: "अपेक्षित टप्पा",
      priceTrend: "भावाचा कल",
      rising: "↗ वाढता कल",
      historicalGraph: "ऐतिहासिक भाव आलेख:",
      m1: "१ महिना",
      y1: "१ वर्ष",
      y5: "५ वर्षे",
      notice: "टीप:",
      noticeDesc: "भविष्यकालीन भाव आवक, मागणी आणि हवामानानुसार बदलू शकतात."
    },
    hi: {
      title: "प्याज कब बेचें (सलाह)",
      sub: "मूल्य रुझान और बिक्री निर्णय समर्थन",
      score: "बिक्री स्कोर",
      verdictTag: "AI बिक्री निर्णय",
      verdictTitle: "🟢 प्याज बेचने के लिए अनुकूल समय",
      verdictDesc: "मंडियों में वर्तमान भाव मजबूत हैं और त्योहारी मांग के कारण कीमतें स्थिर हैं।",
      currentPrice: "वर्तमान भाव",
      expectedTarget: "अपेक्षित लक्ष्य",
      priceTrend: "भाव का रुझान",
      rising: "↗ बढ़ता हुआ",
      historicalGraph: "ऐतिहासिक मूल्य ग्राफ:",
      m1: "1 महीना",
      y1: "1 वर्ष",
      y5: "5 वर्ष",
      notice: "सूचना:",
      noticeDesc: "भविष्य की कीमतें आवक, मांग और मौसम की स्थिति के अनुसार बदल सकती हैं।"
    },
    en: {
      title: "When to Sell Decision Support",
      sub: "Predictive price trend & selling score",
      score: "Selling Score",
      verdictTag: "AI Selling Verdict",
      verdictTitle: "🟢 Favorable Time to Sell",
      verdictDesc: "Current market prices are high and seasonal festive demand is rising in major mandis.",
      currentPrice: "Current Price",
      expectedTarget: "Expected Target",
      priceTrend: "Price Trend",
      rising: "↗ Rising",
      historicalGraph: "Historical Price Graph:",
      m1: "1 Month",
      y1: "1 Year",
      y5: "5 Years",
      notice: "Notice:",
      noticeDesc: "Future prices are uncertain and may change because of supply, demand, weather and government policies."
    }
  };

  const l = labels[lang] || labels.en;

  return (
    <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-6 shadow-md space-y-6 transition-colors">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-[#374151] pb-3">
        <div>
          <h3 className="text-sm font-black text-[#263238] dark:text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#66BB6A]" />
            📈 {l.title}
          </h3>
          <p className="text-xs text-[#607D8B] dark:text-[#B8C2CC] font-medium">{l.sub}</p>
        </div>

        {/* Smart Selling Score Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-2 rounded-2xl">
          <div className="w-9 h-9 rounded-xl bg-[#66BB6A] text-white font-black text-xs flex items-center justify-center">
            82
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase text-emerald-900 dark:text-emerald-300 block">{l.score}</span>
            <span className="text-xs font-black text-emerald-700 dark:text-[#66BB6A]">🟢 Good</span>
          </div>
        </div>
      </div>

      {/* Main Recommendation Badge */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-center space-y-1 shadow-md">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-100 block">{l.verdictTag}</span>
        <div className="text-2xl sm:text-3xl font-black">{l.verdictTitle}</div>
        <p className="text-xs font-semibold text-emerald-100 max-w-xl mx-auto">
          {l.verdictDesc}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 rounded-xl bg-[#F7F8FA] dark:bg-[#202A35] border border-slate-200 dark:border-[#374151]">
          <span className="text-[10px] font-extrabold text-[#607D8B] dark:text-[#B8C2CC] uppercase block">{l.currentPrice}</span>
          <span className="text-xl font-black text-[#263238] dark:text-[#F5F7FA]">₹2,550</span>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
          <span className="text-[10px] font-extrabold text-emerald-900 dark:text-emerald-300 uppercase block">{l.expectedTarget}</span>
          <span className="text-xl font-black text-emerald-700 dark:text-[#66BB6A]">₹2,600–2,800</span>
        </div>

        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
          <span className="text-[10px] font-extrabold text-amber-900 dark:text-[#F59E0B] uppercase block">{l.priceTrend}</span>
          <span className="text-xl font-black text-amber-700 dark:text-[#F59E0B] flex items-center justify-center gap-1">
            <TrendingUp className="w-4 h-4" /> {l.rising}
          </span>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold text-[#263238] dark:text-[#F5F7FA] uppercase">{l.historicalGraph}</span>
        <div className="flex items-center bg-[#F7F8FA] dark:bg-[#202A35] p-1 rounded-xl border border-slate-200 dark:border-[#374151] text-xs font-bold">
          <button
            onClick={() => setTimeRange('1month')}
            className={`px-2.5 py-1 rounded-lg transition-all ${timeRange === '1month' ? 'bg-white dark:bg-[#121820] text-[#263238] dark:text-[#F5F7FA] shadow-sm font-black' : 'text-[#607D8B] dark:text-[#B8C2CC]'}`}
          >
            {l.m1}
          </button>
          <button
            onClick={() => setTimeRange('1year')}
            className={`px-2.5 py-1 rounded-lg transition-all ${timeRange === '1year' ? 'bg-white dark:bg-[#121820] text-[#263238] dark:text-[#F5F7FA] shadow-sm font-black' : 'text-[#607D8B] dark:text-[#B8C2CC]'}`}
          >
            {l.y1}
          </button>
          <button
            onClick={() => setTimeRange('5year')}
            className={`px-2.5 py-1 rounded-lg transition-all ${timeRange === '5year' ? 'bg-white dark:bg-[#121820] text-[#263238] dark:text-[#F5F7FA] shadow-sm font-black' : 'text-[#607D8B] dark:text-[#B8C2CC]'}`}
          >
            {l.y5}
          </button>
        </div>
      </div>

      {/* Graph */}
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="sellGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#66BB6A" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#66BB6A" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="label" tick={{ fontSize: 11, fontWeight: 600, fill: '#607D8B' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#607D8B' }} axisLine={false} tickLine={false} domain={[1800, 3200]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2933', borderColor: '#374151', color: '#F5F7FA', borderRadius: '12px' }}
              formatter={(val) => [`₹${val}/quintal`]} 
            />
            <Area type="monotone" dataKey="price" stroke="#66BB6A" strokeWidth={3} fillOpacity={1} fill="url(#sellGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Disclaimer */}
      <div className="p-3 rounded-xl bg-slate-100 dark:bg-[#202A35] text-[11px] text-[#607D8B] dark:text-[#B8C2CC] flex items-start gap-2 border border-slate-200 dark:border-[#374151]">
        <AlertCircle className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-[#263238] dark:text-[#F5F7FA]">{l.notice}</strong> {l.noticeDesc}
        </p>
      </div>

    </div>
  );
}
