import React, { useState } from 'react';
import { Camera, Upload, CheckCircle2, AlertTriangle, RefreshCw, FileText, Download } from 'lucide-react';
import OneTapCheck from '../components/farmer/OneTapCheck';
import TopResultCard from '../components/farmer/TopResultCard';
import InteractiveImageResult from '../components/farmer/InteractiveImageResult';
import StorageAdviceCard from '../components/farmer/StorageAdviceCard';
import SimpleProfitCalculator from '../components/farmer/ProfitCalculator';
import ImageRejectionCard from '../components/farmer/ImageRejectionCard';
import LowConfidenceCard from '../components/farmer/LowConfidenceCard';
import SingleOnionNotice from '../components/farmer/SingleOnionNotice';
import ProcessingState from '../components/assessment/ProcessingState';
import ReportDownloadModal from '../components/assessment/ReportDownloadModal';
import { analyzeOnionQuality } from '../services/aiService';
import { saveScanRecord } from '../services/historyService';
import { SMART_I18N } from '../utils/i18n_smart';

export default function SmartCheckPage({ lang = 'en' }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const t = SMART_I18N[lang] || SMART_I18N.en;

  const handleImageSelected = async (imageSrc, presetType = null) => {
    setSelectedImage(imageSrc);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    const result = await analyzeOnionQuality({
      imageSrc,
      presetType
    });

    setIsAnalyzing(false);

    if (result && result.success) {
      setAnalysisResult(result.data);

      if (result.data && result.data.is_onion) {
        saveScanRecord({
          ...result.data,
          imageSrc,
          lang
        });
      }

      setTimeout(() => {
        const el = document.getElementById('smart-result-view');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setAnalysisResult({
        status: "rejected",
        stage: 1,
        rejection_reason: "not_an_onion",
        is_onion: false,
        onion_confidence: 0.10,
        message: "Please capture a clear photo of the onion."
      });
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const uiText = {
    mr: {
      header: "कांद्याचा फोटो काढा किंवा अपलोड करा",
      sub: "मानकीकृत AI संगणक दृष्टी गुणवत्ता मूल्यमापन",
      reset: "नवीन फोटो तपासा",
      completeTitle: "तपासणी पूर्ण झाली",
      completeSub: "AI अचूकतेने गुणवत्ता श्रेणी निश्चित केली आहे"
    },
    hi: {
      header: "प्याज की फोटो खींचें या अपलोड करें",
      sub: "मानकीकृत AI कंप्यूटर विज़न गुणवत्ता मूल्यांकन",
      reset: "नया फोटो जांचें",
      completeTitle: "जांच पूर्ण हुई",
      completeSub: "AI सटीकता के साथ गुणवत्ता ग्रेड निर्धारित की गई है"
    },
    en: {
      header: "Scan / Upload Onion",
      sub: "Standardized AI Vision Quality Assessment",
      reset: "Check New Photo",
      completeTitle: "Analysis Complete",
      completeSub: "Quality graded with AI confidence"
    }
  };

  const u = uiText[lang] || uiText.en;

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 pb-20">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#1F2933] border border-slate-200 dark:border-[#374151] rounded-3xl p-5 shadow-sm flex items-center justify-between transition-colors">
        <div>
          <h2 className="text-xl font-black text-[#263238] dark:text-[#F5F7FA]">{u.header}</h2>
          <p className="text-xs text-[#607D8B] dark:text-[#B8C2CC] font-medium">{u.sub}</p>
        </div>

        {analysisResult && (
          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#202A35] text-[#263238] dark:text-[#F5F7FA] font-bold text-xs border border-slate-200 dark:border-[#374151] flex items-center gap-1 hover:bg-slate-200 dark:hover:bg-[#263238] transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            {u.reset}
          </button>
        )}
      </div>

      {/* Upload & Live Camera Zone */}
      {!analysisResult && !isAnalyzing && (
        <OneTapCheck
          onImageSelected={(img) => handleImageSelected(img, null)}
          onPresetTestSelected={(preset, img) => handleImageSelected(img, preset)}
          lang={lang}
        />
      )}

      {/* Scanning Radar Animation */}
      {isAnalyzing && (
        <ProcessingState sampleImage={selectedImage} />
      )}

      {/* Analysis Results View */}
      {analysisResult && !isAnalyzing && (
        <div id="smart-result-view" className="space-y-6 animate-in fade-in duration-300">
          
          {/* STAGE 1 REJECTION: INVALID / NON-ONION IMAGE */}
          {(analysisResult.status === 'rejected' || !analysisResult.is_onion) && (
            <ImageRejectionCard
              onRetryCamera={handleReset}
              onRetryUpload={handleReset}
              lang={lang}
            />
          )}

          {/* LOW CONFIDENCE UNCERTAIN RESULT */}
          {analysisResult.status === 'success' && analysisResult.is_onion && analysisResult.is_uncertain && (
            <LowConfidenceCard onRetry={handleReset} />
          )}

          {/* SINGLE ONION BATCH WARNING NOTICE */}
          {analysisResult.status === 'success' && analysisResult.is_onion && !analysisResult.is_uncertain && analysisResult.is_single_onion && (
            <SingleOnionNotice lang={lang} />
          )}

          {/* STAGE 2 PASSED: FULL QUALITY RESULTS FOR VALID ONIONS ONLY */}
          {analysisResult.status === 'success' && analysisResult.is_onion && !analysisResult.is_uncertain && (
            <>
              {/* Action Bar with Multilingual PDF Download Button */}
              <div className="bg-[#66BB6A] text-white p-4 rounded-2xl shadow-sm flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-lg font-black">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base">{u.completeTitle}</h3>
                    <p className="text-[11px] text-emerald-100 font-medium">{u.completeSub}</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsDownloadModalOpen(true)}
                  className="px-5 py-3 rounded-xl bg-slate-900 dark:bg-[#121820] hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 border border-slate-700 dark:border-[#374151]"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>{t.downloadReportBtn || "Download Report ↓"}</span>
                </button>
              </div>

              <TopResultCard
                resultData={{
                  quality_score: analysisResult.quality_score,
                  grade_a: analysisResult.grade_a,
                  grade_b: analysisResult.grade_b,
                  urs: analysisResult.urs,
                  healthy: analysisResult.healthy,
                  damaged: analysisResult.damaged,
                  rotten: analysisResult.rotten,
                  sprouted: analysisResult.sprouted,
                  undersized: analysisResult.undersized,
                  expected_price: analysisResult.expected_price_formatted || '₹2,600 / quintal',
                  best_market: analysisResult.best_market || 'Lasalgaon APMC',
                  selling_advice: analysisResult.selling_advice || 'Prices are currently rising'
                }}
                lang={lang}
              />

              <InteractiveImageResult sampleImage={selectedImage} lang={lang} />
              <StorageAdviceCard qualityScore={analysisResult.quality_score} lang={lang} />
              <SimpleProfitCalculator expectedPricePerQuintal={2600} lang={lang} />
            </>
          )}

        </div>
      )}

      {/* Multilingual PDF Download Modal */}
      {isDownloadModalOpen && (
        <ReportDownloadModal
          isOpen={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
          resultData={analysisResult}
          imageSrc={selectedImage}
          currentLang={lang}
        />
      )}

    </div>
  );
}
