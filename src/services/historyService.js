// History Management Service with LocalStorage Persistence

const HISTORY_KEY = 'onion_scan_history_v2';

export function saveScanRecord(record) {
  if (typeof window === 'undefined' || !record) return null;
  try {
    const existing = getRawHistory();
    const newRecord = {
      id: record.id || `RPT-${Date.now().toString().slice(-6)}`,
      timestamp: record.timestamp || Date.now(),
      dateStr: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      timeStr: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      imageSrc: record.imageSrc || null,
      lang: record.lang || 'en', // Language at time of scan
      qualityScore: record.qualityScore || record.quality_score || 85,
      grade: record.grade || (record.grade_a >= 70 ? 'Grade A' : record.grade_a >= 50 ? 'Grade B' : 'URS'),
      qualityStatus: record.qualityStatus || (record.grade_a >= 70 ? 'Healthy' : record.grade_a >= 50 ? 'Average' : 'Defective'),
      gradeA: record.gradeA || record.grade_a || 75,
      gradeB: record.gradeB || record.grade_b || 18,
      urs: record.urs || 7,
      damagedPercent: record.damagedPercent ?? record.damaged ?? 4,
      rottenPercent: record.rottenPercent ?? record.rotten ?? 1,
      sproutedPercent: record.sproutedPercent ?? record.sprouted ?? 1,
      undersizedPercent: record.undersizedPercent ?? record.undersized ?? 5,
      size: record.size || (record.average_diameter ? `${record.average_diameter} mm` : '65 mm'),
      average_diameter: record.average_diameter || 65,
      average_weight: record.average_weight || 80,
      onionsCount: record.onionsCount || record.detected_onions_count || 1,
      isSingleOnion: record.isSingleOnion ?? record.is_single_onion ?? true,
      singleOnionNotice: record.single_onion_notice || null,
      marketRate: record.marketRate || record.expected_price || '₹2,600 / quintal',
      bestMarket: record.bestMarket || record.best_market || 'Lasalgaon APMC'
    };

    // Prepend newest first
    const updated = [newRecord, ...existing];
    // Store max 50 records
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
