import React, { useState } from 'react';
import { Search, Eye, Filter, Download } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { HISTORICAL_BATCHES } from '../../data/sampleData';

export default function BatchTable({ onViewReport }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredBatches = HISTORICAL_BATCHES.filter((batch) => {
    const matchesSearch =
      batch.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.center.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.farmerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || batch.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
      
      {/* Table Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Procurement Batch Performance History
          </h3>
          <p className="text-xs text-slate-500">Real-time log of analyzed farmer batches across APMC procurement hubs</p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Batch, Mandi, Farmer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-onion-500 w-48 sm:w-56"
            />
          </div>

          {/* Status filter dropdown */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            {['All', 'Approved', 'Flagged', 'Rejected'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  statusFilter === st ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Batch ID</th>
              <th className="py-3 px-4">Date & Time</th>
              <th className="py-3 px-4">Procurement Center</th>
              <th className="py-3 px-4">Grade A %</th>
              <th className="py-3 px-4">URS %</th>
              <th className="py-3 px-4">Quality Score</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredBatches.length > 0 ? (
              filteredBatches.map((batch) => (
                <tr key={batch.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    <div>{batch.id}</div>
                    <span className="text-[10px] text-slate-400 font-normal">{batch.farmerName}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{batch.date}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{batch.center}</td>
                  <td className="py-3 px-4 font-extrabold text-emerald-700">{batch.gradeA}%</td>
                  <td className="py-3 px-4 font-extrabold text-rose-700">{batch.urs}%</td>
                  <td className="py-3 px-4">
                    <span className={`font-black text-sm ${
                      batch.score >= 85 ? 'text-emerald-600' : batch.score >= 70 ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      {batch.score} <span className="text-[10px] font-semibold text-slate-400">/100</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={batch.status} />
                  </td>
                  <td className="py-3 px-4 text-right space-x-1">
                    <button
                      onClick={() => onViewReport && onViewReport(batch)}
                      className="px-2.5 py-1 rounded-lg bg-onion-50 text-onion-700 hover:bg-onion-100 font-bold text-[11px] transition-all inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400 font-semibold">
                  No matching batch records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
