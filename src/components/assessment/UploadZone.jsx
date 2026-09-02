import React, { useRef, useState } from 'react';
import { Upload, Camera, Image as ImageIcon, Sparkles, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { PRESET_SAMPLES } from '../../data/presetImages';

export default function UploadZone({
  selectedImage,
  setSelectedImage,
  selectedPreset,
  setSelectedPreset,
  onAnalyze,
  isAnalyzing,
  errorMessage,
  setErrorMessage
}) {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file) => {
    setErrorMessage('');
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Please upload a valid image file containing onions (JPG, JPEG, PNG, WEBP).');
      return;
    }

    const maxSizeMB = 10;
    if (file.size > maxSizeMB * 1024 * 1024) {
      setErrorMessage(`Image file is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum size is 10 MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      setSelectedPreset(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handlePresetSelect = (preset) => {
    setErrorMessage('');
    setSelectedImage(preset.image);
    setSelectedPreset(preset);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Upload className="w-5 h-5 text-onion-600" />
            Upload Onion Sample
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload an image of onions for AI-powered quality analysis.
          </p>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full w-fit">
          Supported: JPG, JPEG, PNG • Max: 10 MB
        </span>
      </div>

      {/* Error display */}
      {errorMessage && (
        <div className="flex items-center gap-3 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-800 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Upload Dropzone / Preview */}
      {!selectedImage ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
            dragActive
              ? 'border-onion-500 bg-onion-50/50 scale-[1.01]'
              : 'border-slate-300 hover:border-onion-400 bg-slate-50/50 hover:bg-white'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />

          <div className="w-16 h-16 rounded-2xl bg-onion-100 text-onion-600 mx-auto flex items-center justify-center mb-4 shadow-inner">
            <Upload className="w-8 h-8" />
          </div>

          <h3 className="text-base font-bold text-slate-800 mb-1">
            Drag & drop onion image here, or <span className="text-onion-600 underline">browse</span>
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
            Ensure good lighting and spread onions evenly across the frame for best bounding-box detection accuracy.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold text-xs shadow-sm hover:bg-slate-50 transition-all"
            >
              <ImageIcon className="w-4 h-4 text-onion-600" />
              Browse Files
            </button>
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs shadow-sm hover:bg-slate-800 transition-all"
            >
              <Camera className="w-4 h-4 text-amber-400" />
              Camera Capture
            </button>
          </div>
        </div>
      ) : (
        /* Image Preview Mode */
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-inner group max-h-96 flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Selected onion sample preview"
              className="w-full h-full max-h-96 object-contain"
            />
            {selectedPreset && (
              <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 shadow-md backdrop-blur-md flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Preset Loaded: {selectedPreset.category}
              </div>
            )}
            
            {/* Overlay buttons */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedImage(null);
                  setSelectedPreset(null);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-800 text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Change Image
              </button>
            </div>
          </div>

          {/* Analyze CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-onion-50/80 rounded-xl border border-onion-200">
            <div>
              <p className="text-xs font-bold text-onion-950">Image Ready for Computer Vision Model</p>
              <p className="text-[11px] text-slate-600">
                {selectedPreset ? selectedPreset.title : 'Custom uploaded image sample'}
              </p>
            </div>
            <button
              onClick={onAnalyze}
              disabled={isAnalyzing}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-onion-700 to-onion-600 hover:from-onion-800 hover:to-onion-700 text-white font-bold text-sm shadow-lg shadow-onion-600/30 transition-all active:scale-95 ${
                isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              {isAnalyzing ? 'Processing AI Pipeline...' : 'Analyze Sample'}
            </button>
          </div>
        </div>
      )}

      {/* Preset Demo Selection Cards (Requirement #18) */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Or Try Preset Demo Batches:
          </span>
          <span className="text-[11px] text-slate-400">Click any card to load instantly</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PRESET_SAMPLES.map((preset) => {
            const isSelected = selectedPreset?.id === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => handlePresetSelect(preset)}
                className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'border-onion-600 bg-onion-50/90 shadow-md ring-2 ring-onion-600/20'
                    : 'border-slate-200 hover:border-onion-300 bg-white hover:bg-slate-50/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      preset.category.includes('Grade A')
                        ? 'bg-emerald-100 text-emerald-800'
                        : preset.category.includes('Mixed')
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {preset.category}
                    </span>
                    <span className="text-xs font-extrabold text-slate-900">Score: {preset.stats.qualityScore}/100</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{preset.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{preset.description}</p>
                </div>
                <div className="mt-2 text-[10px] text-onion-700 font-semibold flex items-center gap-1">
                  Click to test &rarr;
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
