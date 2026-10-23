import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#13201A',
          night: '#13201A',
          deep: '#0C1611',
          black: '#070E0B',
        },
        'deep-leaf': '#1F3A2B',
        sage: {
          DEFAULT: '#8FA58A',
          light: '#B6C8B2',
          muted: '#6E836A',
        },
        gold: {
          DEFAULT: '#C9A46A',
          light: '#DEBF8A',
          dark: '#A68045',
          pale: '#EBD8B8',
        },
        husk: {
          DEFAULT: '#8A6A43',
          light: '#A58259',
          dark: '#684E2E',
        },
        cream: {
          DEFAULT: '#F4EDE1',
          light: '#FCF9F3',
          dark: '#E2D5C0',
          paper: '#F4EDE1',
        },
        sprout: {
          DEFAULT: '#A3C25A',
          bright: '#BAE06B',
          soft: '#87A446',
        },
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'grain-pattern': "radial-gradient(circle at center, transparent 0, #13201A 100%)",
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.4), 0 0 20px 0 rgba(201, 164, 106, 0.1)',
        'glow-gold': '0 0 30px -5px rgba(201, 164, 106, 0.35)',
        'glow-leaf': '0 0 35px -5px rgba(143, 165, 138, 0.25)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1.5deg)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
