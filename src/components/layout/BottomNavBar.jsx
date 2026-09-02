import React from 'react';
import { Home, Camera, Store, FileText } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function BottomNavBar({ activeTab, setActiveTab, lang }) {
  const t = SMART_I18N[lang] || SMART_I18N.en;

  const tabs = [
    { id: 'home', label: t.tabHome || 'Home', icon: Home },
    { id: 'check', label: t.tabCheck || 'Scan', icon: Camera },
    { id: 'market', label: t.tabMarket || 'Market', icon: Store },
    { id: 'reports', label: t.tabReports || 'Reports', icon: FileText }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#18212B]/95 backdrop-blur-lg border-t border-slate-200 dark:border-[#374151] shadow-2xl py-2 px-4 transition-colors">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all active:scale-95 ${
                isActive
                  ? 'bg-emerald-50 dark:bg-[#1F2933] text-emerald-700 dark:text-[#66BB6A] font-extrabold shadow-sm ring-1 ring-emerald-200 dark:ring-[#374151]'
                  : 'text-[#607D8B] dark:text-[#B8C2CC] hover:text-[#263238] dark:hover:text-[#F5F7FA]'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-[#66BB6A]' : 'text-[#607D8B] dark:text-[#B8C2CC]'}`} />
              <span className="text-[11px] font-extrabold leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
