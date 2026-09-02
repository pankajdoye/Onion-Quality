import React from 'react';
import { Home } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function StorageAdviceCard({ qualityScore = 87, lang = 'en' }) {
  const t = SMART_I18N[lang] || SMART_I18N.en;

  const isStore = qualityScore >= 80;
  const isPartial = qualityScore >= 65 && qualityScore < 80;

  const labels = {
    mr: {
      title: "कांदा साठवावा की विकावा?",
      badge: "AI साठवणूक सल्ला",
      aiTag: "AI सल्ला व निर्णय",
      storeTitle: "🟢 साठवणूक करा (Store)",
      partialTitle: "🟡 काही विका, काही साठवा",
      sellTitle: "🔴 त्वरित विक्री करा (Sell)",
      storeDesc: "“तुमचा कांदा चांगल्या प्रतीचा असून साल जाड व सुकी आहे. पुढील २-३ महिन्यांत बाजारभाव वाढण्याची शक्यता आहे.”",
      partialDesc: "“चालू चांगल्या भावाचा फायदा घेण्यासाठी ५०% माल त्वरित विका आणि ५०% माल चांगल्या भावासाठी साठवा.”",
      sellDesc: "“ओलावा किंवा कोंब येण्यामुळे साठवणुकीत नुकसान होऊ शकते. सध्याच्या भावात त्वरित विक्री करणे फायदेशीर ठरेल.”",
      disclaimer: "* हा AI संगणक दृष्टी आणि बाजार कल आधारित तांत्रिक सल्ला आहे."
    },
    hi: {
      title: "प्याज भंडारित करें या बेचें?",
      badge: "AI भंडारण सलाह",
      aiTag: "AI सलाह एवं निर्णय",
      storeTitle: "🟢 भंडारित करें (Store)",
      partialTitle: "🟡 कुछ बेचें, कुछ भंडारित करें",
      sellTitle: "🔴 तुरंत बेचें (Sell)",
      storeDesc: "“आपके प्याज की गुणवत्ता अच्छी है और छिलका सूखा व मजबूत है। अगले 2-3 महीनों में मंडी भाव बढ़ने की संभावना है।”",
      partialDesc: "“वर्तमान अच्छे भाव का लाभ लेने के लिए 50% स्टॉक तुरंत बेचें और शेष 50% उच्च भाव के लिए भंडारित करें।”",
      sellDesc: "“नमी या अंकुरण के कारण भंडारण में खराब होने का जोखिम है। वर्तमान भाव पर तुरंत बेचना अधिक लाभदायक रहेगा।”",
      disclaimer: "* यह AI कंप्यूटर विज़न एवं बाजार रुझानों पर आधारित सलाह है।"
    },
    en: {
      title: "Should I Store or Sell?",
      badge: "AI Storage Intelligence",
      aiTag: "AI Suggestion",
      storeTitle: "🟢 Store (Good for Storage)",
      partialTitle: "🟡 Sell Some, Store Some",
      sellTitle: "🔴 Sell Now",
      storeDesc: "“Your onions are good quality with thick dry scale layers. Market prices show an upward trend over 2-3 months.”",
      partialDesc: "“Consider selling 50% of stock now to lock in current prices, and store the remaining lot for peak rates.”",
      sellDesc: "“Quality may degrade quickly during storage due to moisture or sprouting. Selling soon is recommended.”",
      disclaimer: "* Clearly labeled as an AI suggestion based on quality grading and market trends."
    }
  };

  const l = labels[lang] || labels.en;

  return (
    <div className="bg-white dark:bg-[#1F2933] rounded-3xl border border-slate-200 dark:border-[#374151] p-6 shadow-md space-y-4 transition-colors">
      
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#374151] pb-3">
        <h3 className="text-sm font-black text-[#263238] dark:text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
          <Home className="w-4 h-4 text-[#66BB6A]" />
          🏠 {l.title}
        </h3>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          {l.badge}
        </span>
      </div>

      {/* Suggestion Card */}
      <div className={`p-5 rounded-2xl border text-center space-y-1 shadow-md ${
        isStore
          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400'
          : isPartial
          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-400'
          : 'bg-gradient-to-r from-rose-500 to-rose-600 text-white border-rose-400'
      }`}>
        <span className="text-[10px] font-black uppercase tracking-widest text-white/90 block">{l.aiTag}</span>
        <div className="text-2xl sm:text-3xl font-black">
          {isStore ? l.storeTitle : isPartial ? l.partialTitle : l.sellTitle}
        </div>
        <p className="text-xs font-semibold text-white/90 max-w-md mx-auto">
          {isStore ? l.storeDesc : isPartial ? l.partialDesc : l.sellDesc}
        </p>
      </div>

      <p className="text-[11px] text-[#607D8B] dark:text-[#B8C2CC] text-center">
        {l.disclaimer}
      </p>

    </div>
  );
}
