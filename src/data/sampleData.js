// Historical Reports and Dashboard Metrics Data

export const HISTORICAL_BATCHES = [
  {
    id: 'BATCH-2026-089',
    reportId: 'RPT-89201',
    date: '2026-08-24 14:30',
    center: 'Nashik Main Mandi',
    farmerName: 'Ramesh Patil',
    totalOnions: 250,
    gradeA: 76,
    gradeB: 16,
    urs: 8,
    score: 90,
    confidence: 96,
    status: 'Approved',
    defects: { damaged: 6, rotten: 2, sprouted: 1, undersized: 5 }
  },
  {
    id: 'BATCH-2026-088',
    reportId: 'RPT-89200',
    date: '2026-08-24 11:15',
    center: 'Lasalgaon Procurement Hub',
    farmerName: 'Suresh Deshmukh',
    totalOnions: 200,
    gradeA: 72,
    gradeB: 18,
    urs: 10,
    score: 87,
    confidence: 94,
    status: 'Approved',
    defects: { damaged: 12, rotten: 5, sprouted: 3, undersized: 8 }
  },
  {
    id: 'BATCH-2026-087',
    reportId: 'RPT-89199',
    date: '2026-08-23 16:45',
    center: 'Pune Agricultural Yard',
    farmerName: 'Anil Pawar',
    totalOnions: 180,
    gradeA: 54,
    gradeB: 26,
    urs: 20,
    score: 69,
    confidence: 92,
    status: 'Flagged',
    defects: { damaged: 16, rotten: 9, sprouted: 11, undersized: 10 }
  },
  {
    id: 'BATCH-2026-086',
    reportId: 'RPT-89198',
    date: '2026-08-23 09:30',
    center: 'Lasalgaon Procurement Hub',
    farmerName: 'Vikram Jadhav',
    totalOnions: 300,
    gradeA: 82,
    gradeB: 12,
    urs: 6,
    score: 93,
    confidence: 97,
    status: 'Approved',
    defects: { damaged: 5, rotten: 2, sprouted: 1, undersized: 4 }
  },
  {
    id: 'BATCH-2026-085',
    reportId: 'RPT-89197',
    date: '2026-08-22 15:20',
    center: 'Solapur APMC',
    farmerName: 'Ganesh Shinde',
    totalOnions: 220,
    gradeA: 48,
    gradeB: 28,
    urs: 24,
    score: 62,
    confidence: 91,
    status: 'Rejected',
    defects: { damaged: 22, rotten: 14, sprouted: 12, undersized: 16 }
  },
  {
    id: 'BATCH-2026-084',
    reportId: 'RPT-89196',
    date: '2026-08-22 10:10',
    center: 'Nashik Main Mandi',
    farmerName: 'Mahesh Kulkarni',
    totalOnions: 210,
    gradeA: 70,
    gradeB: 20,
    urs: 10,
    score: 85,
    confidence: 95,
    status: 'Approved',
    defects: { damaged: 10, rotten: 4, sprouted: 4, undersized: 8 }
  }
];

export const QUALITY_TREND_DATA = [
  { batch: 'Batch #81', score: 82, gradeA: 68, urs: 12 },
  { batch: 'Batch #82', score: 85, gradeA: 71, urs: 10 },
  { batch: 'Batch #83', score: 89, gradeA: 75, urs: 7 },
  { batch: 'Batch #84', score: 85, gradeA: 70, urs: 10 },
  { batch: 'Batch #85', score: 62, gradeA: 48, urs: 24 },
  { batch: 'Batch #86', score: 93, gradeA: 82, urs: 6 },
  { batch: 'Batch #87', score: 69, gradeA: 54, urs: 20 },
  { batch: 'Batch #88', score: 87, gradeA: 72, urs: 10 },
  { batch: 'Batch #89', score: 90, gradeA: 76, urs: 8 },
];

export const DEFECT_ANALYSIS_DATA = [
  { category: 'Damaged', percentage: 12, count: 24, severity: 'Medium', color: '#f59e0b' },
  { category: 'Rotten', percentage: 5, count: 10, severity: 'High', color: '#ef4444' },
  { category: 'Sprouted', percentage: 3, count: 6, severity: 'Low', color: '#8b5cf6' },
  { category: 'Undersized', percentage: 8, count: 16, severity: 'Medium', color: '#3b82f6' }
];

export const SIZE_DISTRIBUTION_DATA = [
  { category: 'Small (<50mm)', percentage: 15, count: 30 },
  { category: 'Medium (50-75mm)', percentage: 55, count: 110 },
  { category: 'Large (>75mm)', percentage: 30, count: 60 },
];

export const DEFECT_TYPE_DETAILS = [
  {
    type: 'Damaged',
    icon: 'AlertTriangle',
    percentage: 12,
    count: 24,
    severity: 'Medium',
    description: 'Physical cuts, skin splitting, mechanical bruises caused during harvesting or transport.',
    threshold: 'Max allowable: 15%'
  },
  {
    type: 'Rotten',
    icon: 'Biohazard',
    percentage: 5,
    count: 10,
    severity: 'High',
    description: 'Fungal decay, neck rot, or bacterial soft rot causing bulb soft spots and odor.',
    threshold: 'Max allowable: 5%'
  },
  {
    type: 'Sprouted',
    icon: 'Sprout',
    percentage: 3,
    count: 6,
    severity: 'Low',
    description: 'Green foliage shoots emerging from bulb top indicating break in dormancy.',
    threshold: 'Max allowable: 8%'
  },
  {
    type: 'Undersized',
    icon: 'Minimize2',
    percentage: 8,
    count: 16,
    severity: 'Medium',
    description: 'Bulb diameter smaller than 45 mm, failing commercial market standards.',
    threshold: 'Max allowable: 10%'
  }
];

export const AGRI_CENTERS = [
  'Lasalgaon Procurement Hub (Nashik)',
  'Nashik Main Mandi (APMC)',
  'Pune Agricultural Yard',
  'Solapur Central Procurement',
  'Pimpalgaon Baswant Hub'
];
