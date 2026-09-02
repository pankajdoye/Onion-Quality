import React, { useState } from 'react';
import { Sparkles, Menu, X, BarChart3, UploadCloud, FileText, Info, Home, Cpu, TrendingUp } from 'lucide-react';
import { TRANSLATIONS } from '../../utils/i18n';

export default function Navbar({ activeTab, setActiveTab, mode, setMode, lang, setLang }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const navItems = mode === 'farmer' ? [
    { id: 'farmer-home', label: 'Check Onion Quality', icon: UploadCloud },
    { id: 'market-trends', label: 'Market Trends & Prices', icon: TrendingUp },
    { id: 'about', label: 'How It Works', icon: Info },
  ] : [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'assessment', label: 'Quality Assessment', icon: UploadCloud },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'market-trends', label: 'Market Trends', icon: TrendingUp },
    { id: 'model-performance', label: 'AI Model Performance', icon: Cpu },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick(mode === 'farmer' ? 'farmer-home' : 'home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-onion-700 via-onion-600 to-onion-500 flex items-center justify-center text-white text-xl shadow-md shadow-onion-500/20">
              🧅
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  OnionGrade<span className="text-onion-600">AI</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-onion-100 text-onion-700 rounded-full border border-onion-200">
                  {mode === 'farmer' ? 'Farmer Decision App' : 'v1.1 PRO'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">AI Assessment & Mandi Rate Support</p>
            </div>
          </div>

          {/* Mode Switcher + Language Selector */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => {
                setMode('farmer');
                setActiveTab('farmer-home');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                mode === 'farmer'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🌾 {t.farmerMode}
            </button>
            <button
              onClick={() => {
                setMode('expert');
                setActiveTab('dashboard');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                mode === 'expert'
                  ? 'bg-slate-900 text-white shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📊 {t.expertMode}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-onion-50 text-onion-700 border border-onion-200 shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-onion-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Selector */}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:border-onion-600"
            >
              <option value="en">🇮🇳 EN</option>
              <option value="mr">🇮🇳 मराठी</option>
              <option value="hi">🇮🇳 हिंदी</option>
            </select>

            <button
              onClick={() => handleNavClick(mode === 'farmer' ? 'farmer-home' : 'assessment')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-onion-700 to-onion-600 text-white font-bold text-xs shadow-md shadow-onion-700/25 hover:from-onion-800 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              Check Quality
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          
          {/* Mobile Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold mb-3">
            <button
              onClick={() => {
                setMode('farmer');
                setActiveTab('farmer-home');
              }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mode === 'farmer' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-700'
              }`}
            >
              🌾 Farmer Mode
            </button>
            <button
              onClick={() => {
                setMode('expert');
                setActiveTab('dashboard');
              }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mode === 'expert' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700'
              }`}
            >
              📊 Expert Mode
            </button>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-onion-100 text-onion-800 border border-onion-200 font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-onion-600' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
