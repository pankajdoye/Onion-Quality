import React, { useState, useEffect } from 'react';
import { Camera, Upload, Store, History, FileText, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
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
            {t.uploadTitle || "Scan / Upload Onion"}
          </h2>
          <p className="text-xs sm:text-sm text-[#607D8B] dark:text-[#B8C2CC] font-medium max-w-md mx-auto">
            {lang === 'mr' 
              ? 'त्वरित गुणवत्ता तपासणीसाठी कांद्याचा स्पष्ट फोटो काढा किंवा अपलोड करा.'
              : lang === 'hi' 
              ? 'तुरंत गुणवत्ता जांच के लिए प्याज की साफ फोटो खींचें या अपलोड करें।'
              : 'Capture a clear photo of real onions for instant quality analysis.'}
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
            <span>{t.takePhoto || "Capture with Camera"}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('check');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-900 dark:bg-[#202A35] hover:bg-slate-800 dark:hover:bg-[#263238] text-white font-extrabold text-xs shadow-md transition-all active:scale-95 border border-slate-700 dark:border-[#374151]"
          >
            <Upload className="w-4 h-4 text-[#66BB6A]" />
            <span>{t.uploadPhoto || "Upload Image"}</span>
          </button>
        </div>
      </div>

      {/* SECTION 2 — RECENT ONION SCAN */}
      <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-6 shadow-sm space-y-4 transition-colors">
        <h3 className="text-xs font-black uppercase tracking-wider text-[#607D8B] dark:text-[#B8C2CC]">
          {lang === 'mr' ? 'कांद्याचे अलीकडील स्कॅन (Recent Onion Scan)' : lang === 'hi' ? 'हालिया प्याज स्कैन (Recent Onion Scan)' : 'Recent Onion Scan'}
        </h3>

        {latestScan ? (
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-[#F7F8FA] dark:bg-[#18212B] border border-slate-200 dark:border-[#374151]">
            {latestScan.imageSrc && (
              <div className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-300 dark:border-[#374151] shrink-0 bg-slate-200">
                <img src={latestScan.imageSrc} alt="Scanned Onion" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1 space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-base font-extrabold text-[#263238] dark:text-[#F5F7FA]">
                  {t.overallQuality || "Quality"}: {latestScan.qualityStatus}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {latestScan.grade}
                </span>
              </div>
              <div className="text-xs text-[#607D8B] dark:text-[#B8C2CC] font-semibold space-x-2">
                <span>{t.qualityScore || "Score"}: <strong className="text-[#263238] dark:text-[#F5F7FA]">{latestScan.qualityScore}/100</strong></span>
                <span>• {t.damagePercent || "Damage"}: <strong className="text-[#EF5350]">{latestScan.damagedPercent}%</strong></span>
                <span>• {t.sizeCategory || "Size"}: <strong className="text-[#263238] dark:text-[#F5F7FA]">{latestScan.size}</strong></span>
                <span>• {t.estimatedPrice || "Rate"}: <strong className="text-[#66BB6A]">{latestScan.marketRate}</strong></span>
              </div>
              <div className="text-[11px] text-[#607D8B] dark:text-[#B8C2CC] pt-1">
                {lang === 'mr' 
                  ? `स्कॅन तारीख: ${latestScan.dateStr} वेळ: ${latestScan.timeStr}`
                  : lang === 'hi'
                  ? `स्कैन दिनांक: ${latestScan.dateStr} समय: ${latestScan.timeStr}`
                  : `Scanned on ${latestScan.dateStr} at ${latestScan.timeStr}`}
              </div>
            </div>

            <button
              onClick={() => setActiveTab('reports')}
              className="px-4 py-2.5 rounded-xl bg-[#66BB6A] hover:bg-emerald-600 text-white font-extrabold text-xs shadow-sm transition-all shrink-0"
            >
              {lang === 'mr' ? 'पूर्ण अहवाल पहा' : lang === 'hi' ? 'पूरी रिपोर्ट देखें' : 'View Full Report'}
            </button>
          </div>
        ) : (
          <div className="p-6 text-center text-xs font-bold text-[#607D8B] dark:text-[#B8C2CC] bg-[#F7F8FA] dark:bg-[#18212B] rounded-2xl border border-dashed border-slate-200 dark:border-[#374151]">
            {t.noRecentScansMsg || (lang === 'mr' ? 'कोणतेही कांदा स्कॅन उपलब्ध नाही.' : lang === 'hi' ? 'कोई हालिया प्याज स्कैन उपलब्ध नहीं है।' : 'No recent onion scans available.')}
          </div>
        )}
      </div>

      {/* SECTION 3 — LATEST OFFICIAL MARKET RATE */}
      <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-6 shadow-sm space-y-3 transition-colors">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#607D8B] dark:text-[#B8C2CC]">
            {lang === 'mr' ? 'अधिकृत बाजार भाव' : lang === 'hi' ? 'आधिकारिक मंडी भाव' : 'Latest Official Market Rate'}
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-[#374151]">
            {marketData?.source || (lang === 'mr' ? 'अधिकृत बाजार समिती डेटा' : lang === 'hi' ? 'आधिकारिक मंडी डेटा' : 'Official Market Data')}
          </span>
        </div>

        {marketData && marketData.available ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-emerald-50/60 dark:bg-[#18212B] border border-emerald-200 dark:border-[#374151] gap-3">
            <div>
              <div className="text-2xl font-black text-emerald-800 dark:text-[#66BB6A]">
                {marketData.priceFormatted}
              </div>
              <div className="text-xs font-bold text-[#607D8B] dark:text-[#B8C2CC]">
                {lang === 'mr' ? 'बाजार समिती:' : lang === 'hi' ? 'मंडी:' : 'Market:'} {marketData.market} ({marketData.date})
              </div>
            </div>
            <div className="text-[11px] font-medium text-[#607D8B] dark:text-[#B8C2CC] self-start sm:self-center">
              {lang === 'mr' ? 'अपडेट:' : lang === 'hi' ? 'अपडेट:' : 'Updated:'} {marketData.lastUpdated}
            </div>
          </div>
        ) : (
          <div className="p-4 text-center text-xs font-bold text-[#607D8B] dark:text-[#B8C2CC] bg-[#F7F8FA] dark:bg-[#18212B] rounded-2xl border border-slate-200 dark:border-[#374151]">
            {lang === 'mr' ? 'अधिकृत बाजारभाव सध्या उपलब्ध नाही.' : lang === 'hi' ? 'आधिकारिक मंडी भाव वर्तमान में उपलब्ध नहीं है।' : 'Official market rate currently unavailable.'}
          </div>
        )}
      </div>

      {/* SECTION 4 — RECENT SCANS LIST */}
      <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-6 shadow-sm space-y-4 transition-colors">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#607D8B] dark:text-[#B8C2CC]">
            {lang === 'mr' ? 'मागील अहवाल इतिहास' : lang === 'hi' ? 'पिछली रिपोर्ट इतिहास' : 'Previous Reports / History'}
          </h3>
          <button
            onClick={() => setActiveTab('reports')}
            className="text-xs font-extrabold text-[#66BB6A] hover:underline flex items-center gap-1"
          >
            <span>{lang === 'mr' ? 'सर्व अहवाल पहा' : lang === 'hi' ? 'सभी रिपोर्ट देखें' : 'View All'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentScans && recentScans.length > 0 ? (
          <div className="space-y-2">
            {recentScans.map((scan) => (
              <div
                key={scan.id}
                onClick={() => setActiveTab('reports')}
                className="p-3.5 rounded-2xl bg-[#F7F8FA] dark:bg-[#18212B] border border-slate-200 dark:border-[#374151] flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-[#202A35] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                    {scan.imageSrc ? (
                      <img src={scan.imageSrc} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs">🧅</div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#263238] dark:text-[#F5F7FA]">
                      {scan.dateStr} • {scan.grade} ({scan.qualityScore}/100)
                    </div>
                    <div className="text-[11px] text-[#607D8B] dark:text-[#B8C2CC]">
                      {t.sizeCategory || "Size"}: {scan.size} • {t.damagePercent || "Damage"}: {scan.damagedPercent}%
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-xs font-bold text-[#607D8B] dark:text-[#B8C2CC] bg-[#F7F8FA] dark:bg-[#18212B] rounded-2xl border border-dashed border-slate-200 dark:border-[#374151]">
            {t.noRecentScansMsg || (lang === 'mr' ? 'कोणतेही कांदा स्कॅन उपलब्ध नाही.' : lang === 'hi' ? 'कोई हालिया प्याज स्कैन उपलब्ध नहीं है।' : 'No recent onion scans available.')}
          </div>
        )}
      </div>

    </div>
  );
}
