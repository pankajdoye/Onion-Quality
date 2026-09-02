import React, { useState } from 'react';
import KpiCards from '../components/dashboard/KpiCards';
import QualityTrendChart from '../components/dashboard/QualityTrendChart';
import GradeDonutChart from '../components/dashboard/GradeDonutChart';
import DefectBarChart from '../components/dashboard/DefectBarChart';
import BatchTable from '../components/dashboard/BatchTable';
import DigitalReportModal from '../components/assessment/DigitalReportModal';
import { BarChart3, RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  const [selectedBatchForReport, setSelectedBatchForReport] = useState(null);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      
      {/* Dashboard Top Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-onion-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-onion-400" />
            Quality Intelligence Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Real-time analytics across regional procurement centers, APMC mandis, and farmer batches.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono bg-slate-800 text-emerald-400 px-3 py-1.5 rounded-xl border border-slate-700 font-bold">
            • Live Stream Sync
          </span>
        </div>
      </div>

      {/* Top Key KPI Cards */}
      <KpiCards />

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Quality Score Trend Over Batches (Line Chart) */}
        <div className="lg:col-span-8">
          <QualityTrendChart />
        </div>

        {/* Grade Distribution Share (Donut Chart) */}
        <div className="lg:col-span-4">
          <GradeDonutChart />
        </div>

      </div>

      {/* Defect Analysis Bar Chart */}
      <DefectBarChart />

      {/* Historical Batch Performance Table */}
      <BatchTable
        onViewReport={(batch) => setSelectedBatchForReport(batch)}
      />

      {/* Report Modal */}
      {selectedBatchForReport && (
        <DigitalReportModal
          isOpen={!!selectedBatchForReport}
          onClose={() => setSelectedBatchForReport(null)}
          reportData={{
            sampleId: selectedBatchForReport.reportId,
            batchId: selectedBatchForReport.id,
            dateTime: selectedBatchForReport.date,
            center: selectedBatchForReport.center,
            totalOnions: selectedBatchForReport.totalOnions,
            gradeA: selectedBatchForReport.gradeA,
            gradeB: selectedBatchForReport.gradeB,
            urs: selectedBatchForReport.urs,
            score: selectedBatchForReport.score,
            confidence: selectedBatchForReport.confidence,
            defects: selectedBatchForReport.defects
          }}
        />
      )}

    </div>
  );
}
