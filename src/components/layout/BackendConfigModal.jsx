import React, { useState, useEffect } from 'react';
import { X, Server, CheckCircle2, AlertCircle, RefreshCw, Globe, ExternalLink } from 'lucide-react';
import { getBackendUrl, setBackendUrl, checkBackendHealth } from '../../services/aiService';

export default function BackendConfigModal({ isOpen, onClose, lang = 'en' }) {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'checking', 'online', 'offline'
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      const current = getBackendUrl();
      setUrl(current);
      handleTest(current);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTest = async (testUrl) => {
    const target = (testUrl || url || '').trim();
    if (!target) return;
    setStatus('checking');
    setMsg('Checking connection...');
    
    // Temporarily save to test
    setBackendUrl(target);
    const res = await checkBackendHealth();
    if (res.online) {
      setStatus('online');
      setMsg('Connected successfully! Backend is online.');
    } else {
      setStatus('offline');
      setMsg(`Could not connect to ${target}. If your Render service is waking up, wait ~30 seconds and retry.`);
    }
  };

  const handleSave = () => {
    if (url && url.trim()) {
      setBackendUrl(url);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#1F2933] border border-slate-200 dark:border-[#374151] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#66BB6A] flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#263238] dark:text-[#F5F7FA]">AI Backend Settings</h3>
              <p className="text-[11px] font-bold text-[#607D8B] dark:text-[#B8C2CC]">Connect Frontend to Render Backend</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#202A35]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Badge */}
        <div className={`p-3 rounded-2xl border flex items-center gap-2.5 text-xs font-extrabold ${
          status === 'online' 
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-[#66BB6A]'
            : status === 'checking'
            ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-700'
            : status === 'offline'
            ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-700 dark:text-rose-400'
            : 'bg-slate-50 dark:bg-[#18212B] border-slate-200 dark:border-[#374151] text-[#607D8B]'
        }`}>
          {status === 'checking' && <RefreshCw className="w-4 h-4 animate-spin shrink-0" />}
          {status === 'online' && <CheckCircle2 className="w-4 h-4 shrink-0" />}
          {status === 'offline' && <AlertCircle className="w-4 h-4 shrink-0" />}
          {status === 'idle' && <Globe className="w-4 h-4 shrink-0" />}
          <span>{msg || "Enter your backend web service URL"}</span>
        </div>

        {/* Input */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-bold text-[#263238] dark:text-[#F5F7FA]">
            Backend API URL:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-backend.onrender.com"
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-[#374151] bg-white dark:bg-[#18212B] text-[#263238] dark:text-[#F5F7FA] font-mono focus:outline-none focus:ring-2 focus:ring-[#66BB6A]"
            />
            <button
              type="button"
              onClick={() => handleTest()}
              disabled={status === 'checking'}
              className="px-3 py-2 rounded-xl bg-slate-900 dark:bg-[#2c3847] hover:bg-slate-800 text-white font-extrabold text-xs shadow transition-all active:scale-95 shrink-0"
            >
              Test
            </button>
          </div>
          <p className="text-[10px] text-[#607D8B] dark:text-[#B8C2CC] font-semibold pt-1">
            Example: <code className="bg-slate-100 dark:bg-[#18212B] px-1 py-0.5 rounded">https://onion-quality-backend.onrender.com</code>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#607D8B] hover:text-[#263238] dark:text-[#B8C2CC]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-[#66BB6A] hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
          >
            Save & Apply
          </button>
        </div>

      </div>
    </div>
  );
}
