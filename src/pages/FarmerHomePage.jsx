import React, { useState } from 'react';
import UploadZone from '../components/assessment/UploadZone';
import ProcessingState from '../components/assessment/ProcessingState';
import CameraGuidanceOverlay from '../components/farmer/CameraGuidanceOverlay';
import VoiceAssistant from '../components/farmer/VoiceAssistant';
import SellingRecommendationCard from '../components/farmer/SellingRecommendationCard';
import MarketComparisonTable from '../components/farmer/MarketComparisonTable';
import ProfitCalculator from '../components/farmer/ProfitCalculator';
import FarmerDashboardCards from '../components/farmer/FarmerDashboardCards';
import { analyzeOnionSample } from '../services/aiService';
import { TRANSLATIONS } from '../utils/i18n';
import { Sparkles, Camera, Upload, Bot, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function FarmerHomePage({ lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setErrorMessage('Please upload or capture an onion photo first.');
      return;
    }

    setErrorMessage('');
    setIsAnalyzing(true);

    const result = await analyzeOnionSample({
      imageSrc: selectedImage,
      presetStats: selectedPreset?.stats
    });

    setIsAnalyzing(false);
    if (result && result.success) {
      setAnalysisResult(result.data);
      setTimeout(() => {
        const el = document.getElementById('farmer-result-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setErrorMessage('Unable to analyze image. Please try taking a clearer photo.');
    }
  };

  const textForVoice = analysisResult ? (
    lang === 'mr'
      ? `तुमच्या कांद्याची गुणवत्ता ग्रेड ए ७२ टक्के आहे. गुणवत्ता गुण सत्ताऐंशी आहे. अंदाजे बाजारभाव २६०० रुपये प्रति क्विंटल आहे. विक्रीसाठी ही सर्वोत्तम वेळ आहे.`
      : lang === 'hi'
      ? `आपके प्याज की गुणवत्ता ग्रेड ए ७२ प्रतिशत है। गुणवत्ता स्कोर सतासी है। अनुमानित मंडी भाव दो हजार छह सौ रुपये प्रति क्विंटल है। बेचने का यह सही समय है।`
      : `Your onion quality is Grade A 72 percent. Overall quality score is 87 out of 100. The estimated market price is 2,600 rupees per quintal. This is a good time to sell.`
  ) : '';

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      
      {/* Step 1 Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-onion-800 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Simple 4-Step Farmer Decision Support</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
          {t.title}
        </h1>

        <p className="text-sm sm:text-base text-emerald-100 max-w-2xl font-medium">
          {t.subtitle}
        </p>

        {/* Action Buttons for Step 1 */}
        <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
          <button
            onClick={() => {
              const el = document.getElementById('farmer-upload-zone');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-emerald-900 font-extrabold text-sm shadow-lg hover:bg-slate-50 transition-all active:scale-95"
          >
            <Camera className="w-5 h-5 text-amber-500" />
            <span>📷 {t.takePhoto}</span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('farmer-upload-zone');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 text-white font-extrabold text-sm shadow-lg hover:bg-slate-800 transition-all active:scale-95"
          >
            <Upload className="w-5 h-5 text-emerald-400" />
            <span>⬆️ {t.uploadPhoto}</span>
          </button>
        </div>
      </div>

      {/* Camera Guidance Overlay (Requirement #21) */}
      <CameraGuidanceOverlay lang={lang} />

      {/* Step 2: Upload Zone Container */}
      <div id="farmer-upload-zone">
        <UploadZone
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          selectedPreset={selectedPreset}
          setSelectedPreset={setSelectedPreset}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </div>

      {/* Step 3: AI Scanning Animation */}
      {isAnalyzing && (
        <ProcessingState sampleImage={selectedImage} />
      )}

      {/* Step 4: Simple Farmer-Friendly Result (Requirement #1, #4, #13, #16, #20) */}
      {analysisResult && !isAnalyzing && (
        <div id="farmer-result-section" className="space-y-8 animate-in fade-in">
          
          {/* Top Result Banner with Voice Assistant Button */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  {t.yourQuality}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                  Overall Quality Score: <span className="text-emerald-600">{analysisResult.quality_score} / 100</span>
                </h2>
              </div>

              {/* Voice Assistance Button (Requirement #20) */}
              <div className="flex items-center gap-3">
                <VoiceAssistant
                  textToSpeak={textForVoice}
                  lang={lang}
                  label={`🔊 ${t.listenBtn}`}
                />
              </div>
            </div>

            {/* Simple Grade Cards (Requirement #4) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <span className="text-xs font-bold text-emerald-900 block uppercase">Grade A (Export)</span>
                <span className="text-4xl font-black text-emerald-700">{analysisResult.grade_a}%</span>
                <span className="text-xs text-emerald-800 font-semibold block mt-1">High quality bulbs</span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                <span className="text-xs font-bold text-amber-900 block uppercase">Grade B (Standard)</span>
                <span className="text-4xl font-black text-amber-700">{analysisResult.grade_b}%</span>
                <span className="text-xs text-amber-800 font-semibold block mt-1">Regular mandi quality</span>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center">
                <span className="text-xs font-bold text-rose-900 block uppercase">URS (Reject)</span>
                <span className="text-4xl font-black text-rose-700">{analysisResult.urs}%</span>
                <span className="text-xs text-rose-800 font-semibold block mt-1">Defective / Small</span>
              </div>

            </div>

            {/* Farmer Quality Rating Badge */}
            <div className="text-center pt-2">
              <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-base font-extrabold shadow-md bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                🟢 {t.goodQuality} — Commercial Export Grade
              </span>
            </div>

          </div>

          {/* Large Farmer Dashboard Summary Cards (Requirement #23) */}
          <FarmerDashboardCards
            qualityGrade={`Grade A (${analysisResult.grade_a}%)`}
            qualityScore={analysisResult.quality_score}
            expectedPrice="₹2,600 / quintal"
            trend="Rising (+8%)"
            recommendation="🟢 SELL NOW"
            lang={lang}
          />

          {/* Selling Recommendation & Trend Analysis (Requirement #16) */}
          <SellingRecommendationCard
            recommendation="🟢 SELL NOW"
            expectedRange="₹2,500 – ₹2,800 / quintal"
            currentPrice="₹2,550 / quintal"
            marketName="Lasalgaon APMC"
            lang={lang}
          />

          {/* Market Comparison Table (Requirement #17) */}
          <MarketComparisonTable lang={lang} />

          {/* Profit Calculator (Requirement #18) */}
          <ProfitCalculator expectedPricePerQuintal={2600} lang={lang} />

        </div>
      )}

    </div>
  );
}
