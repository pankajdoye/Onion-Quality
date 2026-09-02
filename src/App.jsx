import React, { useState, useEffect } from 'react';
import SmartHeader from './components/layout/SmartHeader';
import BottomNavBar from './components/layout/BottomNavBar';
import SmartHomePage from './pages/SmartHomePage';
import SmartCheckPage from './pages/SmartCheckPage';
import SmartMarketPage from './pages/SmartMarketPage';
import SmartReportsPage from './pages/SmartReportsPage';
import StorageGuide from './components/farmer/StorageGuide';
import ModelPerformancePage from './pages/ModelPerformancePage';
import Footer from './components/layout/Footer';
import { getInitialTheme, applyTheme } from './utils/theme';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'check', 'market', 'reports', 'storage', 'history', 'help'
  
  // Persist language in localStorage (default: English)
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lang') || 'en';
    }
    return 'en';
  });

  // Persist theme in localStorage
  const [theme, setTheme] = useState(() => getInitialTheme());
  const [mode, setMode] = useState('farmer');

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] dark:bg-[#121820] text-[#263238] dark:text-[#F5F7FA] selection:bg-[#66BB6A] selection:text-white font-sans transition-colors duration-200">
      
      {/* Top Header with Hamburger Icon (☰), Title, Light/Dark, Language Selector */}
      <SmartHeader
        lang={lang}
        setLang={setLang}
        mode={mode}
        setMode={setMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
        isOnline={navigator.onLine !== false}
      />

      {/* Main Viewport */}
      <main className="flex-grow pt-4">
        {mode === 'admin' ? (
          <ModelPerformancePage />
        ) : (
          <>
            {activeTab === 'home' && (
              <SmartHomePage setActiveTab={setActiveTab} lang={lang} />
            )}

            {activeTab === 'check' && (
              <SmartCheckPage lang={lang} />
            )}

            {activeTab === 'market' && (
              <SmartMarketPage lang={lang} />
            )}

            {(activeTab === 'reports' || activeTab === 'history') && (
              <SmartReportsPage lang={lang} />
            )}

            {activeTab === 'storage' && (
              <StorageGuide lang={lang} />
            )}

            {activeTab === 'help' && (
              <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-[#1F2933] rounded-3xl shadow-md border border-slate-200 dark:border-[#374151] space-y-4">
                <h2 className="text-2xl font-black text-[#263238] dark:text-[#F5F7FA]">
                  {lang === 'mr' ? 'मदत आणि सपोर्ट' : lang === 'hi' ? 'सहायता एवं सपोर्ट' : 'Help & Support'}
                </h2>
                <p className="text-sm text-[#607D8B] dark:text-[#B8C2CC] leading-relaxed font-medium">
                  {lang === 'mr'
                    ? 'कांदा गुणवत्ता तपासणी, कॅमेरा फोटो, साठवणूक मार्गदर्शक किंवा बाजार समिती भावाबाबत कोणत्याही मदतीसाठी आमच्या शेतकरी सहाय्य कक्षाशी संपर्क साधा.'
                    : lang === 'hi'
                    ? 'प्याज गुणवत्ता जांच, कैमरा फोटो, भंडारण सलाह या मंडी भाव से संबंधित किसी भी सहायता के लिए हमारे किसान सहायता केंद्र से संपर्क करें।'
                    : 'Welcome to AI Onion Quality Grading Support. For assistance with camera image capture, quality grading standards, or APMC mandi price estimation, please contact our agricultural support desk.'}
                </p>
                <div className="p-4 bg-emerald-50 dark:bg-[#18212B] rounded-2xl border border-emerald-200 dark:border-[#374151] text-xs font-bold text-emerald-900 dark:text-[#66BB6A]">
                  {lang === 'mr' 
                    ? '📞 टोल-फ्री किसान सपोर्ट हेल्पलाइन: १८००-१२३-ONION (६६४६६)'
                    : lang === 'hi'
                    ? '📞 टोल-फ्री किसान सहायता हेल्पलाइन: 1800-123-ONION (66466)'
                    : '📞 Toll-Free Kisan Support Hotline: 1800-123-ONION (66466)'}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} lang={lang} />

      {/* Bottom Navigation Bar */}
      {mode === 'farmer' && (
        <BottomNavBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          lang={lang}
        />
      )}

    </div>
  );
}
