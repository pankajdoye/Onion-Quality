import React, { useState } from 'react';
import FarmerHistoryRecords from '../components/farmer/FarmerHistoryRecords';
import StorageLossEstimator from '../components/farmer/StorageLossEstimator';
import SimpleProfitCalculator from '../components/farmer/ProfitCalculator';
import ReportDownloadModal from '../components/assessment/ReportDownloadModal';
import { SMART_I18N } from '../utils/i18n_smart';

export default function SmartReportsPage({ lang = 'en' }) {
  const t = SMART_I18N[lang] || SMART_I18N.en;
  const [activeReportRecord, setActiveReportRecord] = useState(null);

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 pb-20">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#1F2933] border border-slate-200 dark:border-[#374151] rounded-3xl p-5 shadow-sm flex items-center justify-between transition-colors">
        <div>
          <h2 className="text-xl font-black text-[#263238] dark:text-[#F5F7FA]">{t.tabReports || "Quality Reports"}</h2>
          <p className="text-xs text-[#607D8B] dark:text-[#B8C2CC] font-medium">Saved Onion History & Assessment Downloads</p>
        </div>
      </div>

      {/* History Records with Date Range Filter */}
      <FarmerHistoryRecords
        onViewRecord={(rec) => setActiveReportRecord(rec)}
        lang={lang}
      />

      {/* Storage Quantity Loss Estimator */}
      <StorageLossEstimator lang={lang} />

      {/* Profit Calculator */}
      <SimpleProfitCalculator expectedPricePerQuintal={2600} lang={lang} />

      {/* Multilingual PDF Report Download Modal */}
      {activeReportRecord && (
        <ReportDownloadModal
          isOpen={!!activeReportRecord}
          onClose={() => setActiveReportRecord(null)}
          resultData={activeReportRecord}
          imageSrc={activeReportRecord.imageSrc}
          currentLang={lang}
        />
      )}

    </div>
  );
}
