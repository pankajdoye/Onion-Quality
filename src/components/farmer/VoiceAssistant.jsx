import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function VoiceAssistant({ textToSpeak, lang = 'en', label = 'Listen' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Voice synthesis is not supported on this browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any ongoing speech
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Select speech language code
    if (lang === 'mr') utterance.lang = 'mr-IN';
    else if (lang === 'hi') utterance.lang = 'hi-IN';
    else utterance.lang = 'en-US';

    utterance.rate = 0.95; // Slightly slower for clear farmer listening

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={handleSpeak}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-sm transition-all active:scale-95 ${
        isPlaying
          ? 'bg-amber-500 text-white animate-pulse'
          : 'bg-onion-100 hover:bg-onion-200 text-onion-800 border border-onion-300'
      }`}
    >
      {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-onion-700" />}
      <span>{isPlaying ? 'Stop Voice' : label}</span>
    </button>
  );
}
