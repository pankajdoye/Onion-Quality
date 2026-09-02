import React, { useState } from 'react';
import { Eye, EyeOff, Layers, Sparkles, Filter } from 'lucide-react';

export default function ImageAnalysisView({ sampleImage, detectedOnions = [] }) {
  const [viewMode, setViewMode] = useState('ai'); // 'original', 'ai', 'segmentation'
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredOnion, setHoveredOnion] = useState(null);

  // Default mock detected onions if none passed
  const onions = detectedOnions.length > 0 ? detectedOnions : [
    { id: 1, label: 'Grade A', confidence: 0.98, x: 12, y: 15, width: 22, height: 25, status: 'healthy', size: '72mm' },
    { id: 2, label: 'Grade A', confidence: 0.96, x: 38, y: 18, width: 24, height: 26, status: 'healthy', size: '74mm' },
    { id: 3, label: 'Damaged', confidence: 0.92, x: 68, y: 20, width: 21, height: 24, status: 'damaged', size: '68mm', defectNote: 'Cut skin' },
    { id: 4, label: 'Rotten', confidence: 0.94, x: 15, y: 52, width: 23, height: 25, status: 'rotten', size: '64mm', defectNote: 'Fungal core' },
    { id: 5, label: 'Sprouted', confidence: 0.91, x: 42, y: 55, width: 22, height: 28, status: 'sprouted', size: '66mm', defectNote: 'Shoot 15mm' },
    { id: 6, label: 'Undersized', confidence: 0.90, x: 72, y: 56, width: 14, height: 16, status: 'undersized', size: '42mm', defectNote: '<45mm diameter' },
  ];

  const filteredOnions = activeFilter === 'all' 
    ? onions 
    : onions.filter(o => o.label.toLowerCase().includes(activeFilter.toLowerCase()) || o.status.toLowerCase().includes(activeFilter.toLowerCase()));

  const getBoundingColor = (status) => {
    switch (status) {
      case 'healthy':
        return { border: 'border-emerald-500 bg-emerald-500/20 text-emerald-300', badge: 'bg-emerald-600 text-white' };
      case 'damaged':
        return { border: 'border-amber-500 bg-amber-500/20 text-amber-300', badge: 'bg-amber-600 text-white' };
      case 'rotten':
        return { border: 'border-rose-500 bg-rose-500/25 text-rose-300', badge: 'bg-rose-600 text-white' };
      case 'sprouted':
        return { border: 'border-purple-500 bg-purple-500/20 text-purple-300', badge: 'bg-purple-600 text-white' };
      case 'undersized':
        return { border: 'border-blue-500 bg-blue-500/20 text-blue-300', badge: 'bg-blue-600 text-white' };
      default:
        return { border: 'border-slate-500 bg-slate-500/20 text-slate-300', badge: 'bg-slate-700 text-white' };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-onion-600" />
            Computer Vision Image Analysis View
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Interactive YOLOv11 bounding box inference & semantic segmentation overlay.
          </p>
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setViewMode('original')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'original' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Original Image
          </button>
          <button
            onClick={() => setViewMode('ai')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'ai' ? 'bg-onion-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Detection
          </button>
          <button
            onClick={() => setViewMode('segmentation')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'segmentation' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Segmentation
          </button>
        </div>
      </div>

      {/* Category Filter Chips */}
      {viewMode !== 'original' && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold text-[11px] flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter Bounding Boxes:
          </span>
          {['all', 'Grade A', 'Damaged', 'Rotten', 'Sprouted', 'Undersized'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter === 'all' ? 'All Objects' : filter}
            </button>
          ))}
        </div>
      )}

      {/* Split-Screen Canvas Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Side: Original Reference */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-slate-500" />
              Original Sample Photo
            </span>
            <span className="text-[10px] text-slate-400">Raw Capture Frame</span>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 aspect-[4/3] flex items-center justify-center shadow-inner">
            {sampleImage ? (
              <img src={sampleImage} alt="Original onion sample" className="w-full h-full object-contain" />
            ) : (
              <div className="text-slate-500 font-medium text-xs">No image loaded</div>
            )}
          </div>
        </div>

        {/* Right Side: AI Object Bounding Box Overlay */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-onion-600" />
              {viewMode === 'segmentation' ? 'Semantic Mask Layer' : 'YOLO Bounding Box Visualizer'}
            </span>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {filteredOnions.length} Detected Targets
            </span>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-900 bg-slate-950 aspect-[4/3] flex items-center justify-center shadow-2xl group">
            
            {/* Background image */}
            {sampleImage ? (
              <img
                src={sampleImage}
                alt="AI Detection display"
                className={`w-full h-full object-contain transition-all duration-300 ${
                  viewMode === 'segmentation' ? 'brightness-50 contrast-125' : 'brightness-90'
                }`}
              />
            ) : (
              <div className="text-slate-500 text-xs">No image preview</div>
            )}

            {/* Grid overlay for Segmentation mode */}
            {viewMode === 'segmentation' && (
              <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-40 pointer-events-none"></div>
            )}

            {/* Bounding Boxes Layer */}
            {viewMode !== 'original' && filteredOnions.map((onion) => {
              const styleColor = getBoundingColor(onion.status);
              const isHovered = hoveredOnion?.id === onion.id;

              return (
                <div
                  key={onion.id}
                  onMouseEnter={() => setHoveredOnion(onion)}
                  onMouseLeave={() => setHoveredOnion(null)}
                  style={{
                    left: `${onion.x}%`,
                    top: `${onion.y}%`,
                    width: `${onion.width}%`,
                    height: `${onion.height}%`
                  }}
                  className={`absolute border-2 rounded-lg transition-all duration-200 cursor-pointer ${styleColor.border} ${
                    isHovered ? 'scale-105 shadow-[0_0_15px_rgba(255,255,255,0.4)] z-30 ring-2 ring-white' : 'z-10'
                  }`}
                >
                  {/* Label badge */}
                  <div className={`absolute -top-5 left-0 px-2 py-0.5 rounded text-[10px] font-extrabold shadow flex items-center gap-1 ${styleColor.badge}`}>
                    <span>{onion.label}</span>
                    <span className="opacity-80">({Math.round(onion.confidence * 100)}%)</span>
                  </div>

                  {/* Size tag */}
                  <div className="absolute -bottom-4 right-0 px-1.5 py-0.2 text-[9px] font-mono font-bold bg-slate-900/90 text-white rounded border border-slate-700">
                    {onion.size}
                  </div>

                  {/* Hover tooltip details */}
                  {isHovered && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 bg-slate-900/95 text-white p-2.5 rounded-xl shadow-2xl border border-slate-700 z-50 text-[11px] backdrop-blur-md">
                      <div className="font-bold border-b border-slate-800 pb-1 mb-1 flex items-center justify-between">
                        <span>Onion #{onion.id}</span>
                        <span className="text-emerald-400">{onion.size}</span>
                      </div>
                      <p className="text-slate-300">Class: <strong className="text-white">{onion.label}</strong></p>
                      {onion.defectNote && (
                        <p className="text-rose-300 mt-0.5">Defect: <strong>{onion.defectNote}</strong></p>
                      )}
                      <p className="text-slate-400 text-[10px] mt-1">Confidence: {(onion.confidence * 100).toFixed(1)}%</p>
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        </div>

      </div>

      {/* Legend Footer */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-bold text-slate-700">Detection Bounding Box Legend:</span>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span> Grade A</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500 inline-block"></span> Damaged</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-500 inline-block"></span> Rotten</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-purple-500 inline-block"></span> Sprouted</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-500 inline-block"></span> Undersized</span>
        </div>
      </div>

    </div>
  );
}
