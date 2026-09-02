import React from 'react';
import { Camera, Upload, Bot, FileText } from 'lucide-react';

export default function MobileQuickBar({ onCapture, onUploadTrigger, onAnalyze, onReport, hasResult, isAnalyzing }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-3 py-2.5 shadow-2xl">
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto">
        
        {/* Capture Image */}
        <button
          onClick={onCapture}
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all active:scale-95"
        >
          <Camera className="w-5 h-5 text-onion-600 mb-1" />
          <span className="text-[11px] font-bold">Capture</span>
        </button>

        {/* Upload Image */}
        <button
          onClick={onUploadTrigger}
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all active:scale-95"
        >
          <Upload className="w-5 h-5 text-emerald-600 mb-1" />
          <span className="text-[11px] font-bold">Upload</span>
        </button>

        {/* Analyze Quality */}
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className={`flex flex-col items-center justify-center p-2 rounded-xl text-white text-xs font-bold transition-all active:scale-95 ${
            isAnalyzing ? 'bg-slate-400 opacity-60' : 'bg-gradient-to-tr from-onion-700 to-onion-500 shadow-md shadow-onion-600/30'
          }`}
        >
          <Bot className={`w-5 h-5 text-amber-300 mb-1 ${isAnalyzing ? 'animate-spin' : ''}`} />
          <span className="text-[11px]">{isAnalyzing ? 'Scanning...' : 'Analyze'}</span>
        </button>

        {/* Generate Report */}
        <button
          onClick={onReport}
          disabled={!hasResult}
          className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
            hasResult
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-slate-100 text-slate-400 opacity-60 cursor-not-allowed'
          }`}
        >
          <FileText className="w-5 h-5 mb-1" />
          <span className="text-[11px] font-bold">Report</span>
        </button>

      </div>
    </div>
  );
}
