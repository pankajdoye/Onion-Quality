import React, { useState } from 'react';
import OneTapCheck from '../components/farmer/OneTapCheck';
import ProcessingState from '../components/assessment/ProcessingState';
import ImageRejectionCard from '../components/farmer/ImageRejectionCard';
import LowConfidenceCard from '../components/farmer/LowConfidenceCard';
import SingleOnionNotice from '../components/farmer/SingleOnionNotice';
import TopResultCard from '../components/farmer/TopResultCard';
import InteractiveImageResult from '../components/farmer/InteractiveImageResult';
import StorageAdviceCard from '../components/farmer/StorageAdviceCard';
import SimpleProfitCalculator from '../components/farmer/ProfitCalculator';
import ReportDownloadModal from '../components/assessment/ReportDownloadModal';
import { SMART_I18N } from '../utils/i18n_smart';
import { analyzeOnionSample } from '../services/aiService';
import { saveScanRecord } from '../services/historyService';
import { Download, RefreshCw, FileText } from 'lucide-react';

export default function SmartCheckPage({ lang = 'en' }) {
  const t = SMART_I18N[lang] || SMART_I18N.en;
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const handleImageSelected = async (imageSrc, presetType = null) => {
    setSelectedImage(imageSrc);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    const result = await analyzeOnionSample({
      imageSrc,
      presetType
    });

    setIsAnalyzing(false);

    if (result && result.success) {
      setAnalysisResult(result.data);

      if (result.data && result.data.is_onion) {
        saveScanRecord({
          ...result.data,
          imageSrc
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
        message: "🧅 Onion Not Detected. Quality score cannot be generated for non-onion images."
      });
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 pb-20">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#1F2933] border border-slate-200 dark:border-[#374151] rounded-3xl p-5 shadow-sm flex items-center justify-between transition-colors">
        <div>
          <h2 className="text-xl font-black text-[#263238] dark:text-[#F5F7FA]">Scan / Upload Onion</h2>
          <p className="text-xs text-[#607D8B] dark:text-[#B8C2CC] font-medium">Standardized AI Vision Quality Assessment</p>
        </div>

        {analysisResult && (
          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#202A35] text-[#263238] dark:text-[#F5F7FA] font-bold text-xs border border-slate-200 dark:border-[#374151] flex items-center gap-1 hover:bg-slate-200 dark:hover:bg-[#263238] transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Check New Photo
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
            <SingleOnionNotice />
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
                    <h3 className="font-extrabold text-sm sm:text-base">Analysis Complete</h3>
                    <p className="text-[11px] text-emerald-100 font-medium">Quality graded with AI confidence</p>
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
