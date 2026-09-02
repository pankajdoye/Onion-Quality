import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, CheckCircle2 } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function LastYearVsThisYear({ lang = 'en' }) {
  const t = SMART_I18N[lang] || SMART_I18N.en;

  const data = [
    { month: 'Jan', year2025: 2100, year2026: 2200 },
    { month: 'Feb', year2025: 2250, year2026: 2350 },
    { month: 'Mar', year2025: 2400, year2026: 2500 },
    { month: 'Apr', year2025: 2550, year2026: 2650 },
    { month: 'May', year2025: 2700, year2026: 2800 },
    { month: 'Jun', year2025: 2850, year2026: 2950 },
    { month: 'Jul', year2025: 2750, year2026: 2850 },
    { month: 'Aug', year2025: 2600, year2026: 2700 }
  ];

  const labels = {
    mr: {
      title: "मागील वर्ष विरुद्ध यंदाचे वर्ष (भाव तुलना)",
      badge: "२०२५ विरुद्ध २०२६ तुलना",
      insight: "“चालू वर्षामध्ये (२०२६) कांद्याचे भाव मागील वर्षाच्या (२०२५) तुलनेत प्रति क्विंटल ₹१००–₹१५० ने जास्त आहेत.”",
      thisYear: "यंदाचे वर्ष (२०२६)",
      lastYear: "मागील वर्ष (२०२५)"
    },
    hi: {
      title: "पिछले वर्ष बनाम चालू वर्ष (भाव तुलना)",
      badge: "2025 बनाम 2026 तुलना",
      insight: "“चालू वर्ष (2026) में प्याज की कीमतें पिछले वर्ष (2025) की तुलना में ₹100–₹150 प्रति क्विंटल अधिक हैं।”",
      thisYear: "चालू वर्ष (2026)",
      lastYear: "पिछला वर्ष (2025)"
    },
    en: {
      title: "Last Year vs This Year Rates",
      badge: "2025 vs 2026 Comparison",
      insight: "“Prices this year (2026) are currently higher than last year (2025) by ₹100–₹150 per quintal.”",
      thisYear: "This Year (2026)",
      lastYear: "Last Year (2025)"
    }
  };

  const l = labels[lang] || labels.en;

  return (
    <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-6 shadow-md space-y-4 transition-colors">
      
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#374151] pb-3">
        <h3 className="text-sm font-black text-[#263238] dark:text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#66BB6A]" />
          📊 {l.title}
        </h3>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          {l.badge}
        </span>
      </div>

      {/* Simple Farmer Message */}
      <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-extrabold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-[#66BB6A] flex-shrink-0" />
        <span>{l.insight}</span>
      </div>

      {/* Line Chart */}
      <div className="h-52 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 600, fill: '#607D8B' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#607D8B' }} axisLine={false} tickLine={false} domain={[1800, 3200]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2933', borderColor: '#374151', color: '#F5F7FA', borderRadius: '12px' }}
              formatter={(val) => [`₹${val}/quintal`]} 
            />
            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 700 }} />
            <Line type="monotone" name={l.thisYear} dataKey="year2026" stroke="#66BB6A" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" name={l.lastYear} dataKey="year2025" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
