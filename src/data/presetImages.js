// Realistic SVG Data URIs for Onion Sample Presets

export const PRESET_SAMPLES = [
  {
    id: 'preset-1',
    title: 'High-Grade Red Onion Batch (Grade A Lot)',
    description: 'Fresh export-quality red onions from Nashik Procurement Hub. Uniform diameter 65-75mm.',
    category: 'Grade A Majority',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    stats: {
      total: 200,
      gradeA: 78,
      gradeB: 16,
      urs: 6,
      damaged: 8,
      rotten: 2,
      sprouted: 2,
      undersized: 5,
      qualityScore: 91,
      confidence: 96,
      avgDiameter: 71,
      avgWeight: 88,
      recommendation: 'Sample exceeds recommended Grade A procurement threshold (Min 65% required).'
    },
    detectedOnions: [
      { id: 1, label: 'Grade A', confidence: 0.98, x: 15, y: 20, width: 22, height: 24, status: 'healthy', size: '74mm' },
      { id: 2, label: 'Grade A', confidence: 0.96, x: 42, y: 18, width: 25, height: 26, status: 'healthy', size: '76mm' },
      { id: 3, label: 'Grade A', confidence: 0.95, x: 70, y: 22, width: 20, height: 22, status: 'healthy', size: '68mm' },
      { id: 4, label: 'Damaged', confidence: 0.92, x: 18, y: 55, width: 21, height: 23, status: 'damaged', size: '70mm', defectNote: 'Skin splitting' },
      { id: 5, label: 'Grade A', confidence: 0.97, x: 45, y: 52, width: 24, height: 25, status: 'healthy', size: '72mm' },
      { id: 6, label: 'Undersized', confidence: 0.91, x: 75, y: 58, width: 15, height: 16, status: 'undersized', size: '44mm', defectNote: '<45mm diameter' },
    ]
  },
  {
    id: 'preset-2',
    title: 'Mixed Batch — Sprouted & Damaged Lot',
    description: 'Post-monsoon storage batch showing early sprouting signs and mechanical damage.',
    category: 'Mixed / Warning',
    image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    stats: {
      total: 200,
      gradeA: 52,
      gradeB: 28,
      urs: 20,
      damaged: 18,
      rotten: 9,
      sprouted: 14,
      undersized: 12,
      qualityScore: 68,
      confidence: 93,
      avgDiameter: 62,
      avgWeight: 74,
      recommendation: 'Sample fails Grade A standard. High sprouting and rot detected. Downgraded to Grade B/Re-sorting.'
    },
    detectedOnions: [
      { id: 1, label: 'Sprouted', confidence: 0.95, x: 12, y: 15, width: 24, height: 28, status: 'sprouted', size: '65mm', defectNote: 'Green shoot 18mm' },
      { id: 2, label: 'Rotten', confidence: 0.94, x: 40, y: 18, width: 23, height: 24, status: 'rotten', size: '60mm', defectNote: 'Black mold core' },
      { id: 3, label: 'Grade A', confidence: 0.96, x: 68, y: 15, width: 22, height: 23, status: 'healthy', size: '69mm' },
      { id: 4, label: 'Damaged', confidence: 0.92, x: 15, y: 55, width: 25, height: 25, status: 'damaged', size: '67mm', defectNote: 'Severe surface bruise' },
      { id: 5, label: 'Sprouted', confidence: 0.93, x: 44, y: 56, width: 22, height: 26, status: 'sprouted', size: '61mm', defectNote: 'Active germination' },
      { id: 6, label: 'Undersized', confidence: 0.89, x: 74, y: 54, width: 14, height: 15, status: 'undersized', size: '41mm', defectNote: 'Below 45mm threshold' }
    ]
  },
  {
    id: 'preset-3',
    title: 'Standard Procurement Lot (Market Sample)',
    description: 'Typical farmer procurement lot with standard size distribution and low defect rate.',
    category: 'Procurement Standard',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    stats: {
      total: 200,
      gradeA: 72,
      gradeB: 18,
      urs: 10,
      damaged: 12,
      rotten: 5,
      sprouted: 3,
      undersized: 8,
      qualityScore: 87,
      confidence: 94,
      avgDiameter: 68,
      avgWeight: 82,
      recommendation: 'Sample meets recommended Grade A procurement threshold.'
    },
    detectedOnions: [
      { id: 1, label: 'Grade A', confidence: 0.97, x: 14, y: 18, width: 23, height: 24, status: 'healthy', size: '70mm' },
      { id: 2, label: 'Grade A', confidence: 0.98, x: 42, y: 15, width: 24, height: 25, status: 'healthy', size: '72mm' },
      { id: 3, label: 'Damaged', confidence: 0.91, x: 71, y: 20, width: 20, height: 21, status: 'damaged', size: '64mm', defectNote: 'Cut neck' },
      { id: 4, label: 'Grade A', confidence: 0.96, x: 18, y: 52, width: 22, height: 23, status: 'healthy', size: '68mm' },
      { id: 5, label: 'Rotten', confidence: 0.93, x: 46, y: 54, width: 21, height: 22, status: 'rotten', size: '63mm', defectNote: 'Soft rot rot' },
      { id: 6, label: 'Grade A', confidence: 0.95, x: 73, y: 52, width: 23, height: 24, status: 'healthy', size: '71mm' }
    ]
  }
];
