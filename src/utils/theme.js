// Centralized Theme Helper (Light / Dark Mode)

export function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('theme');
  return saved || 'light';
}

export function applyTheme(theme) {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  const body = document.body;

  if (theme === 'dark') {
    root.classList.add('dark');
    if (body) {
      body.style.backgroundColor = '#121820';
      body.style.color = '#F5F7FA';
    }
  } else {
    root.classList.remove('dark');
    if (body) {
      body.style.backgroundColor = '#F7F8FA';
      body.style.color = '#263238';
    }
  }
  localStorage.setItem('theme', theme);
}
