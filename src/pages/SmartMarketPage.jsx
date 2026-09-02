import React, { useState } from 'react';
import TodaysMarketPrice from '../components/farmer/TodaysMarketPrice';
import BestMarketFinder from '../components/farmer/BestMarketFinder';
import WhenToSellCard from '../components/farmer/WhenToSellCard';
import LastYearVsThisYear from '../components/farmer/LastYearVsThisYear';
import PriceAlertModal from '../components/farmer/PriceAlertModal';
import { SMART_I18N } from '../utils/i18n_smart';
import { Store, Bell } from 'lucide-react';

export default function SmartMarketPage({ lang = 'en' }) {
  const t = SMART_I18N[lang] || SMART_I18N.en;
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 pb-20">
      
      {/* Top Header */}
      <div className="bg-white dark:bg-[#1F2933] border border-slate-200 dark:border-[#374151] rounded-3xl p-5 shadow-sm flex items-center justify-between transition-colors">
        <div>
          <h2 className="text-xl font-black text-[#263238] dark:text-[#F5F7FA]">{t.tabMarket || "Market Rates"}</h2>
          <p className="text-xs text-[#607D8B] dark:text-[#B8C2CC] font-medium">Daily Official APMC Rates & Decision Support</p>
        </div>

        <button
          onClick={() => setIsAlertModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#F59E0B] hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-sm transition-all active:scale-95"
        >
          <Bell className="w-4 h-4" />
          <span>Set Price Alert</span>
        </button>
      </div>

      {/* Today's Market Rates */}
      <TodaysMarketPrice lang={lang} />

      {/* Best Market Net Transport Comparison */}
      <BestMarketFinder lang={lang} />

      {/* When to Sell Recommendation & Graph */}
      <WhenToSellCard lang={lang} />

      {/* Last Year vs This Year Comparison */}
      <LastYearVsThisYear lang={lang} />

      {/* Price Alert Modal */}
      <PriceAlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        lang={lang}
      />

    </div>
  );
}
