import React from 'react';
import { ShieldCheck, Cpu, Database, Award } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function Footer({ setActiveTab, lang = 'en' }) {
  const t = SMART_I18N[lang] || SMART_I18N.en;

  const labels = {
    mr: {
      brand: "स्मार्ट कांदा AI गुणवत्ता ग्रेडिंग",
      desc: "शेतकरी, कृषी उत्पन्न बाजार समित्या आणि खरेदी केंद्रांसाठी मानकीकृत संगणक दृष्टी गुणवत्ता ग्रेडिंग प्रणाली.",
      activePipeline: "AI व्हिजन प्रणाली: सक्रिय (YOLO सक्षम)",
      platform: "प्लॅटफॉर्म",
      startScan: "कांदा गुणवत्ता तपासणी",
      dashboard: "डॅशबोर्ड",
      reports: "डिजिटल गुणवत्ता अहवाल",
      storage: "साठवणूक मार्गदर्शक",
      standards: "ग्रेडिंग निकष",
      gradeA: "ग्रेड A",
      gradeADesc: "व्यावसायिक निर्यात (>६५mm)",
      gradeB: "ग्रेड B",
      gradeBDesc: "स्थानिक बाजारपेठ (५०-६४mm)",
      urs: "URS (कमी प्रत)",
      ursDesc: "दोषपूर्ण / लहान आकार (<४५mm)",
      archTitle: "कृषी तंत्रज्ञान प्रणाली",
      arch1: "संगणक दृष्टी: YOLO आणि CNN मॉडेल्स",
      arch2: "डेटासेट: बहु-वर्णक्रमीय कांदा प्रतिमा",
      arch3: "मानके: ISO २२००० व AGMARK मानके",
      arch4: "अचूकता: ९५%+ अचूकता उद्दिष्ट",
      copyright: "© २०२६ स्मार्ट कांदा AI. आधुनिक कृषी खरेदी आणि बाजार समित्यांसाठी विकसित.",
      privacy: "गोपनीयता धोरण",
      agmark: "AGMARK मानके",
      api: "API तपशील"
    },
    hi: {
      brand: "स्मार्ट प्याज AI गुणवत्ता ग्रेडिंग",
      desc: "किसानों, कृषि उपज मंडियों और खरीद केंद्रों के लिए मानकीकृत कंप्यूटर विज़न गुणवत्ता ग्रेडिंग प्रणाली।",
      activePipeline: "AI विज़न प्रणाली: सक्रिय (YOLO सक्षम)",
      platform: "प्लेटफ़ॉर्म",
      startScan: "प्याज गुणवत्ता जांच",
      dashboard: "डैशबोर्ड",
      reports: "डिजिटल गुणवत्ता रिपोर्ट",
      storage: "भंडारण गाइड",
      standards: "ग्रेडिंग मानक",
      gradeA: "ग्रेड A",
      gradeADesc: "व्यावसायिक निर्यात (>65mm)",
      gradeB: "ग्रेड B",
      gradeBDesc: "घरेलू मानक (50-64mm)",
      urs: "URS (कम गुणवत्ता)",
      ursDesc: "दोषपूर्ण / छोटा आकार (<45mm)",
      archTitle: "कृषि तकनीक प्रणाली",
      arch1: "कंप्यूटर विज़न: YOLO एवं CNN मॉडल्स",
      arch2: "डेटासेट: मल्टी-स्पेक्ट्रल प्याज छवियां",
      arch3: "मानक: ISO 22000 एवं AGMARK मानक",
      arch4: "सटीकता: 95%+ सटीकता लक्ष्य",
      copyright: "© 2026 स्मार्ट प्याज AI. आधुनिक कृषि खरीद एवं मंडियों के लिए निर्मित।",
      privacy: "गोपनीयता नीति",
      agmark: "AGMARK मानक",
      api: "API विवरण"
    },
    en: {
      brand: "AI Onion Quality Grading",
      desc: "Automated, objective computer vision grading system designed to eliminate subjective bias at agricultural procurement hubs, APMC mandis, and sorting centers.",
      activePipeline: "AI Vision Pipeline: Active (YOLO Enabled)",
      platform: "Product Platform",
      startScan: "Start Quality Scan",
      dashboard: "Dashboard",
      reports: "Digital Procurement Reports",
      storage: "Storage Management Guide",
      standards: "Grading Standards",
      gradeA: "Grade A",
      gradeADesc: "Commercial Export (>65mm)",
      gradeB: "Grade B",
      gradeBDesc: "Domestic Standard (50-64mm)",
      urs: "URS (Reject)",
      ursDesc: "Defective / Undersized (<45mm)",
      archTitle: "AgriTech Architecture",
      arch1: "Computer Vision: YOLO & CNN",
      arch2: "Dataset: Multi-spectral Onion Images",
      arch3: "Format: ISO 22000 & AGMARK Standards",
      arch4: "Accuracy Target: 95%+ Target Precision",
      copyright: "© 2026 AI Onion Quality Grading. Built for Modern Agricultural Procurement & APMC Mandis.",
      privacy: "Privacy Policy",
      agmark: "AGMARK Standards",
      api: "API Specs"
    }
  };

  const l = labels[lang] || labels.en;

  return (
    <footer className="bg-white dark:bg-[#18212B] text-[#607D8B] dark:text-[#B8C2CC] pt-12 pb-24 sm:pb-12 border-t border-slate-200 dark:border-[#374151] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200 dark:border-[#374151]">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-[#263238] dark:text-[#F5F7FA] tracking-tight">
                {l.brand}
              </span>
            </div>
            <p className="text-xs text-[#607D8B] dark:text-[#B8C2CC] leading-relaxed">
              {l.desc}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-[#66BB6A] bg-emerald-50 dark:bg-[#1F2933] px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-[#374151] w-fit font-bold">
              <span className="w-2 h-2 rounded-full bg-[#66BB6A] animate-ping"></span>
              {l.activePipeline}
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-sm font-bold text-[#263238] dark:text-[#F5F7FA] uppercase tracking-wider mb-4">{l.platform}</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button onClick={() => setActiveTab('check')} className="hover:text-[#66BB6A] transition-colors flex items-center gap-1.5">
                  {l.startScan}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-[#66BB6A] transition-colors flex items-center gap-1.5">
                  {l.dashboard}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('reports')} className="hover:text-[#66BB6A] transition-colors flex items-center gap-1.5">
                  {l.reports}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('storage')} className="hover:text-[#66BB6A] transition-colors flex items-center gap-1.5">
                  {l.storage}
                </button>
              </li>
            </ul>
          </div>

          {/* Standard Grades */}
          <div>
            <h4 className="text-sm font-bold text-[#263238] dark:text-[#F5F7FA] uppercase tracking-wider mb-4">{l.standards}</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li className="flex items-center justify-between bg-[#F7F8FA] dark:bg-[#1F2933] p-2.5 rounded-xl border border-slate-200 dark:border-[#374151]">
                <span className="text-[#66BB6A] font-bold">{l.gradeA}</span>
                <span className="text-[#263238] dark:text-[#F5F7FA]">{l.gradeADesc}</span>
              </li>
              <li className="flex items-center justify-between bg-[#F7F8FA] dark:bg-[#1F2933] p-2.5 rounded-xl border border-slate-200 dark:border-[#374151]">
                <span className="text-[#F59E0B] font-bold">{l.gradeB}</span>
                <span className="text-[#263238] dark:text-[#F5F7FA]">{l.gradeBDesc}</span>
              </li>
              <li className="flex items-center justify-between bg-[#F7F8FA] dark:bg-[#1F2933] p-2.5 rounded-xl border border-slate-200 dark:border-[#374151]">
                <span className="text-[#EF5350] font-bold">{l.urs}</span>
                <span className="text-[#263238] dark:text-[#F5F7FA]">{l.ursDesc}</span>
              </li>
            </ul>
          </div>

          {/* Tech Spec */}
          <div>
            <h4 className="text-sm font-bold text-[#263238] dark:text-[#F5F7FA] uppercase tracking-wider mb-4">{l.archTitle}</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#263238] dark:text-[#F5F7FA]">
                <Cpu className="w-4 h-4 text-[#66BB6A]" />
                <span>{l.arch1}</span>
              </div>
              <div className="flex items-center gap-2 text-[#263238] dark:text-[#F5F7FA]">
                <Database className="w-4 h-4 text-[#66BB6A]" />
                <span>{l.arch2}</span>
              </div>
              <div className="flex items-center gap-2 text-[#263238] dark:text-[#F5F7FA]">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span>{l.arch3}</span>
              </div>
              <div className="flex items-center gap-2 text-[#263238] dark:text-[#F5F7FA]">
                <Award className="w-4 h-4 text-[#F59E0B]" />
                <span>{l.arch4}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#607D8B] dark:text-[#B8C2CC] gap-4">
          <p>{l.copyright}</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-[#263238] dark:hover:text-[#F5F7FA] cursor-pointer">{l.privacy}</span>
            <span className="hover:text-[#263238] dark:hover:text-[#F5F7FA] cursor-pointer">{l.agmark}</span>
            <span className="hover:text-[#263238] dark:hover:text-[#F5F7FA] cursor-pointer">{l.api}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
