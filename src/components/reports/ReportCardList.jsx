import React, { useState } from 'react';
import { Eye, Download, Trash2, FileText, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { downloadPdfReport } from '../../utils/pdfGenerator';

export default function ReportCardList({ reports, onViewReport, onDeleteReport }) {
  const [reportList, setReportList] = useState(reports);

  const handleDelete = (reportId) => {
    if (confirm(`Are you sure you want to delete Report #${reportId}?`)) {
      if (onDeleteReport) onDeleteReport(reportId);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
      
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-onion-600" />
          Saved Digital Quality Reports ({reports.length})
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Report ID</th>
              <th className="py-3 px-4">Batch ID</th>
              <th className="py-3 px-4">Date & Time</th>
              <th className="py-3 px-4">Procurement Center</th>
              <th className="py-3 px-4">Grade A</th>
              <th className="py-3 px-4">URS</th>
              <th className="py-3 px-4">Quality Score</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report.reportId || report.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-onion-700">
                    {report.reportId || 'RPT-89201'}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {report.id || report.batchId}
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-medium">{report.date}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{report.center}</td>
                  <td className="py-3 px-4 font-extrabold text-emerald-700">{report.gradeA}%</td>
                  <td className="py-3 px-4 font-extrabold text-rose-700">{report.urs}%</td>
                  <td className="py-3 px-4">
                    <span className={`font-black text-sm ${
                      report.score >= 85 ? 'text-emerald-600' : report.score >= 70 ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      {report.score} <span className="text-[10px] font-normal text-slate-400">/100</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={report.status} />
                  </td>
                  <td className="py-3 px-4 text-right space-x-1.5">
                    {/* View */}
                    <button
                      onClick={() => onViewReport(report)}
                      className="px-2.5 py-1 rounded-lg bg-onion-50 text-onion-700 hover:bg-onion-100 font-bold text-[11px] transition-all inline-flex items-center gap-1"
                      title="View Report"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </button>

                    {/* Download PDF */}
                    <button
                      onClick={() => onViewReport(report)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px] transition-all inline-flex items-center gap-1"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                      PDF
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(report.reportId || report.id)}
                      className="px-2 py-1 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-[11px] transition-all inline-flex items-center"
                      title="Delete Report"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-12 text-center text-slate-400 font-semibold">
                  No saved digital reports matching your filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
