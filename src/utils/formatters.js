// Utility formatters for OnionGrade AI

export function formatPercent(value) {
  return `${Math.round(value)}%`;
}

export function formatDate(dateString) {
  if (!dateString) return new Date().toLocaleDateString();
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function getScoreColor(score) {
  if (score >= 85) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
  if (score >= 70) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-rose-600 bg-rose-50 border-rose-200';
}

export function getGradeBadge(grade) {
  switch (grade) {
    case 'Grade A':
      return { label: 'Grade A (Premium)', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', dot: 'bg-emerald-500' };
    case 'Grade B':
      return { label: 'Grade B (Standard)', bg: 'bg-amber-100 text-amber-800 border-amber-300', dot: 'bg-amber-500' };
    case 'URS':
      return { label: 'URS (Reject)', bg: 'bg-rose-100 text-rose-800 border-rose-300', dot: 'bg-rose-500' };
    default:
      return { label: grade, bg: 'bg-slate-100 text-slate-800 border-slate-300', dot: 'bg-slate-500' };
  }
}
