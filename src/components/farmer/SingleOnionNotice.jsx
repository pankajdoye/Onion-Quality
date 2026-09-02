import React from 'react';
import { Info } from 'lucide-react';

export default function SingleOnionNotice({ lang = 'en' }) {
  const content = {
    mr: {
      badge: "१ कांदा",
      title: "फोटोमध्ये १ कांदा आढळला",
      desc: "एका कांद्याचे विश्लेषण संपूर्ण साठ्याची गुणवत्ता दर्शवू शकत नाही.",
      tip: "💡 सल्ला: साठ्याच्या अचूक अंदाजासाठी एकापेक्षा जास्त कांद्यांचा फोटो काढा."
    },
    hi: {
      badge: "1 प्याज",
      title: "फोटो में 1 प्याज की पहचान हुई",
      desc: "एक प्याज का विश्लेषण पूरे लॉट की गुणवत्ता का प्रतिनिधित्व नहीं कर सकता।",
      tip: "💡 सुझाव: बेहतर लॉट अनुमान के लिए एक साथ कई प्याज की फोटो खींचें।"
    },
    en: {
      badge: "1 Bulb",
      title: "1 Onion Detected in Photo",
      desc: "Single-onion analysis cannot represent the quality of your entire batch.",
      tip: "💡 Tip: For better batch estimation, photograph multiple onions together."
    }
  };

  const c = content[lang] || content.en;

  return (
    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-[#1F2933] border border-amber-300 dark:border-amber-700 text-amber-950 dark:text-[#F5F7FA] space-y-1 text-xs font-semibold shadow-sm flex items-start gap-3 transition-colors">
      <div className="p-2 rounded-xl bg-amber-200 dark:bg-[#202A35] text-amber-900 dark:text-[#F59E0B] font-bold flex-shrink-0 border border-amber-300 dark:border-[#374151]">
        {c.badge}
      </div>
      <div>
        <h4 className="font-extrabold text-amber-900 dark:text-[#F59E0B] text-sm">{c.title}</h4>
        <p className="text-amber-900/90 dark:text-[#B8C2CC] text-xs">
          “{c.desc}”
        </p>
        <span className="font-extrabold text-amber-950 dark:text-[#F5F7FA] block mt-1">
          {c.tip}
        </span>
      </div>
    </div>
  );
}
