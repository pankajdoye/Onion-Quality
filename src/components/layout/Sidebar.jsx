import React from 'react';
import { 
  X, 
  Home, 
  Camera, 
  History, 
  FileText, 
  Store, 
  Warehouse, 
  HelpCircle, 
  Moon, 
  Sun,
  ChevronRight
} from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function Sidebar({ isOpen, onClose, activeTab, setActiveTab, lang = 'en', setLang, theme, setTheme }) {
  const t = SMART_I18N[lang] || SMART_I18N.en;

  if (!isOpen) return null;

  const labels = {
    mr: {
      title: "स्मार्ट कांदा AI",
      subtitle: "मानकीकृत गुणवत्ता प्रणाली",
      navHome: "डॅशबोर्ड",
      navCheck: "कांदा स्कॅन / अपलोड",
      navHistory: "मागील अहवाल / इतिहास",
      navReports: "गुणवत्ता रिपोर्ट",
      navMarket: "बाजारभाव",
      navStorage: "साठवणूक मार्गदर्शक",
      navHelp: "मदत आणि सपोर्ट",
      langTitle: "भाषा निवडा",
      themeTitle: "रंग थीम",
      light: "लाइट",
      dark: "डार्क"
    },
    hi: {
      title: "स्मार्ट प्याज AI",
      subtitle: "मानकीकृत गुणवत्ता प्रणाली",
      navHome: "डैशबोर्ड",
      navCheck: "प्याज स्कैन / अपलोड",
      navHistory: "पिछली रिपोर्ट / इतिहास",
      navReports: "गुणवत्ता रिपोर्ट",
      navMarket: "मंडी भाव",
      navStorage: "भंडारण गाइड",
      navHelp: "सहायता एवं सपोर्ट",
      langTitle: "भाषा चुनें",
      themeTitle: "रंग थीम",
      light: "लाइट",
      dark: "डार्क"
    },
    en: {
      title: "AI Onion Quality Grading",
      subtitle: "Standardized Vision System",
      navHome: "Dashboard",
      navCheck: "Scan / Upload",
      navHistory: "History",
      navReports: "Quality Reports",
      navMarket: "Market Rates",
      navStorage: "Storage Guide",
      navHelp: "Help & Support",
      langTitle: "Language",
      themeTitle: "Appearance Theme",
      light: "Light",
      dark: "Dark"
    }
  };

  const l = labels[lang] || labels.en;

  const navItems = [
    { id: 'home', label: l.navHome, icon: Home },
    { id: 'check', label: l.navCheck, icon: Camera },
    { id: 'history', label: l.navHistory, icon: History },
    { id: 'reports', label: l.navReports, icon: FileText },
    { id: 'market', label: l.navMarket, icon: Store },
    { id: 'storage', label: l.navStorage, icon: Warehouse },
    { id: 'help', label: l.navHelp, icon: HelpCircle }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Semi-transparent Backdrop Overlay */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose} 
      />

      {/* Drawer Panel */}
      <div className="relative w-80 max-w-[85vw] bg-white dark:bg-[#1F2933] h-full shadow-2xl flex flex-col justify-between z-10 border-r border-slate-200 dark:border-[#374151] animate-in slide-in-from-left duration-300 transition-colors">
        
        {/* Top Header & Navigation */}
        <div>
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-[#374151] flex items-center justify-between bg-[#F7F8FA] dark:bg-[#18212B]">
            <div>
              <h2 className="font-extrabold text-base text-[#263238] dark:text-[#F5F7FA] leading-tight">
                {l.title}
              </h2>
              <p className="text-[11px] text-[#607D8B] dark:text-[#B8C2CC] font-medium mt-0.5">
                {l.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#607D8B] hover:text-[#263238] dark:text-[#B8C2CC] dark:hover:text-[#F5F7FA] bg-slate-200/70 dark:bg-[#202A35] transition-all"
              title="Close Menu"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl font-bold text-xs transition-all ${
                    isActive 
                      ? 'bg-[#66BB6A] text-white shadow-sm font-extrabold'
                      : 'text-[#263238] dark:text-[#F5F7FA] hover:bg-slate-100 dark:hover:bg-[#202A35]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#66BB6A]'}`} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 opacity-70 ${isActive ? 'text-white' : 'text-[#607D8B] dark:text-[#B8C2CC]'}`} />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer: Language & Theme Switches at Bottom */}
        <div className="p-4 border-t border-slate-200 dark:border-[#374151] bg-[#F7F8FA] dark:bg-[#18212B] space-y-3">
          
          {/* Language Selector */}
          <div>
            <div className="text-[10px] font-extrabold text-[#607D8B] dark:text-[#B8C2CC] mb-1.5 uppercase tracking-wider px-1">
              {l.langTitle}
            </div>
            <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-slate-200 dark:bg-[#202A35] border border-slate-300 dark:border-[#374151] text-xs font-bold">
              <button
                onClick={() => setLang('en')}
                className={`py-1.5 rounded-xl transition-all ${
                  lang === 'en'
                    ? 'bg-[#263238] dark:bg-[#66BB6A] text-white shadow-sm font-black'
                    : 'text-[#607D8B] dark:text-[#B8C2CC] hover:text-[#263238] dark:hover:text-[#F5F7FA]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`py-1.5 rounded-xl transition-all ${
                  lang === 'hi'
                    ? 'bg-amber-600 text-white shadow-sm font-black'
                    : 'text-[#607D8B] dark:text-[#B8C2CC] hover:text-[#263238] dark:hover:text-[#F5F7FA]'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLang('mr')}
                className={`py-1.5 rounded-xl transition-all ${
                  lang === 'mr'
                    ? 'bg-[#66BB6A] text-white shadow-sm font-black'
                    : 'text-[#607D8B] dark:text-[#B8C2CC] hover:text-[#263238] dark:hover:text-[#F5F7FA]'
                }`}
              >
                मराठी
              </button>
            </div>
          </div>

          {/* Theme Selector */}
          <div>
            <div className="text-[10px] font-extrabold text-[#607D8B] dark:text-[#B8C2CC] mb-1.5 uppercase tracking-wider px-1">
              {l.themeTitle}
            </div>
            <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-slate-200 dark:bg-[#202A35] border border-slate-300 dark:border-[#374151]">
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-black transition-all ${
                  theme === 'light'
                    ? 'bg-white text-[#263238] shadow-sm ring-1 ring-slate-300'
                    : 'text-[#607D8B] dark:text-[#B8C2CC] hover:text-[#263238] dark:hover:text-[#F5F7FA]'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>{l.light}</span>
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-black transition-all ${
                  theme === 'dark'
                    ? 'bg-[#121820] text-[#F5F7FA] shadow-sm ring-1 ring-[#374151]'
                    : 'text-[#607D8B] dark:text-[#B8C2CC] hover:text-[#263238] dark:hover:text-[#F5F7FA]'
                }`}
              >
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>{l.dark}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
