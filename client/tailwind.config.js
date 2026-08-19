/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mist: {
          DEFAULT: '#F1F3F6',
          soft: '#FFFFFF',
          line: '#E3E7EE',
        },
        graphite: {
          DEFAULT: '#101319',
          soft: '#171B23',
          softer: '#20242E',
          line: '#2B303C',
        },
        signal: {
          DEFAULT: '#5B5FEF',
          dim: '#4548C4',
          tint: '#EDEDFD',
        },
        coral: {
          DEFAULT: '#E2574C',
          tint: '#FDEBE9',
        },
        mint: {
          DEFAULT: '#2BB673',
          tint: '#E7F8EF',
        },
      },
      fontFamily: {
        display: ['"Sora"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,19,25,0.04), 0 10px 30px -12px rgba(16,19,25,0.14)',
        phone: '0 2px 8px rgba(16,19,25,0.08), 0 30px 60px -20px rgba(16,19,25,0.35)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop': {
          '0%': { transform: 'scale(0.97)', opacity: '0.6' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-out',
        pop: 'pop 0.18s ease-out',
      },
    },
  },
  plugins: [],
}
