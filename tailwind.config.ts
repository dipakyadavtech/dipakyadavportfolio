import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '2rem', lg: '4rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: '#06070B',
          raised: '#0B0D14',
          elevated: '#11141C',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          strong: 'rgba(255,255,255,0.14)',
        },
        ink: {
          DEFAULT: '#EAEBF0',
          muted: '#9CA0AE',
          subtle: '#5E6271',
        },
        accent: {
          cyan: '#5BEAFF',
          violet: '#A78BFA',
          gold: '#F5C06A',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px)',
        'accent-radial':
          'radial-gradient(600px circle at 50% 0%, rgba(91,234,255,0.12), transparent 60%)',
      },
      boxShadow: {
        glow: '0 0 60px -10px rgba(91,234,255,0.35)',
        'glow-violet': '0 0 60px -10px rgba(167,139,250,0.4)',
        card: '0 30px 80px -40px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
        'pulse-glow': 'pulse-glow 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
