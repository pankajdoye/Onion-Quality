import React from 'react';
import { 
  Warehouse, 
  Sun, 
  Wind, 
  Thermometer, 
  ShieldAlert, 
  CheckCircle2, 
  Layers, 
  Search, 
  Trash2, 
  AlertTriangle, 
  Ban, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function StorageGuide({ lang = 'en' }) {
  const t = SMART_I18N[lang] || SMART_I18N.en;

  const sections = [
    {
      id: 1,
      title: t.whenToStoreTitle,
      desc: t.whenToStoreDesc,
      icon: Sun,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50 border-amber-200 dark:bg-[#1F2933] dark:border-[#374151]"
    },
    {
      id: 2,
      title: t.curingTitle,
      desc: t.curingDesc,
      icon: Wind,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50 border-blue-200 dark:bg-[#1F2933] dark:border-[#374151]"
    },
    {
      id: 3,
      title: t.conditionsTitle,
      desc: t.conditionsDesc,
      icon: Thermometer,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50 border-emerald-200 dark:bg-[#1F2933] dark:border-[#374151]"
    },
    {
      id: 4,
      title: t.ventilationTitle,
      desc: t.ventilationDesc,
      icon: Warehouse,
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50 border-indigo-200 dark:bg-[#1F2933] dark:border-[#374151]"
    },
    {
      id: 5,
      title: t.moistureTitle,
      desc: t.moistureDesc,
      icon: ShieldAlert,
      color: "from-rose-500 to-red-600",
      bgColor: "bg-rose-50 border-rose-200 dark:bg-[#1F2933] dark:border-[#374151]"
    },
    {
      id: 6,
      title: t.rotPreventionTitle,
      desc: t.rotPreventionDesc,
      icon: ShieldCheck,
      color: "from-teal-500 to-emerald-600",
      bgColor: "bg-teal-50 border-teal-200 dark:bg-[#1F2933] dark:border-[#374151]"
    },
    {
      id: 7,
      title: t.arrangementTitle,
      desc: t.arrangementDesc,
      icon: Layers,
      color: "from-amber-600 to-orange-600",
      bgColor: "bg-amber-50 border-amber-200 dark:bg-[#1F2933] dark:border-[#374151]"
    },
    {
      id: 8,
      title: t.inspectionTitle,
      desc: t.inspectionDesc,
      icon: Search,
      color: "from-sky-500 to-blue-600",
      bgColor: "bg-sky-50 border-sky-200 dark:bg-[#1F2933] dark:border-[#374151]"
    },
    {
      id: 9,
      title: t.removingRottenTitle,
      desc: t.removingRottenDesc,
      icon: Trash2,
      color: "from-rose-600 to-red-700",
      bgColor: "bg-rose-50 border-rose-200 dark:bg-[#1F2933] dark:border-[#374151]"
    },
    {
      id: 10,
      title: t.noStoreSignsTitle,
      desc: t.noStoreSignsDesc,
      icon: AlertTriangle,
      color: "from-orange-500 to-amber-600",
      bgColor: "bg-orange-50 border-orange-200 dark:bg-[#1F2933] dark:border-[#374151]"
    },
    {
      id: 11,
      title: t.precautionsTitle,
      desc: t.precautionsDesc,
      icon: Ban,
      color: "from-slate-600 to-slate-700",
      bgColor: "bg-slate-50 border-slate-200 dark:bg-[#1F2933] dark:border-[#374151]"
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/30">
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold w-fit mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Practical Farmer Storage Manual</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {t.storageGuideTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed font-medium">
          {t.storageGuideSubtitle}
        </p>

        {/* Emphasized Golden Rule Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-400/40 text-amber-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0">
            ★
          </div>
          <div className="text-xs sm:text-sm font-black text-amber-100 tracking-wide">
            “{t.storageEmphasizedRule}”
          </div>
        </div>
      </div>

      {/* Grid of Storage Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {sections.map((item) => {
          const IconComponent = item.icon;
          return (
            <div 
              key={item.id}
              className={`rounded-2xl p-5 sm:p-6 border shadow-sm transition-all duration-200 hover:shadow-md ${item.bgColor}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md shrink-0`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-base text-[#263238] dark:text-[#F5F7FA] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#607D8B] dark:text-[#B8C2CC] leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Summary Checklist Card */}
      <div className="bg-white dark:bg-[#1F2933] border border-slate-200 dark:border-[#374151] rounded-3xl p-6 shadow-md space-y-4 transition-colors">
        <h3 className="font-extrabold text-lg text-[#263238] dark:text-[#F5F7FA] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#66BB6A]" />
          <span>Storage Inspection Checklist</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold text-[#263238] dark:text-[#F5F7FA]">
          <div className="p-3 rounded-xl bg-[#F7F8FA] dark:bg-[#202A35] border border-slate-200 dark:border-[#374151]">
            ✓ Check necks for softness
          </div>
          <div className="p-3 rounded-xl bg-[#F7F8FA] dark:bg-[#202A35] border border-slate-200 dark:border-[#374151]">
            ✓ Verify 3-4 inch layer depth
          </div>
          <div className="p-3 rounded-xl bg-[#F7F8FA] dark:bg-[#202A35] border border-slate-200 dark:border-[#374151]">
            ✓ Discard sprouting onions
          </div>
        </div>
      </div>

    </div>
  );
}
