import React, { useState } from 'react';
import { Calculator, Scale, Truck, Tag } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function ProfitCalculator({ expectedPricePerQuintal = 2600, lang = 'en' }) {
  const t = SMART_I18N[lang] || SMART_I18N.en;

  const [quantity, setQuantity] = useState(20);
  const [transportCost, setTransportCost] = useState(5000);
  const [otherExpenses, setOtherExpenses] = useState(2000);

  const expectedSellingPrice = quantity * expectedPricePerQuintal;
  const totalExpenses = Number(transportCost) + Number(otherExpenses);
  const estimatedNetAmount = Math.max(0, expectedSellingPrice - totalExpenses);
  const netPerQuintal = quantity > 0 ? Math.round(estimatedNetAmount / quantity) : 0;

  const labels = {
    mr: {
      title: "निव्वळ नफा अंदाज कॅल्क्युलेटर",
      rateNotice: "भाव: ₹",
      perQtnl: "/क्विंटल",
      quantity: "एकूण प्रमाण (क्विंटल):",
      transport: "वाहतूक खर्च (₹):",
      other: "मंडी हमाली / तोलाई / इतर खर्च (₹):",
      gross: "एकूण उत्पन्न (विक्री)",
      transportShort: "वाहतूक",
      otherShort: "इतर खर्च",
      totalExp: "एकूण खर्च",
      netTotal: "निव्वळ हाती येणारी रक्कम",
      netPerQtnl: "निव्वळ प्रति क्विंटल प्राप्ती"
    },
    hi: {
      title: "शुद्ध मुनाफा अनुमान कैलकुलेटर",
      rateNotice: "भाव: ₹",
      perQtnl: "/क्विंटल",
      quantity: "कुल मात्रा (क्विंटल):",
      transport: "परिवहन खर्च (₹):",
      other: "मंडी शुल्क / पल्लेदारी खर्च (₹):",
      gross: "सकल आय (बिक्री)",
      transportShort: "परिवहन",
      otherShort: "अन्य खर्च",
      totalExp: "कुल खर्च",
      netTotal: "शुद्ध प्राप्त होने वाली राशि",
      netPerQtnl: "शुद्ध प्रति क्विंटल आय"
    },
    en: {
      title: "Net Profit Estimator",
      rateNotice: "Rate: ₹",
      perQtnl: "/qtnl",
      quantity: "Quantity (Quintals):",
      transport: "Transport Expense (₹):",
      other: "Mandi / Labor / Other Fees (₹):",
      gross: "Gross Revenue",
      transportShort: "Transport",
      otherShort: "Other Expenses",
      totalExp: "Total Expenses",
      netTotal: "Net Estimated Amount",
      netPerQtnl: "Net / Qtnl"
    }
  };

  const l = labels[lang] || labels.en;

  return (
    <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-6 shadow-md space-y-6 transition-colors">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#374151] pb-3">
        <h3 className="text-sm font-extrabold text-[#263238] dark:text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
          <Calculator className="w-4 h-4 text-[#66BB6A]" />
          {l.title}
        </h3>
        <span className="text-xs text-[#607D8B] dark:text-[#B8C2CC] font-semibold">{l.rateNotice}{expectedPricePerQuintal.toLocaleString()}{l.perQtnl}</span>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Quantity */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#263238] dark:text-[#F5F7FA] flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-[#66BB6A]" />
            {l.quantity}
          </label>
          <input
            type="number"
            min="1"
            max="1000"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#374151] text-sm font-bold text-[#263238] dark:text-[#F5F7FA] focus:outline-none focus:border-[#66BB6A] bg-[#F7F8FA] dark:bg-[#202A35]"
          />
        </div>

        {/* Transport Cost */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#263238] dark:text-[#F5F7FA] flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#F59E0B]" />
            {l.transport}
          </label>
          <input
            type="number"
            min="0"
            step="500"
            value={transportCost}
            onChange={(e) => setTransportCost(Math.max(0, Number(e.target.value)))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#374151] text-sm font-bold text-[#263238] dark:text-[#F5F7FA] focus:outline-none focus:border-[#66BB6A] bg-[#F7F8FA] dark:bg-[#202A35]"
          />
        </div>

        {/* Other Expenses */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#263238] dark:text-[#F5F7FA] flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-[#EF5350]" />
            {l.other}
          </label>
          <input
            type="number"
            min="0"
            step="500"
            value={otherExpenses}
            onChange={(e) => setOtherExpenses(Math.max(0, Number(e.target.value)))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#374151] text-sm font-bold text-[#263238] dark:text-[#F5F7FA] focus:outline-none focus:border-[#66BB6A] bg-[#F7F8FA] dark:bg-[#202A35]"
          />
        </div>

      </div>

      {/* Output Summary Box */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl p-6 text-white space-y-4 shadow-lg">
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border-b border-white/20 pb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-100 block">{l.gross}</span>
            <span className="text-lg font-black">₹{expectedSellingPrice.toLocaleString()}</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-100 block">{l.transportShort}</span>
            <span className="text-lg font-bold text-amber-200">- ₹{Number(transportCost).toLocaleString()}</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-100 block">{l.otherShort}</span>
            <span className="text-lg font-bold text-rose-200">- ₹{Number(otherExpenses).toLocaleString()}</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-100 block">{l.totalExp}</span>
            <span className="text-lg font-bold text-amber-300">₹{totalExpenses.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div>
            <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider block">{l.netTotal}</span>
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              ₹{estimatedNetAmount.toLocaleString()}
            </span>
          </div>

          <div className="bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/30 text-right">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-100 block">{l.netPerQtnl}</span>
            <span className="text-xl font-black text-amber-300">₹{netPerQuintal.toLocaleString()}{l.perQtnl}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
