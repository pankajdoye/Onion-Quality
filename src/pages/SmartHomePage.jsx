import React, { useState, useEffect } from 'react';
import { Camera, Upload, Store, History, FileText, Warehouse, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { SMART_I18N } from '../utils/i18n_smart';
import { getLatestScan, getScanHistory } from '../services/historyService';
import { getOfficialMarketData } from '../services/marketService';

export default function SmartHomePage({ setActiveTab, lang = 'en' }) {
  const t = SMART_I18N[lang] || SMART_I18N.en;
  const [latestScan, setLatestScan] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const [recentScans, setRecentScans] = useState([]);

  useEffect(() => {
    setLatestScan(getLatestScan());
    setRecentScans(getScanHistory('this_week').slice(0, 3));
    getOfficialMarketData().then(data => setMarketData(data));
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 pb-20">
      
      {/* SECTION 1 — SCAN ONION */}
      <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-6 sm:p-8 shadow-sm text-center space-y-4 transition-colors">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-[#66BB6A] mx-auto flex items-center justify-center font-black text-2xl">
          🧅
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#263238] dark:text-[#F5F7FA] tracking-tight">
            Scan / Upload Onion
          </h2>
          <p className="text-xs sm:text-sm text-[#607D8B] dark:text-[#B8C2CC] font-medium max-w-md mx-auto">
            Capture a clear photo of real onions for instant quality analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto pt-2">
          <button
            onClick={() => {
              setActiveTab('check');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#66BB6A] hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
          >
            <Camera className="w-4 h-4 text-amber-200" />
            <span>Capture with Camera</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('check');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-900 dark:bg-[#202A35] hover:bg-slate-800 dark:hover:bg-[#263238] text-white font-extrabold text-xs shadow-md transition-all active:scale-95 border border-slate-700 dark:border-[#374151]"
          >
            <Upload className="w-4 h-4 text-[#66BB6A]" />
            <span>Upload Image</span>
          </button>
        </div>
      </div>

      {/* SECTION 2 — LATEST QUALITY RESULT */}
      <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-6 shadow-sm space-y-4 transition-colors">
        <h3 className="text-xs font-black uppercase tracking-wider text-[#607D8B] dark:text-[#B8C2CC]">
          LATEST QUALITY RESULT
        </h3>

        {latestScan ? (
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-[#F7F8FA] dark:bg-[#18212B] border border-slate-200 dark:border-[#374151]">
            {latestScan.imageSrc && (
              <div className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-300 dark:border-[#374151] shrink-0">
                <img src={latestScan.imageSrc} alt="Scanned Onion" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1 space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-base font-extrabold text-[#263238] dark:text-[#F5F7FA]">Quality: {latestScan.qualityStatus}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {latestScan.grade}
                </span>
              </div>
              <div className="text-xs text-[#607D8B] dark:text-[#B8C2CC] font-semibold space-x-2">
                <span>Score: <strong className="text-[#263238] dark:text-[#F5F7FA]">{latestScan.qualityScore}/100</strong></span>
                <span>• Damage: <strong className="text-[#EF5350]">{latestScan.damagedPercent}%</strong></span>
                <span>• Rate: <strong className="text-[#66BB6A]">{latestScan.marketRate}</strong></span>
              </div>
              <div className="text-[11px] text-[#607D8B] dark:text-[#B8C2CC] pt-1">
                Scanned on {latestScan.dateStr} at {latestScan.timeStr}
              </div>
            </div>

            <button
              onClick={() => setActiveTab('reports')}
              className="px-4 py-2.5 rounded-xl bg-[#66BB6A] hover:bg-emerald-600 text-white font-extrabold text-xs shadow-sm transition-all shrink-0"
            >
              View Full Report
            </button>
          </div>
        ) : (
          <div className="p-6 text-center text-xs font-bold text-[#607D8B] dark:text-[#B8C2CC] bg-[#F7F8FA] dark:bg-[#18212B] rounded-2xl border border-dashed border-slate-200 dark:border-[#374151]">
            No onion has been analyzed yet.
          </div>
        )}
      </div>

      {/* SECTION 3 — LATEST OFFICIAL MARKET RATE */}
      <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-6 shadow-sm space-y-3 transition-colors">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#607D8B] dark:text-[#B8C2CC]">
            LATEST OFFICIAL MARKET RATE
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-[#374151]">
            {marketData?.source || "Official Market Data"}
          </span>
        </div>

        {marketData && marketData.available ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-emerald-50/60 dark:bg-[#18212B] border border-emerald-200 dark:border-[#374151] gap-3">
            <div>
              <div className="text-2xl font-black text-emerald-800 dark:text-[#66BB6A]">
                {marketData.priceFormatted}
              </div>
              <div className="text-xs font-bold text-[#607D8B] dark:text-[#B8C2CC]">
                Market: {marketData.market} ({marketData.date})
              </div>
            </div>
            <div className="text-[11px] font-medium text-[#607D8B] dark:text-[#B8C2CC] self-start sm:self-center">
              Updated: {marketData.lastUpdated}
            </div>
          </div>
        ) : (
          <div className="p-4 text-center text-xs font-bold text-[#607D8B] dark:text-[#B8C2CC] bg-[#F7F8FA] dark:bg-[#18212B] rounded-2xl border border-slate-200 dark:border-[#374151]">
            Official market rate currently unavailable.
          </div>
        )}
      </div>

      {/* SECTION 4 — RECENT SCANS */}
      <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-6 shadow-sm space-y-4 transition-colors">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#607D8B] dark:text-[#B8C2CC]">
            RECENT SCANS
          </h3>
          <button
            onClick={() => setActiveTab('history')}
            className="text-xs font-extrabold text-[#66BB6A] hover:underline flex items-center gap-1"
          >
            <span>View Full History</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentScans && recentScans.length > 0 ? (
          <div className="space-y-2">
            {recentScans.map(rec => (
              <div key={rec.id} className="flex items-center justify-between p-3 rounded-xl bg-[#F7F8FA] dark:bg-[#18212B] border border-slate-200 dark:border-[#374151] text-xs font-bold text-[#263238] dark:text-[#F5F7FA]">
                <div>{rec.dateStr} ({rec.timeStr})</div>
                <div className="text-[#66BB6A]">{rec.grade}</div>
                <div>{rec.qualityStatus}</div>
                <div className="text-[#607D8B] dark:text-[#B8C2CC]">{rec.marketRate}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-xs font-bold text-[#607D8B] dark:text-[#B8C2CC] bg-[#F7F8FA] dark:bg-[#18212B] rounded-2xl border border-slate-200 dark:border-[#374151]">
            No recent scan records available.
          </div>
        )}
      </div>

      {/* SECTION 5 — QUICK ACTIONS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <button
          onClick={() => setActiveTab('check')}
          className="p-4 rounded-2xl bg-white dark:bg-[#1F2933] border border-slate-200 dark:border-[#374151] hover:border-[#66BB6A] text-[#263238] dark:text-[#F5F7FA] font-extrabold text-xs shadow-sm flex flex-col items-center justify-center gap-2 transition-all"
        >
          <Camera className="w-5 h-5 text-[#66BB6A]" />
          <span>New Scan</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className="p-4 rounded-2xl bg-white dark:bg-[#1F2933] border border-slate-200 dark:border-[#374151] hover:border-[#66BB6A] text-[#263238] dark:text-[#F5F7FA] font-extrabold text-xs shadow-sm flex flex-col items-center justify-center gap-2 transition-all"
        >
          <History className="w-5 h-5 text-indigo-500" />
          <span>View History</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className="p-4 rounded-2xl bg-white dark:bg-[#1F2933] border border-slate-200 dark:border-[#374151] hover:border-[#66BB6A] text-[#263238] dark:text-[#F5F7FA] font-extrabold text-xs shadow-sm flex flex-col items-center justify-center gap-2 transition-all"
        >
          <FileText className="w-5 h-5 text-[#F59E0B]" />
          <span>Quality Report</span>
        </button>

        <button
          onClick={() => setActiveTab('storage')}
          className="p-4 rounded-2xl bg-white dark:bg-[#1F2933] border border-slate-200 dark:border-[#374151] hover:border-[#66BB6A] text-[#263238] dark:text-[#F5F7FA] font-extrabold text-xs shadow-sm flex flex-col items-center justify-center gap-2 transition-all"
        >
          <Warehouse className="w-5 h-5 text-purple-500" />
          <span>Storage Guide</span>
        </button>
      </div>

    </div>
  );
}
