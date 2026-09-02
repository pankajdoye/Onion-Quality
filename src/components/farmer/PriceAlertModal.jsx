import React, { useState } from 'react';
import { Bell, CheckCircle2, Sparkles, X } from 'lucide-react';
import { savePriceAlert } from '../../utils/storage';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function PriceAlertModal({ isOpen, onClose, lang = 'mr' }) {
  const t = SMART_I18N[lang] || SMART_I18N.mr;
  const [targetPrice, setTargetPrice] = useState(3000);
  const [showAlertToast, setShowAlertToast] = useState(false);

  if (!isOpen) return null;

  const handleSetAlert = () => {
    savePriceAlert(targetPrice);
    setShowAlertToast(true);
    setTimeout(() => {
      setShowAlertToast(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-[#1F2933] rounded-3xl p-6 w-full max-w-md space-y-5 shadow-2xl border border-slate-200 dark:border-[#374151] transition-colors">
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#374151] pb-3">
          <h3 className="text-base font-black text-[#263238] dark:text-[#F5F7FA] flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#F59E0B]" />
            🔔 {t.setAlertTitle || "Set Mandi Price Alert"}
          </h3>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-slate-400 hover:text-[#263238] dark:hover:text-[#F5F7FA] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {showAlertToast ? (
          <div className="p-5 rounded-2xl bg-[#66BB6A] text-white text-center space-y-2 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-white text-[#66BB6A] mx-auto flex items-center justify-center font-bold text-2xl">
              ✓
            </div>
            <h4 className="text-lg font-black">{t.alertMsg || "Price Alert Saved!"}</h4>
            <p className="text-xs font-semibold text-emerald-100">
              Alert configured for ₹{Number(targetPrice).toLocaleString()}/quintal target in Lasalgaon APMC.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-[#607D8B] dark:text-[#B8C2CC] font-medium">
              “Receive notification when the APMC mandi onion price reaches your target rate.”
            </p>

            {/* Quick Presets */}
            <div className="grid grid-cols-3 gap-2">
              {[2500, 3000, 3500].map((pr) => (
                <button
                  key={pr}
                  onClick={() => setTargetPrice(pr)}
                  className={`py-2 rounded-xl text-xs font-black border transition-all ${
                    targetPrice === pr
                      ? 'bg-[#66BB6A] text-white border-[#66BB6A] shadow'
                      : 'bg-[#F7F8FA] dark:bg-[#202A35] text-[#263238] dark:text-[#F5F7FA] hover:bg-slate-100 dark:hover:bg-[#263238] border-slate-200 dark:border-[#374151]'
                  }`}
                >
                  ₹{pr.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Custom Price Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#263238] dark:text-[#F5F7FA]">Custom Target Price (₹ / Quintal)</label>
              <input
                type="number"
                min="1000"
                max="10000"
                step="100"
                value={targetPrice}
                onChange={(e) => setTargetPrice(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-[#374151] font-black text-[#263238] dark:text-[#F5F7FA] text-lg focus:outline-none focus:border-[#66BB6A] bg-[#F7F8FA] dark:bg-[#202A35]"
              />
            </div>

            <button
              onClick={handleSetAlert}
              className="w-full py-3.5 rounded-2xl bg-[#66BB6A] hover:bg-emerald-600 text-white font-black text-sm shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Bell className="w-4 h-4 text-amber-200" />
              <span>{t.setAlertBtn || "Activate Price Alert"}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
