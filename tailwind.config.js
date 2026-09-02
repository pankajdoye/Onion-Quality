/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg: '#121820',
        darksec: '#18212B',
        darkcard: '#1F2933',
        darkinput: '#202A35',
        darkborder: '#374151',
        darktext: '#F5F7FA',
        subtext: '#B8C2CC',
        lightbg: '#F7F8FA',
        lightcard: '#FFFFFF',
        lighttext: '#263238',
        lightsubtext: '#607D8B',
        agriGreen: '#66BB6A',
        agriWarning: '#F59E0B',
        agriError: '#EF5350',
        onion: {
          50: '#fdf4f8',
          100: '#fbe8f2',
          200: '#f7d0e5',
          300: '#f1a9cd',
          400: '#e574aa',
          500: '#d54789',
          600: '#be2b6d',
          700: '#9e1f54',
          800: '#831e47',
          900: '#6f1d3e',
          950: '#460b22',
        },
        agri: {
          green: '#66BB6A',
          emerald: '#2E7D32',
          dark: '#121820',
          amber: '#F59E0B',
          red: '#EF5350',
          navy: '#18212B',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        }
      }
    },
  },
  plugins: [],
}
