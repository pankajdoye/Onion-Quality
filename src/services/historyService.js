// History Management Service with LocalStorage Persistence

const HISTORY_KEY = 'onion_scan_history_v2';

export function saveScanRecord(record) {
  if (typeof window === 'undefined' || !record) return;
  try {
    const existing = getRawHistory();
    const newRecord = {
      id: record.id || `RPT-${Date.now().toString().slice(-6)}`,
      timestamp: record.timestamp || Date.now(),
      dateStr: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      timeStr: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      imageSrc: record.imageSrc || null,
      qualityScore: record.qualityScore || record.quality_score || 88,
      grade: record.grade || (record.grade_a >= 70 ? 'Grade A' : record.grade_a >= 50 ? 'Grade B' : 'URS'),
      qualityStatus: record.qualityStatus || (record.grade_a >= 70 ? 'Good' : record.grade_a >= 50 ? 'Average' : 'Poor'),
      gradeA: record.gradeA || record.grade_a || 72,
      gradeB: record.gradeB || record.grade_b || 18,
      urs: record.urs || 10,
      damagedPercent: record.damagedPercent || record.damaged || 12,
      rottenPercent: record.rottenPercent || record.rotten || 5,
      sproutedPercent: record.sproutedPercent || record.sprouted || 3,
      undersizedPercent: record.undersizedPercent || record.undersized || 8,
      onionsCount: record.onionsCount || record.detected_onions_count || 185,
      marketRate: record.marketRate || record.expected_price_formatted || '₹2,600 / quintal',
      bestMarket: record.bestMarket || record.best_market || 'Lasalgaon APMC'
    };

    // Prepend newest first
    const updated = [newRecord, ...existing];
    // Keep max 50 recent records
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated.slice(0, 50)));
    return newRecord;
  } catch (e) {
    console.error('Error saving scan record:', e);
  }
}

function getRawHistory() {
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

  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;

  if (filterRange === 'today') {
    return records.filter(r => (now - (r.timestamp || 0)) <= ONE_DAY);
  }
  if (filterRange === 'last_3_days') {
    return records.filter(r => (now - (r.timestamp || 0)) <= (3 * ONE_DAY));
  }
  if (filterRange === 'this_week') {
    return records.filter(r => (now - (r.timestamp || 0)) <= (7 * ONE_DAY));
  }

  return records;
}

export function getLatestScan() {
  const records = getRawHistory();
  return records.length ? records[0] : null;
}
