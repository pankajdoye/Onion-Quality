import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function VoiceButton({ textToSpeak, lang = 'mr' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const t = SMART_I18N[lang] || SMART_I18N.mr;

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Browser speech synthesis unavailable.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    if (lang === 'mr') utterance.lang = 'mr-IN';
    else if (lang === 'hi') utterance.lang = 'hi-IN';
    else utterance.lang = 'en-US';

    utterance.rate = 0.9; // Farmer-friendly clear speech speed

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={handleSpeak}
      className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-sm shadow-md transition-all active:scale-95 ${
        isPlaying
          ? 'bg-amber-500 text-white animate-pulse'
          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
      }`}
    >
      {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      <span>🔊 {isPlaying ? 'थांबवा (Stop)' : t.listenBtn}</span>
    </button>
  );
}
