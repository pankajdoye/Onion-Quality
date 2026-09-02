import React, { useState } from 'react';
import { X, Download, FileText, Check, Loader2 } from 'lucide-react';
import { generateMultilingualPdfReport } from '../../utils/pdfGenerator';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function ReportDownloadModal({ isOpen, onClose, resultData, imageSrc, currentLang = 'en' }) {
  // Use the saved report's language if available, otherwise current UI language
  const initialLang = resultData?.lang || currentLang;
  const [selectedLang, setSelectedLang] = useState(initialLang);
  const [isGenerating, setIsGenerating] = useState(false);
  const t = SMART_I18N[currentLang] || SMART_I18N.en;

  if (!isOpen) return null;

  const languages = [
    { code: 'en', flag: '🇬🇧', label: 'English', subtitle: 'Standard English Report' },
    { code: 'hi', flag: '🇮🇳', label: 'हिंदी (Hindi)', subtitle: 'हिंदी गुणवत्ता रिपोर्ट' },
    { code: 'mr', flag: '🇮🇳', label: 'मराठी (Marathi)', subtitle: 'मराठी कांदा गुणवत्ता अहवाल' }
  ];

  const handleDownload = async () => {
    setIsGenerating(true);
    await generateMultilingualPdfReport({
      resultData,
      imageSrc: imageSrc || resultData?.imageSrc,
      lang: selectedLang,
      reportId: resultData?.id
    });
    setIsGenerating(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#1F2933] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-[#374151] z-10 animate-in zoom-in-95 duration-200 space-y-6 transition-colors">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-[#374151]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#66BB6A] text-white flex items-center justify-center font-black">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-[#263238] dark:text-[#F5F7FA] leading-tight">
                {t.downloadReportBtn || "Download Quality Report"}
              </h3>
              <p className="text-xs text-[#607D8B] dark:text-[#B8C2CC] font-medium">
                {t.selectPdfLanguage || "Select your preferred report language"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-[#263238] dark:hover:text-[#F5F7FA] hover:bg-slate-100 dark:hover:bg-[#202A35] transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Selection Grid */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-[#607D8B] dark:text-[#B8C2CC] uppercase tracking-wider block">
            {t.selectPdfLanguage || "Download Report In:"}
          </label>

          <div className="grid grid-cols-1 gap-2.5">
            {languages.map((item) => {
              const isSelected = selectedLang === item.code;
              return (
                <button
                  key={item.code}
                  onClick={() => setSelectedLang(item.code)}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 font-bold text-left transition-all ${
                    isSelected
                      ? 'border-[#66BB6A] bg-emerald-50/60 dark:bg-emerald-950/40 text-[#263238] dark:text-[#F5F7FA] shadow-sm'
                      : 'border-slate-200 dark:border-[#374151] bg-[#F7F8FA] dark:bg-[#202A35] text-[#263238] dark:text-[#F5F7FA] hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.flag}</span>
                    <div>
                      <div className="text-sm font-extrabold">{item.label}</div>
                      <div className="text-[11px] text-[#607D8B] dark:text-[#B8C2CC] font-medium">{item.subtitle}</div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#66BB6A] text-white flex items-center justify-center text-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-2xl border border-slate-300 dark:border-[#374151] text-[#263238] dark:text-[#F5F7FA] font-bold text-xs hover:bg-slate-100 dark:hover:bg-[#202A35] transition-all"
          >
            {currentLang === 'mr' ? 'रद्द करा' : currentLang === 'hi' ? 'रद्द करें' : 'Cancel'}
          </button>

          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex-1 py-3.5 rounded-2xl bg-[#66BB6A] hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{currentLang === 'mr' ? 'पीडीएफ तयार होत आहे...' : currentLang === 'hi' ? 'पीडीएफ बन रही है...' : 'Generating PDF...'}</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                <span>{t.downloadReportBtn || "Download PDF ↓"}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
