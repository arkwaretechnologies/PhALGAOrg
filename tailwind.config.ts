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
          blue: '#0038A8',
          'blue-dark': '#002070',
          'blue-light': '#1a4fc4',
          red: '#CE1126',
          'red-light': '#e8192e',
          gold: '#FCD116',
          'gold-dark': '#e6bd00',
          white: '#FAFBFF',
          'off-white': '#F0F3FA',
          text: '#0d1b3e',
          'text-muted': '#5a6a8a',
          border: 'rgba(0,56,168,0.12)',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'ph': '0 2px 24px rgba(0,56,168,0.07)',
        'ph-lg': '0 8px 32px rgba(0,56,168,0.12)',
      },
      animation: {
        'pulse-ring': 'pulse-ring 4s ease-in-out infinite',
        'spin-slow': 'spin-slow 30s linear infinite',
        'slide-up': 'slide-up 0.6s ease both',
      },
      keyframes: {
        'pulse-ring': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
