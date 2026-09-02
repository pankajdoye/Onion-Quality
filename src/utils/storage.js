// Offline-friendly LocalStorage Manager for Smart Onion AI

const RECORDS_KEY = 'smart_onion_farmer_records';
const ALERTS_KEY = 'smart_onion_price_alerts';

export function getSavedRecords() {
  try {
    const raw = localStorage.getItem(RECORDS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading saved records:', e);
  }
  // Default sample history records (Requirement #13)
  return [
    {
      id: 'REC-101',
      date: '25 Aug 2026',
      gradeA: 72,
      price: '₹2,600',
      quality: 'Good Quality',
      score: 87,
      market: 'Lasalgaon APMC'
    },
    {
      id: 'REC-100',
      date: '18 Aug 2026',
      gradeA: 65,
      price: '₹2,400',
      quality: 'Good Quality',
      score: 79,
      market: 'Nashik Mandi'
    },
    {
      id: 'REC-099',
      date: '10 Aug 2026',
      gradeA: 58,
      price: '₹2,200',
      quality: 'Average Quality',
      score: 68,
      market: 'Pune APMC'
    }
  ];
}

export function saveFarmerRecord(record) {
  try {
    const current = getSavedRecords();
    const updated = [record, ...current];
    localStorage.setItem(RECORDS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving record:', e);
    return [];
  }
}

export function getPriceAlerts() {
  try {
    const raw = localStorage.getItem(ALERTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [{ targetPrice: 3000, market: 'Lasalgaon APMC', active: true }];
}

export function savePriceAlert(targetPrice, market = 'Lasalgaon APMC') {
  try {
    const alerts = getPriceAlerts();
    const newAlert = { targetPrice: Number(targetPrice), market, active: true, created: new Date().toLocaleDateString() };
    const updated = [newAlert, ...alerts];
    localStorage.setItem(ALERTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
}
