import React from 'react';
import { Search, Filter, RefreshCw, Calendar, Building2, SlidersHorizontal } from 'lucide-react';
import { AGRI_CENTERS } from '../../data/sampleData';

export default function ReportFilterBar({
  searchQuery,
  setSearchQuery,
  selectedCenter,
  setSelectedCenter,
  minScore,
  setMinScore,
  selectedGrade,
  setSelectedGrade,
  onReset
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <Filter className="w-4 h-4 text-onion-600" />
          Filter & Search Digital Reports
        </h3>
        <button
          onClick={onReset}
          className="text-xs text-onion-600 hover:text-onion-800 font-bold flex items-center gap-1"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Search */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase">Search Keywords</label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Report ID, Batch, Farmer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-onion-500"
            />
          </div>
        </div>

        {/* Center Select */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase">Procurement Center</label>
          <select
            value={selectedCenter}
            onChange={(e) => setSelectedCenter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-onion-500 bg-white"
          >
            <option value="All">All Mandi Hubs</option>
            {AGRI_CENTERS.map((center, idx) => (
              <option key={idx} value={center}>{center}</option>
            ))}
          </select>
        </div>

        {/* Grade Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase">Target Grade</label>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-onion-500 bg-white"
          >
            <option value="All">All Grades</option>
            <option value="Approved">Approved (Grade A Dominant)</option>
            <option value="Flagged">Flagged (Grade B / Moderate Defect)</option>
            <option value="Rejected">Rejected (High URS)</option>
          </select>
        </div>

        {/* Min Score Range */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Min Quality Score</label>
            <span className="text-xs font-extrabold text-onion-700">{minScore} / 100</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="w-full accent-onion-600 cursor-pointer mt-1"
          />
        </div>

      </div>

    </div>
  );
}
