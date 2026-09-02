import React, { useState } from 'react';
import ReportFilterBar from '../components/reports/ReportFilterBar';
import ReportCardList from '../components/reports/ReportCardList';
import DigitalReportModal from '../components/assessment/DigitalReportModal';
import { HISTORICAL_BATCHES } from '../data/sampleData';
import { FileText, Download } from 'lucide-react';

export default function ReportsPage() {
  const [reports, setReports] = useState(HISTORICAL_BATCHES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCenter, setSelectedCenter] = useState('All');
  const [minScore, setMinScore] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [activeReportModal, setActiveReportModal] = useState(null);

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      (r.reportId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.farmerName || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCenter = selectedCenter === 'All' || r.center === selectedCenter;
    const matchesScore = r.score >= minScore;
    const matchesGrade = selectedGrade === 'All' || r.status === selectedGrade;

    return matchesSearch && matchesCenter && matchesScore && matchesGrade;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCenter('All');
    setMinScore(0);
    setSelectedGrade('All');
  };

  const handleDeleteReport = (reportId) => {
    setReports((prev) => prev.filter((item) => (item.reportId || item.id) !== reportId));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-onion-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
            <FileText className="w-8 h-8 text-amber-400" />
            Digital Quality Reports Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Access, download, filter, and print verified digital quality certificates across all procurement batches.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <ReportFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCenter={selectedCenter}
        setSelectedCenter={setSelectedCenter}
        minScore={minScore}
        setMinScore={setMinScore}
        selectedGrade={selectedGrade}
        setSelectedGrade={setSelectedGrade}
        onReset={handleResetFilters}
      />

      {/* Reports Table & Actions */}
      <ReportCardList
        reports={filteredReports}
        onViewReport={(rep) => setActiveReportModal(rep)}
        onDeleteReport={handleDeleteReport}
      />

      {/* Modal */}
      {activeReportModal && (
        <DigitalReportModal
          isOpen={!!activeReportModal}
          onClose={() => setActiveReportModal(null)}
          reportData={{
            sampleId: activeReportModal.reportId || activeReportModal.id,
            batchId: activeReportModal.id,
            dateTime: activeReportModal.date,
            center: activeReportModal.center,
            totalOnions: activeReportModal.totalOnions,
            gradeA: activeReportModal.gradeA,
            gradeB: activeReportModal.gradeB,
            urs: activeReportModal.urs,
            score: activeReportModal.score,
            confidence: activeReportModal.confidence,
            defects: activeReportModal.defects
          }}
        />
      )}

    </div>
  );
}
