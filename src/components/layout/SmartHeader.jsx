import React, { useState } from 'react';
import { Menu, Sun, Moon, WifiOff } from 'lucide-react';
import Sidebar from './Sidebar';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function SmartHeader({ lang = 'en', setLang, mode, setMode, activeTab, setActiveTab, theme, setTheme, isOnline = true }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const t = SMART_I18N[lang] || SMART_I18N.en;

  const labels = {
    mr: {
      menu: "मेनू",
      title: "स्मार्ट कांदा AI ग्रेडिंग",
      offline: "ऑफलाइन",
      light: "लाइट",
      dark: "डार्क"
    },
    hi: {
      menu: "मेनू",
      title: "स्मार्ट प्याज AI ग्रेडिंग",
      offline: "ऑफलाइन",
      light: "लाइट",
      dark: "डार्क"
    },
    en: {
      menu: "Menu",
      title: "AI Onion Quality Grading",
      offline: "Offline",
      light: "Light",
      dark: "Dark"
    }
  };

  const l = labels[lang] || labels.en;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-[#18212B] border-b border-slate-200 dark:border-[#374151] shadow-sm transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-2">
          
          {/* Left: ☰ Menu + Title */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#202A35] hover:bg-slate-200 dark:hover:bg-[#2c3847] text-[#263238] dark:text-[#F5F7FA] font-bold text-xs border border-slate-200 dark:border-[#374151] transition-all active:scale-95 shrink-0"
              title={l.menu}
              aria-label={l.menu}
            >
              <Menu className="w-4 h-4" />
              <span className="font-bold">{l.menu}</span>
            </button>

            {/* Clean minimal title */}
            <div 
              className="cursor-pointer" 
              onClick={() => setActiveTab('home')}
            >
              <h1 className="font-black text-sm sm:text-base md:text-lg text-[#263238] dark:text-[#F5F7FA] tracking-tight leading-none whitespace-nowrap">
                {l.title}
              </h1>
              {!isOnline && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 border border-rose-300 ml-2">
                  <WifiOff className="w-2.5 h-2.5" /> {l.offline}
                </span>
              )}
            </div>
          </div>

          {/* Right: Light/Dark Theme Control + Language Selector */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Useful Light / Dark Control */}
            <div className="flex items-center bg-slate-100 dark:bg-[#202A35] p-0.5 sm:p-1 rounded-xl border border-slate-200 dark:border-[#374151] text-xs font-bold">
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${
                  theme === 'light'
                    ? 'bg-white text-[#263238] shadow-sm font-black ring-1 ring-slate-200'
                    : 'text-[#607D8B] dark:text-[#B8C2CC] hover:text-[#263238] dark:hover:text-[#F5F7FA]'
                }`}
                title="Light Mode"
                aria-label="Light Mode"
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden md:inline">{l.light}</span>
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${
                  theme === 'dark'
                    ? 'bg-[#121820] text-[#F5F7FA] shadow-sm font-black ring-1 ring-[#374151]'
                    : 'text-[#607D8B] dark:text-[#B8C2CC] hover:text-[#263238] dark:hover:text-[#F5F7FA]'
                }`}
                title="Dark Mode"
                aria-label="Dark Mode"
              >
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden md:inline">{l.dark}</span>
              </button>
            </div>

            {/* Language Selector: English | हिंदी | मराठी */}
            <div className="flex items-center bg-slate-100 dark:bg-[#202A35] p-0.5 sm:p-1 rounded-xl border border-slate-200 dark:border-[#374151] text-xs font-bold">
              <button
                onClick={() => setLang('en')}
                className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all ${
                  lang === 'en' 
                    ? 'bg-[#263238] dark:bg-[#66BB6A] text-white shadow-sm font-black' 
                    : 'text-[#607D8B] dark:text-[#B8C2CC] hover:text-[#263238] dark:hover:text-[#F5F7FA]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all ${
                  lang === 'hi' 
                    ? 'bg-amber-600 text-white shadow-sm font-black' 
                    : 'text-[#607D8B] dark:text-[#B8C2CC] hover:text-[#263238] dark:hover:text-[#F5F7FA]'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLang('mr')}
                className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all ${
                  lang === 'mr' 
                    ? 'bg-[#66BB6A] text-white shadow-sm font-black' 
                    : 'text-[#607D8B] dark:text-[#B8C2CC] hover:text-[#263238] dark:hover:text-[#F5F7FA]'
                }`}
              >
                मराठी
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* Left Drawer Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
      />
    </>
  );
}
