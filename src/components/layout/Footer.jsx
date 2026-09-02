import React from 'react';
import { ShieldCheck, Cpu, Database, Award } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-white dark:bg-[#18212B] text-[#607D8B] dark:text-[#B8C2CC] pt-12 pb-24 sm:pb-12 border-t border-slate-200 dark:border-[#374151] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200 dark:border-[#374151]">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-[#263238] dark:text-[#F5F7FA] tracking-tight">
                AI Onion Quality Grading
              </span>
            </div>
            <p className="text-xs text-[#607D8B] dark:text-[#B8C2CC] leading-relaxed">
              Automated, objective computer vision grading system designed to eliminate subjective bias at agricultural procurement hubs, APMC mandis, and sorting centers.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-[#66BB6A] bg-emerald-50 dark:bg-[#1F2933] px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-[#374151] w-fit font-bold">
              <span className="w-2 h-2 rounded-full bg-[#66BB6A] animate-ping"></span>
              AI Vision Pipeline: Active (YOLO Enabled)
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-sm font-bold text-[#263238] dark:text-[#F5F7FA] uppercase tracking-wider mb-4">Product Platform</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button onClick={() => setActiveTab('check')} className="hover:text-[#66BB6A] transition-colors flex items-center gap-1.5">
                  Start Quality Scan
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-[#66BB6A] transition-colors flex items-center gap-1.5">
                  Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('reports')} className="hover:text-[#66BB6A] transition-colors flex items-center gap-1.5">
                  Digital Procurement Reports
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('storage')} className="hover:text-[#66BB6A] transition-colors flex items-center gap-1.5">
                  Storage Management Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Standard Grades */}
          <div>
            <h4 className="text-sm font-bold text-[#263238] dark:text-[#F5F7FA] uppercase tracking-wider mb-4">Grading Standards</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li className="flex items-center justify-between bg-[#F7F8FA] dark:bg-[#1F2933] p-2.5 rounded-xl border border-slate-200 dark:border-[#374151]">
                <span className="text-[#66BB6A] font-bold">Grade A</span>
                <span className="text-[#263238] dark:text-[#F5F7FA]">Commercial Export (&gt;65mm)</span>
              </li>
              <li className="flex items-center justify-between bg-[#F7F8FA] dark:bg-[#1F2933] p-2.5 rounded-xl border border-slate-200 dark:border-[#374151]">
                <span className="text-[#F59E0B] font-bold">Grade B</span>
                <span className="text-[#263238] dark:text-[#F5F7FA]">Domestic Standard (50-64mm)</span>
              </li>
              <li className="flex items-center justify-between bg-[#F7F8FA] dark:bg-[#1F2933] p-2.5 rounded-xl border border-slate-200 dark:border-[#374151]">
                <span className="text-[#EF5350] font-bold">URS (Reject)</span>
                <span className="text-[#263238] dark:text-[#F5F7FA]">Defective / Undersized (&lt;45mm)</span>
              </li>
            </ul>
          </div>

          {/* Tech Spec */}
          <div>
            <h4 className="text-sm font-bold text-[#263238] dark:text-[#F5F7FA] uppercase tracking-wider mb-4">AgriTech Architecture</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#263238] dark:text-[#F5F7FA]">
                <Cpu className="w-4 h-4 text-[#66BB6A]" />
                <span>Computer Vision: YOLO & CNN</span>
              </div>
              <div className="flex items-center gap-2 text-[#263238] dark:text-[#F5F7FA]">
                <Database className="w-4 h-4 text-[#66BB6A]" />
                <span>Dataset: Multi-spectral Onion Images</span>
              </div>
              <div className="flex items-center gap-2 text-[#263238] dark:text-[#F5F7FA]">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span>Format: ISO 22000 & AGMARK Standards</span>
              </div>
              <div className="flex items-center gap-2 text-[#263238] dark:text-[#F5F7FA]">
                <Award className="w-4 h-4 text-[#F59E0B]" />
                <span>Accuracy Target: 95%+ Target Precision</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#607D8B] dark:text-[#B8C2CC] gap-4">
          <p>© 2026 AI Onion Quality Grading. Built for Modern Agricultural Procurement & APMC Mandis.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-[#263238] dark:hover:text-[#F5F7FA] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#263238] dark:hover:text-[#F5F7FA] cursor-pointer">AGMARK Standards</span>
            <span className="hover:text-[#263238] dark:hover:text-[#F5F7FA] cursor-pointer">API Specs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
