import React, { useEffect, useState } from 'react';
import { Cpu, CheckCircle, Scan, Eye, Layers, ShieldCheck, Calculator } from 'lucide-react';

export default function ProcessingState({ sampleImage }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    { label: 'Image Preprocessing & Normalization', icon: Scan, desc: 'Histogram equalization and noise reduction' },
    { label: 'Onion Detection & Segmentation', icon: Eye, desc: 'Bounding-box extraction via YOLO framework' },
    { label: 'Defect Classification', icon: Layers, desc: 'Scanning for damaged, rotten, sprouted & undersized' },
    { label: 'Size & Weight Estimation', icon: Calculator, desc: 'Measuring bulb diameter (mm) & density index' },
    { label: 'Quality Scoring & Threshold Evaluation', icon: ShieldCheck, desc: 'Computing overall quality score (0-100)' },
    { label: 'Grade Calculation (Grade A / B / URS)', icon: Cpu, desc: 'Final procurement percentage distribution' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-6 sm:p-8 shadow-lg text-center space-y-6 animate-in fade-in max-w-3xl mx-auto transition-colors">
      
      {/* Scanner graphic box */}
      <div className="relative max-w-md mx-auto h-64 rounded-2xl overflow-hidden bg-slate-950 border-2 border-emerald-500 shadow-2xl flex items-center justify-center">
        {sampleImage ? (
          <img src={sampleImage} alt="Scanning target" className="w-full h-full object-cover opacity-60" />
        ) : (
          <div className="text-slate-500 font-bold text-sm">Target Sample Frame</div>
        )}

        {/* Animated Scanner Laser */}
        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b] animate-scanner"></div>

        {/* Grid overlay lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>

        {/* Floating AI HUD text */}
        <div className="absolute top-3 left-3 bg-slate-900/90 text-amber-300 text-[10px] font-mono font-bold px-2.5 py-1 rounded border border-amber-500/40 backdrop-blur-md">
          VISION ENGINE: ACTIVE
        </div>
        <div className="absolute bottom-3 right-3 bg-slate-900/90 text-[#66BB6A] text-[10px] font-mono font-bold px-2.5 py-1 rounded border border-emerald-500/40 backdrop-blur-md">
          CONFIDENCE: 96%
        </div>
      </div>

      {/* Progress header */}
      <div>
        <h3 className="text-xl font-extrabold text-[#263238] dark:text-[#F5F7FA] flex items-center justify-center gap-2">
          <Cpu className="w-6 h-6 text-[#66BB6A] animate-spin" />
          AI Quality Analysis in Progress
        </h3>
        <p className="text-xs text-[#607D8B] dark:text-[#B8C2CC] mt-1">
          Analyzing computer vision tensors and calculating defect metrics...
        </p>
      </div>

      {/* Checklist of steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={idx}
              className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                isDone
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-[#263238] dark:text-[#F5F7FA]'
                  : isCurrent
                  ? 'bg-emerald-50 dark:bg-[#202A35] border-[#66BB6A] ring-2 ring-emerald-500/20 text-[#263238] dark:text-[#F5F7FA] shadow-sm'
                  : 'bg-[#F7F8FA] dark:bg-[#18212B] border-slate-200 dark:border-[#374151] text-[#607D8B] dark:text-[#B8C2CC] opacity-60'
              }`}
            >
              <div className="mt-0.5">
                {isDone ? (
                  <CheckCircle className="w-5 h-5 text-[#66BB6A] flex-shrink-0" />
                ) : (
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isCurrent ? 'text-[#66BB6A] animate-bounce' : 'text-[#607D8B] dark:text-[#B8C2CC]'}`} />
                )}
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">{step.label}</p>
                <p className="text-[10px] text-[#607D8B] dark:text-[#B8C2CC] mt-0.5">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
