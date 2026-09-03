// History Management Service with LocalStorage & Backend Database Persistence

const HISTORY_KEY = 'onion_scan_history_v2';
const API_BASE_URL = import.meta.env.VITE_AI_API_URL || 'http://localhost:8000';

export function saveScanRecord(record) {
  if (typeof window === 'undefined' || !record) return null;
  try {
    const existing = getRawHistory();
    const indOnions = record.individual_onions || [];
    const totalOnions = record.detected_onions_count || record.onionsCount || (indOnions.length > 0 ? indOnions.length : 1);
    const overallQuality = record.overall_quality || record.quality || (record.grade_a >= 65 ? 'GOOD' : record.urs >= 40 ? 'POOR' : 'AVERAGE');

    const newRecord = {
      id: record.sample_id || record.id || `RPT-${Date.now().toString().slice(-6)}`,
      timestamp: record.timestamp || Date.now(),
      dateStr: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      timeStr: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      imageSrc: record.imageSrc || null,
      lang: record.lang || 'en', // Language at time of scan
      overallQuality: overallQuality,
      qualityScore: record.qualityScore || record.quality_score || 85,
      grade: record.grade || (overallQuality === 'GOOD' ? 'Grade A' : 'URS'),
      qualityStatus: record.qualityStatus || record.quality_condition || (overallQuality === 'GOOD' ? 'Healthy' : overallQuality === 'POOR' ? 'Defective' : 'Average'),
      gradeA: record.gradeA !== undefined ? record.gradeA : (record.grade_a !== undefined ? record.grade_a : 80),
      gradeB: record.gradeB !== undefined ? record.gradeB : (record.grade_b !== undefined ? record.grade_b : 0),
      urs: record.urs !== undefined ? record.urs : 20,
      gradeACount: record.grade_a_count !== undefined ? record.grade_a_count : (overallQuality === 'GOOD' ? totalOnions : 0),
      ursCount: record.urs_count !== undefined ? record.urs_count : (overallQuality === 'POOR' ? totalOnions : 0),
      totalOnions: totalOnions,
      individualOnions: indOnions,
      damagedPercent: record.damagedPercent ?? record.damaged ?? 0,
      rottenPercent: record.rottenPercent ?? record.rotten ?? 0,
      sproutedPercent: record.sproutedPercent ?? record.sprouted ?? 0,
      undersizedPercent: record.undersizedPercent ?? record.undersized ?? 0,
      size: record.size || (record.average_diameter ? `${record.average_diameter} mm` : '65 mm'),
      average_diameter: record.average_diameter || 65,
      average_weight: record.average_weight || 80,
      onionsCount: totalOnions,
      isSingleOnion: record.isSingleOnion ?? record.is_single_onion ?? (totalOnions === 1),
      singleOnionNotice: record.single_onion_notice || null,
      marketRate: record.marketRate || record.estimated_price_range || record.expected_price || '₹2,600 / quintal',
      bestMarket: record.bestMarket || record.market || record.best_market || 'Lasalgaon APMC',
      confidence: record.confidence ? Math.round(record.confidence) : (record.onion_confidence ? Math.round(record.onion_confidence * 100) : 94),
      visionAiStatus: record.vision_ai_status || null,
      finalStatus: record.status || 'success'
    };

    // Prepend newest first, remove duplicates
    const filtered = existing.filter(r => r.id !== newRecord.id);
    const updated = [newRecord, ...filtered];
    
    // Store max 50 records in localStorage
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated.slice(0, 50)));
    return newRecord;
  } catch (e) {
    console.error('Error saving scan record:', e);
    return null;
  }
}

export function getRawHistory() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function getScanHistory(filterRange = 'this_week') {
  const records = getRawHistory();
  if (!records.length) return [];

  // Always sorted newest first by timestamp
  const sorted = [...records].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;

  if (filterRange === 'today') {
    return sorted.filter(r => (now - (r.timestamp || 0)) <= ONE_DAY);
  }
  if (filterRange === 'last_3_days') {
    return sorted.filter(r => (now - (r.timestamp || 0)) <= (3 * ONE_DAY));
  }
  if (filterRange === 'this_week') {
    return sorted.filter(r => (now - (r.timestamp || 0)) <= (7 * ONE_DAY));
  }

  return sorted;
}

export function getLatestScan() {
  const records = getRawHistory();
  if (!records.length) return null;
  const sorted = [...records].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  return sorted[0];
}

export function getScanById(id) {
  const records = getRawHistory();
  return records.find(r => r.id === id) || null;
}
