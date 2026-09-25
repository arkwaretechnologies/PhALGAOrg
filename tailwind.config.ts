import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ph: {
          // Institutional base
          navy: '#0B2A5B',
          'navy-deep': '#061A3B',
          'navy-soft': '#1B3B73',
          ink: '#0E1A2B',
          muted: '#5C6577',
          // Philippine flag, used as accents
          brand: '#0038A8',
          crimson: '#B31B2C',
          sun: '#FCD116',
          // Champagne, taken from the 2025–2026 officers photograph
          gold: '#B8904A',
          'gold-deep': '#8A6A2E',
          'gold-light': '#E6D2A6',
          // Surfaces
          paper: '#FAF8F3',
          mist: '#F3EFE7',
          line: '#E6E0D4',
        },
      },
      fontFamily: {
        display: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(14,26,43,0.04), 0 8px 24px -12px rgba(14,26,43,0.12)',
        lift: '0 2px 4px rgba(14,26,43,0.04), 0 24px 48px -20px rgba(11,42,91,0.28)',
      },
      maxWidth: {
        site: '1240px',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-reverse': {
          from: { transform: 'translateX(calc(-100% - var(--gap)))' },
          to: { transform: 'translateX(0)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        shine: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-reverse': 'marquee-reverse var(--duration) linear infinite',
        'spin-slow': 'spin-slow 90s linear infinite',
        shine: 'shine 6s linear infinite',
      },
    },
  },
  plugins: [],
}
export default config
