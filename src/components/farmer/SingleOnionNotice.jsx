import React from 'react';
import { Info, Layers } from 'lucide-react';

export default function SingleOnionNotice() {
  return (
    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-[#1F2933] border border-amber-300 dark:border-amber-700 text-amber-950 dark:text-[#F5F7FA] space-y-1 text-xs font-semibold shadow-sm flex items-start gap-3 transition-colors">
      <div className="p-2 rounded-xl bg-amber-200 dark:bg-[#202A35] text-amber-900 dark:text-[#F59E0B] font-bold flex-shrink-0 border border-amber-300 dark:border-[#374151]">
        1 Bulb
      </div>
      <div>
        <h4 className="font-extrabold text-amber-900 dark:text-[#F59E0B] text-sm">1 Onion Detected in Photo</h4>
        <p className="text-amber-900/90 dark:text-[#B8C2CC] text-xs">
          “Single-onion analysis cannot represent the quality of your entire batch.”
        </p>
        <span className="font-extrabold text-amber-950 dark:text-[#F5F7FA] block mt-1">
          💡 Tip: For better batch estimation, photograph multiple onions together.
        </span>
      </div>
    </div>
  );
}
