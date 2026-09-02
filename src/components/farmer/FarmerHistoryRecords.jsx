import React, { useState, useEffect } from 'react';
import { History, FileText, Calendar, Filter, Image as ImageIcon } from 'lucide-react';
import { getScanHistory } from '../../services/historyService';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function FarmerHistoryRecords({ onViewRecord, lang = 'en' }) {
  const [filter, setFilter] = useState('this_week'); // 'today', 'last_3_days', 'this_week'
  const [records, setRecords] = useState([]);
  const t = SMART_I18N[lang] || SMART_I18N.en;

  useEffect(() => {
    const list = getScanHistory(filter);
    setRecords(list);
  }, [filter]);

  return (
    <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-6 shadow-sm space-y-6 transition-colors">
      
      {/* Header & Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#374151]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#66BB6A] flex items-center justify-center font-black">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-[#263238] dark:text-[#F5F7FA] leading-tight">
              {t.menuHistory || "Previous Reports / History"}
            </h3>
            <p className="text-xs text-[#607D8B] dark:text-[#B8C2CC] font-medium">
              Recent onion scan records
            </p>
          </div>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center bg-slate-100 dark:bg-[#202A35] p-1 rounded-2xl border border-slate-200 dark:border-[#374151] text-xs font-bold">
          <button
            onClick={() => setFilter('today')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filter === 'today'
                ? 'bg-[#66BB6A] text-white shadow-sm font-black'
                : 'text-[#607D8B] dark:text-[#B8C2CC] hover:text-[#263238] dark:hover:text-[#F5F7FA]'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setFilter('last_3_days')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filter === 'last_3_days'
                ? 'bg-[#66BB6A] text-white shadow-sm font-black'
                : 'text-[#607D8B] dark:text-[#B8C2CC] hover:text-[#263238] dark:hover:text-[#F5F7FA]'
            }`}
          >
            Last 3 Days
          </button>
          <button
            onClick={() => setFilter('this_week')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filter === 'this_week'
                ? 'bg-[#66BB6A] text-white shadow-sm font-black'
                : 'text-[#607D8B] dark:text-[#B8C2CC] hover:text-[#263238] dark:hover:text-[#F5F7FA]'
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      {/* History Record Table / Cards List */}
      {!records || records.length === 0 ? (
        <div className="text-center py-10 space-y-3 bg-[#F7F8FA] dark:bg-[#18212B] rounded-2xl border border-dashed border-slate-200 dark:border-[#374151]">
          <History className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
          <p className="text-xs font-bold text-[#607D8B] dark:text-[#B8C2CC]">
            No recent scan records available for this filter.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-[#374151] bg-[#F7F8FA] dark:bg-[#18212B] hover:bg-slate-100 dark:hover:bg-[#202A35] transition-all gap-4"
            >
              <div className="flex items-center gap-3">
                {/* Thumbnail Image */}
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 dark:bg-[#202A35] border border-slate-300 dark:border-[#374151] shrink-0">
                  {rec.imageSrc ? (
                    <img src={rec.imageSrc} alt="Onion Scan" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-[#263238] dark:text-[#F5F7FA]">{rec.dateStr} ({rec.timeStr})</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      rec.gradeA >= 70
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {rec.grade}
                    </span>
                  </div>
                  <div className="text-xs text-[#607D8B] dark:text-[#B8C2CC] font-semibold mt-1">
                    Score: <strong className="text-[#263238] dark:text-[#F5F7FA]">{rec.qualityScore}/100</strong> • Damage: <strong className="text-[#EF5350]">{rec.damagedPercent}%</strong> • Rate: <strong className="text-[#66BB6A]">{rec.marketRate}</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onViewRecord && onViewRecord(rec)}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-[#202A35] hover:bg-slate-800 dark:hover:bg-[#263238] text-white font-extrabold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 self-end sm:self-center border border-slate-700 dark:border-[#374151]"
              >
                <FileText className="w-4 h-4 text-[#66BB6A]" />
                <span>View Report</span>
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
