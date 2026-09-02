import React, { useState } from 'react';
import UploadZone from '../components/assessment/UploadZone';
import ProcessingState from '../components/assessment/ProcessingState';
import QualityScoreGauge from '../components/assessment/QualityScoreGauge';
import GradeDistribution from '../components/assessment/GradeDistribution';
import DefectCards from '../components/assessment/DefectCards';
import ImageAnalysisView from '../components/assessment/ImageAnalysisView';
import SizeDistributionChart from '../components/assessment/SizeDistributionChart';
import QualityParameters from '../components/assessment/QualityParameters';
import ProcurementSummary from '../components/assessment/ProcurementSummary';
import DigitalReportModal from '../components/assessment/DigitalReportModal';
import ImageRejectionCard from '../components/farmer/ImageRejectionCard';
import { analyzeOnionSample } from '../services/aiService';
import { FileText, Sparkles, RefreshCw } from 'lucide-react';

export default function AssessmentPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setErrorMessage('Please upload or select an onion sample image first.');
      return;
    }

    setErrorMessage('');
    setIsAnalyzing(true);
    setAnalysisResult(null);

    const result = await analyzeOnionSample({
      imageSrc: selectedImage,
      presetStats: selectedPreset?.stats,
      presetType: selectedPreset?.id
    });

    setIsAnalyzing(false);
    if (result && result.success) {
      setAnalysisResult(result.data);
      setTimeout(() => {
        const el = document.getElementById('ai-results-dashboard');
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

  const handleResetAssessment = () => {
    setSelectedImage(null);
    setSelectedPreset(null);
    setAnalysisResult(null);
    setErrorMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-onion-900 via-onion-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Active Mandi Vision Inspection Pipeline
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            AI Quality Assessment & Grading
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
            Upload single or bulk onion photos for real-time computer vision analysis, caliper sizing, and instant digital report generation.
          </p>
        </div>

        {analysisResult && analysisResult.is_onion && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg transition-all"
            >
              <FileText className="w-4 h-4" />
              View Digital Report
            </button>
            <button
              onClick={handleResetAssessment}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all"
              title="Reset Assessment"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Upload Zone */}
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

      {/* Processing Radar Animation State */}
      {isAnalyzing && (
        <ProcessingState sampleImage={selectedImage} />
      )}

      {/* AI ANALYSIS RESULTS DASHBOARD */}
      {analysisResult && !isAnalyzing && (
        <div id="ai-results-dashboard" className="space-y-8 animate-in fade-in duration-500">
          
          {/* STAGE 1 REJECTION FOR NON-ONION IMAGES */}
          {(analysisResult.status === 'rejected' || !analysisResult.is_onion) ? (
            <ImageRejectionCard
              confidence={analysisResult.onion_confidence || 0.12}
              onRetryCamera={handleResetAssessment}
              onRetryUpload={handleResetAssessment}
              lang="en"
            />
          ) : (
            <>
              {/* Top Completion Header */}
              <div className="bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-700 text-white p-4 sm:p-5 rounded-2xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold">AI Quality Assessment Complete</h3>
                    <p className="text-xs text-emerald-100 font-medium">
                      {analysisResult.total_onions || 200} onions identified & classified in 2.4 seconds
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  Generate & Download Report
                </button>
              </div>

              {/* Row 1: Overall Quality Score Gauge + Grade Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4">
                  <QualityScoreGauge
                    score={analysisResult.quality_score}
                    confidence={analysisResult.confidence}
                  />
                </div>
                <div className="lg:col-span-8">
                  <GradeDistribution
                    gradeA={analysisResult.grade_a}
                    gradeB={analysisResult.grade_b}
                    urs={analysisResult.urs}
                    totalCount={analysisResult.total_onions || 200}
                  />
                </div>
              </div>

              {/* Row 2: Defect Detection Cards */}
              <DefectCards
                defects={{
                  damaged: analysisResult.damaged,
                  rotten: analysisResult.rotten,
                  sprouted: analysisResult.sprouted,
                  undersized: analysisResult.undersized
                }}
                totalOnions={analysisResult.total_onions || 200}
              />

              {/* Row 3: Split-Screen Image Analysis Bounding Box Overlay */}
              <ImageAnalysisView
                sampleImage={selectedImage}
                detectedOnions={selectedPreset?.detectedOnions}
              />

              {/* Row 4: Size Distribution Chart & Quality Parameters */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SizeDistributionChart
                  avgDiameter={analysisResult.average_diameter}
                  avgWeight={analysisResult.average_weight}
                />
                <QualityParameters
                  score={analysisResult.quality_score}
                  confidence={analysisResult.confidence}
                />
              </div>

              {/* Row 5: Procurement Decision & Recommendation Summary */}
              <ProcurementSummary
                result={{
                  qualityScore: analysisResult.quality_score,
                  gradeA: analysisResult.grade_a,
                  recommendation: analysisResult.recommendation
                }}
              />
            </>
          )}

        </div>
      )}

      {/* Digital PDF Report Modal */}
      {isReportModalOpen && analysisResult && analysisResult.is_onion && (
        <DigitalReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          data={analysisResult}
        />
      )}

    </div>
  );
}
