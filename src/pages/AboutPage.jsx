import React from 'react';
import { Camera, Eye, Cpu, Layers, FileText, CheckCircle2, ShieldCheck, ArrowRight, Award, Sparkles } from 'lucide-react';

export default function AboutPage({ onStartAssessment }) {
  const steps = [
    {
      step: '01',
      title: 'Capture Sample Image',
      desc: 'Inspector captures or uploads a clear photo of the onion sample lot using mobile camera or desktop file drag & drop.',
      icon: Camera,
      color: 'bg-emerald-500 text-white'
    },
    {
      step: '02',
      title: 'AI Detects Individual Onions',
      desc: 'YOLOv11 neural network isolates every single onion bulb, creating precise 2D bounding boxes and center coordinates.',
      icon: Eye,
      color: 'bg-onion-600 text-white'
    },
    {
      step: '03',
      title: 'Analyze Defect & Size Caliper',
      desc: 'Computer vision algorithms evaluate surface texture, color histogram, neck rot, sprouting shoots, and pixel diameter in millimeters.',
      icon: Cpu,
      color: 'bg-purple-600 text-white'
    },
    {
      step: '04',
      title: 'Grade A, B & URS Calculation',
      desc: 'Multi-class classifier estimates exact percentage yield for Grade A (Export), Grade B (Standard), and URS (Reject).',
      icon: Layers,
      color: 'bg-amber-500 text-white'
    },
    {
      step: '05',
      title: 'Instant Digital Quality Report',
      desc: 'A verified digital quality certificate with APMC threshold verdict, confidence score, and PDF download button is generated.',
      icon: FileText,
      color: 'bg-blue-600 text-white'
    }
  ];

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <span className="px-3.5 py-1.5 rounded-full bg-onion-100 text-onion-800 font-extrabold text-xs uppercase tracking-wider border border-onion-200">
          5-Step Computer Vision Workflow
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          How OnionGrade AI Works
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          From photo capture to digital procurement certificates in under 3 seconds. Learn how our computer vision pipeline delivers objective grading.
        </p>
      </div>

      {/* 5-Step Process Timeline */}
      <div className="relative max-w-4xl mx-auto">
        
        {/* Connecting Vertical Line for Desktop */}
        <div className="hidden md:block absolute left-1/2 top-12 bottom-12 w-1 bg-gradient-to-b from-emerald-500 via-onion-600 to-blue-600 -translate-x-1/2 rounded-full"></div>

        <div className="space-y-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`flex flex-col md:flex-row items-center gap-6 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card */}
                <div className="w-full md:w-1/2 bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-3 transition-all hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                      STEP {item.step}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">YOLOv11 Vision Module</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Center Badge Icon */}
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center font-bold shadow-xl flex-shrink-0 z-10 ring-4 ring-white`}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* Empty Spacer */}
                <div className="hidden md:block w-1/2"></div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Technical Architecture Specs */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            System Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">Deep Learning & Computer Vision Stack</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h4 className="font-bold text-sm text-onion-300">Object Detection Framework</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Custom trained YOLOv11 deep learning model trained on multi-angle onion bulb datasets in varying illumination conditions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h4 className="font-bold text-sm text-emerald-300">Defect Segmentation</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Convolutional Neural Network (CNN) multi-head classification for detecting skin splits, neck soft rot, sprouting shoots, and mold.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h4 className="font-bold text-sm text-amber-300">Volumetric Caliper Sizing</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Elliptical contour fitting and pixel-to-millimeter conversion based on reference scale benchmarks for exact diameter estimation.
            </p>
          </div>

        </div>

        <div className="text-center pt-4">
          <button
            onClick={onStartAssessment}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-onion-700 to-onion-600 text-white font-extrabold text-sm shadow-xl hover:from-onion-800 transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Test The AI Vision System Now
          </button>
        </div>
      </div>

    </div>
  );
}
