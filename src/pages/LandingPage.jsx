import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Layers, FileText, CheckCircle2, Award, Eye } from 'lucide-react';
import { PRESET_SAMPLES } from '../data/presetImages';

export default function LandingPage({ onStartAssessment, onViewDemoReport }) {
  const samplePreset = PRESET_SAMPLES[2]; // Market sample

  return (
    <div className="space-y-16 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-purple-50/60 via-white to-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Trust Badge Header */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-onion-100/80 border border-onion-200 text-onion-800 text-xs font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                <span>Next-Gen AgriTech Computer Vision Platform</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                AI-Powered Onion <br />
                <span className="bg-gradient-to-r from-onion-700 via-onion-600 to-purple-600 bg-clip-text text-transparent">
                  Quality Assessment & Grading
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
                “Automated, transparent and consistent onion grading using computer vision and artificial intelligence.”
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onStartAssessment}
                  className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-onion-700 via-onion-600 to-onion-500 hover:from-onion-800 hover:to-onion-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-onion-700/30 hover:shadow-2xl hover:shadow-onion-700/40 transition-all transform hover:-translate-y-0.5 active:scale-95"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Start Quality Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onViewDemoReport}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-300 shadow-sm transition-all"
                >
                  <FileText className="w-5 h-5 text-onion-600" />
                  <span>View Demo Report</span>
                </button>
              </div>

              {/* Small Trust Indicators */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-slate-600">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> AI Vision</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant Analysis</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Transparent Grading</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Digital Reports</span>
              </div>

            </div>

            {/* Right Interactive AI Vision Visual Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden border-2 border-slate-800 bg-slate-950 shadow-2xl group">
                
                {/* Image */}
                <img
                  src={samplePreset.image}
                  alt="Onion Quality Vision Detection"
                  className="w-full h-80 sm:h-96 object-cover opacity-80 brightness-95"
                />

                {/* Laser Scanning Bar */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_20px_#f59e0b] animate-scanner"></div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#be2b6d_1px,transparent_1px)] [background-size:18px_18px] opacity-30 pointer-events-none"></div>

                {/* Simulated Bounding Boxes on Hero Image */}
                <div className="absolute top-[20%] left-[15%] w-[24%] h-[30%] border-2 border-emerald-400 bg-emerald-500/20 rounded-lg flex items-start p-1 shadow-lg">
                  <span className="bg-emerald-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
                    Grade A (98%)
                  </span>
                </div>

                <div className="absolute top-[52%] left-[45%] w-[25%] h-[32%] border-2 border-rose-500 bg-rose-500/25 rounded-lg flex items-start p-1 shadow-lg">
                  <span className="bg-rose-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
                    Rotten (93%)
                  </span>
                </div>

                <div className="absolute top-[18%] right-[15%] w-[22%] h-[28%] border-2 border-purple-500 bg-purple-500/20 rounded-lg flex items-start p-1 shadow-lg">
                  <span className="bg-purple-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
                    Sprouted (91%)
                  </span>
                </div>

                {/* Live HUD overlay badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700/80 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Live Vision Inference</span>
                    <span className="text-xs font-bold text-emerald-400">Score: 87/100 • Grade A 72%</span>
                  </div>
                  <span className="text-[10px] font-mono bg-onion-600 px-2 py-1 rounded text-white font-bold">
                    YOLOv11 ONION
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-onion-700">95%+</div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Target Accuracy</div>
            <p className="text-[11px] text-slate-500">Computer vision precision</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600">4</div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Defect Categories</div>
            <p className="text-[11px] text-slate-500">Damaged, Rotten, Sprouted, Small</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-purple-600">&lt; 3 Sec</div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Instant Report</div>
            <p className="text-[11px] text-slate-500">Digital certificate export</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600">100%</div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Reduced Bias</div>
            <p className="text-[11px] text-slate-500">Objective mandi pricing</p>
          </div>

        </div>
      </section>

      {/* WHY ONIONGRADE AI (PROCUREMENT IMPACT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-onion-950 rounded-3xl text-white p-8 sm:p-12 shadow-2xl space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
              Procurement & Mandi Innovation
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Eliminating Subjective Grading at Agricultural Mandis
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Traditional onion procurement relies on visual estimation, leading to price disputes, unfair farmer payouts, and inconsistent quality for bulk traders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                🌾
              </div>
              <h3 className="font-bold text-base text-white">Fair Pricing for Farmers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Objective Grade A percentage guarantees farmers receive premium prices for high-quality crops without manual deduction bias.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                ⚡
              </div>
              <h3 className="font-bold text-base text-white">Rapid Batch Clearance</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Analyze 200+ onions per photo sample in seconds, accelerating truck unloading times at APMC hubs.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                📜
              </div>
              <h3 className="font-bold text-base text-white">Tamper-Proof Digital Trail</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every procurement lot receives an instant PDF quality certificate stored with timestamp, center ID, and confidence score.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-onion-100 via-purple-100 to-amber-50 rounded-3xl p-8 sm:p-12 border border-onion-200 shadow-lg space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Ready to Experience AI Quality Assessment?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Test custom onion photos or try preloaded mandi presets to view real-time bounding box detection, caliper sizing, and printable PDF reports.
          </p>
          <button
            onClick={onStartAssessment}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-onion-700 to-onion-600 text-white font-extrabold text-base shadow-xl hover:from-onion-800 hover:to-onion-700 transition-all"
          >
            Launch Quality Assessment &rarr;
          </button>
        </div>
      </section>

    </div>
  );
}
