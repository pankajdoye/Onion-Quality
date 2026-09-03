import React, { useState } from 'react';
import { Camera, Upload, CheckCircle2, AlertTriangle, RefreshCw, FileText, Download } from 'lucide-react';
import OneTapCheck from '../components/farmer/OneTapCheck';
import TopResultCard from '../components/farmer/TopResultCard';
import InteractiveImageResult from '../components/farmer/InteractiveImageResult';
import StorageAdviceCard from '../components/farmer/StorageAdviceCard';
import SimpleProfitCalculator from '../components/farmer/ProfitCalculator';
import ImageRejectionCard from '../components/farmer/ImageRejectionCard';
import BlurDarknessAlertCard from '../components/farmer/BlurDarknessAlertCard';
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

  const handleImageSelected = async (imageSrc, presetType = null, imageFile = null) => {
    setSelectedImage(imageSrc);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    const result = await analyzeOnionQuality({
      imageFile,
      imageSrc,
      presetType
    });

    setIsAnalyzing(false);

    if (result && result.data) {
      setAnalysisResult(result.data);

      if (result.data.status === 'success' && result.data.is_onion) {
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
        message: "Onion not detected. Please capture a clear onion image."
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
          onImageSelected={(img, file) => handleImageSelected(img, null, file)}
          onPresetTestSelected={(preset, img) => handleImageSelected(img, preset, null)}
          lang={lang}
        />
      )}

      {/* Scanning Animation */}
      {isAnalyzing && (
        <ProcessingState sampleImage={selectedImage} />
      )}

      {/* Analysis Results View */}
      {analysisResult && !isAnalyzing && (
        <div id="smart-result-view" className="space-y-6 animate-in fade-in duration-300">
          
          {/* IMAGE QUALITY INSUFFICIENT ALERT */}
          {analysisResult.status === 'low_quality' && (
            <BlurDarknessAlertCard
              message={analysisResult.message}
              onRetake={handleReset}
              lang={lang}
            />
          )}

          {/* STAGE 1 REJECTION: INVALID / NON-ONION IMAGE */}
          {(analysisResult.status === 'rejected' || !analysisResult.is_onion) && (
            <ImageRejectionCard
              message={analysisResult.message}
              rejectionReason={analysisResult.rejection_reason}
              onRetryCamera={handleReset}
              onRetryUpload={handleReset}
              lang={lang}
            />
          )}

          {/* LOW CONFIDENCE / UNCERTAIN RESULT */}
          {analysisResult.status === 'success' && analysisResult.is_onion && analysisResult.is_uncertain && (
            <LowConfidenceCard onRetry={handleReset} lang={lang} />
          )}

          {/* SINGLE ONION NOTICE */}
          {analysisResult.status === 'success' && analysisResult.is_onion && !analysisResult.is_uncertain && analysisResult.is_single_onion && (
            <SingleOnionNotice lang={lang} />
          )}

          {/* STAGE 2 PASSED: FULL QUALITY RESULTS FOR VALID ONIONS */}
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

              {/* Main Summary Result Card with Grade A & URS Totals */}
              <TopResultCard
                resultData={{
                  quality_score: analysisResult.quality_score,
                  overall_quality: analysisResult.overall_quality,
                  total_onions: analysisResult.detected_onions_count,
                  detected_onions_count: analysisResult.detected_onions_count,
                  grade_a: analysisResult.grade_a,
                  grade_b: analysisResult.grade_b,
                  urs: analysisResult.urs,
                  grade_a_count: analysisResult.grade_a_count,
                  urs_count: analysisResult.urs_count,
                  healthy: analysisResult.healthy,
                  damaged: analysisResult.damaged,
                  rotten: analysisResult.rotten,
                  sprouted: analysisResult.sprouted,
                  undersized: analysisResult.undersized,
                  expected_price: analysisResult.estimated_price_range || '₹2,600 / quintal',
                  best_market: analysisResult.market || 'Lasalgaon APMC',
                  selling_advice: analysisResult.selling_recommendation || 'Prices are currently stable',
                  vision_ai_status: analysisResult.vision_ai_status
                }}
                lang={lang}
              />

              {/* Interactive Image with Detected Bounding Boxes and Individual Onion List */}
              <InteractiveImageResult
                sampleImage={selectedImage}
                individualOnions={analysisResult.individual_onions || []}
                lang={lang}
              />

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
