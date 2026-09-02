import React, { useState } from 'react';
import { Package, Scale, Clock } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function StorageLossEstimator({ lang = 'en' }) {
  const t = SMART_I18N[lang] || SMART_I18N.en;
  const [quantity, setQuantity] = useState(100);
  const [months, setMonths] = useState(3);

  // Storage loss estimation formula (~2% weight loss per month due to respiration & shrinkage)
  const lossPct = Math.min(15, months * 2);
  const lossQuintals = Math.round((lossPct / 100) * quantity * 10) / 10;
  const remainingQuintals = Math.max(0, quantity - lossQuintals);

  const labels = {
    mr: {
      title: "साठवणूक वजन घट अंदाज",
      badge: "वजन घट कॅल्क्युलेटर",
      startQty: "सुरुवातीचे प्रमाण (क्विंटल):",
      duration: "साठवणुकीचा कालावधी (महिने):",
      opt1: "१ महिना (~२% घट)",
      opt2: "२ महिने (~४% घट)",
      opt3: "३ महिने (~६% घट)",
      opt4: "४ महिने (~८% घट)",
      opt5: "५ महिने (~१०% घट)",
      opt6: "६ महिने (~१२% घट)",
      startQtyLabel: "सुरुवातीचे प्रमाण",
      remLabel: "अंदाजे शिल्लक प्रमाण",
      lossLabel: "अंदाजे संभाव्य घट",
      qtnl: "क्विंटल"
    },
    hi: {
      title: "भंडारण वजन हानि अनुमान",
      badge: "वजन हानि कैलकुलेटर",
      startQty: "प्रारंभिक मात्रा (क्विंटल):",
      duration: "भंडारण अवधि (महीने):",
      opt1: "1 महीना (~2% हानि)",
      opt2: "2 महीने (~4% हानि)",
      opt3: "3 महीने (~6% हानि)",
      opt4: "4 महीने (~8% हानि)",
      opt5: "5 महीने (~10% हानि)",
      opt6: "6 महीने (~12% हानि)",
      startQtyLabel: "प्रारंभिक मात्रा",
      remLabel: "अनुमानित शेष मात्रा",
      lossLabel: "संभावित वजन हानि",
      qtnl: "क्विंटल"
    },
    en: {
      title: "Storage Weight Loss Estimator",
      badge: "Weight Reduction Estimator",
      startQty: "Starting Quantity (Quintals):",
      duration: "Storage Duration (Months):",
      opt1: "1 Month (~2% Loss)",
      opt2: "2 Months (~4% Loss)",
      opt3: "3 Months (~6% Loss)",
      opt4: "4 Months (~8% Loss)",
      opt5: "5 Months (~10% Loss)",
      opt6: "6 Months (~12% Loss)",
      startQtyLabel: "Starting Quantity",
      remLabel: "Estimated Remaining",
      lossLabel: "Potential Loss",
      qtnl: "qtnl"
    }
  };

  const l = labels[lang] || labels.en;

  return (
    <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-6 shadow-md space-y-5 transition-colors">
      
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#374151] pb-3">
        <h3 className="text-sm font-black text-[#263238] dark:text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
          <Package className="w-4 h-4 text-[#66BB6A]" />
          📦 {l.title}
        </h3>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-[#202A35] text-[#607D8B] dark:text-[#B8C2CC] border border-slate-200 dark:border-[#374151]">
          {l.badge}
        </span>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#263238] dark:text-[#F5F7FA] flex items-center gap-1">
            <Scale className="w-3.5 h-3.5 text-[#66BB6A]" /> {l.startQty}
          </label>
          <input
            type="number"
            min="10"
            max="5000"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#374151] font-extrabold text-sm text-[#263238] dark:text-[#F5F7FA] bg-[#F7F8FA] dark:bg-[#202A35] focus:outline-none focus:border-[#66BB6A]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-[#263238] dark:text-[#F5F7FA] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#F59E0B]" /> {l.duration}
          </label>
          <select
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#374151] font-extrabold text-sm text-[#263238] dark:text-[#F5F7FA] bg-[#F7F8FA] dark:bg-[#202A35] focus:outline-none focus:border-[#66BB6A]"
          >
            <option value={1}>{l.opt1}</option>
            <option value={2}>{l.opt2}</option>
            <option value={3}>{l.opt3}</option>
            <option value={4}>{l.opt4}</option>
            <option value={5}>{l.opt5}</option>
            <option value={6}>{l.opt6}</option>
          </select>
        </div>
      </div>

      {/* Output Stats */}
      <div className="p-4 rounded-2xl bg-slate-900 dark:bg-[#121820] text-white grid grid-cols-3 gap-3 text-center shadow-inner border border-slate-700 dark:border-[#374151]">
        <div>
          <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-[#B8C2CC] block">{l.startQtyLabel}</span>
          <span className="text-xl font-black text-white mt-1 block">{quantity} {l.qtnl}</span>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase text-[#66BB6A] block">{l.remLabel}</span>
          <span className="text-xl font-black text-[#66BB6A] mt-1 block">{remainingQuintals} {l.qtnl}</span>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase text-[#EF5350] block">{l.lossLabel}</span>
          <span className="text-xl font-black text-[#EF5350] mt-1 block">{lossQuintals} {l.qtnl} ({lossPct}%)</span>
        </div>
      </div>

    </div>
  );
}
