/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07090e',
          900: '#0b0f17',
          850: '#0e1420',
          800: '#131b2c',
          700: '#1b263b',
          600: '#2d3b55',
        },
        primary: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4', // Cyan accent
          600: '#0891b2',
          700: '#0e7490',
        },
        accent: {
          purple: '#8b5cf6',
          emerald: '#10b981',
          amber: '#f59e0b',
        },
        coral: {
          400: '#ff6b7b',
          500: '#ff416c',
          600: '#e02856',
        },
        sunset: {
          400: '#ff9057',
          500: '#ff6036',
          600: '#e64a20',
        },
        neon: {
          cyan: '#00f2fe',
          blue: '#3b82f6',
          purple: '#a855f7',
          pink: '#ec4899',
        },
      },
      fontFamily: {
        display: ['Outfit', 'Inter', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 30px -4px rgba(6, 182, 212, 0.55)',
        'glow-blue': '0 0 30px -4px rgba(59, 130, 246, 0.55)',
        'glow-purple': '0 0 30px -4px rgba(168, 85, 247, 0.55)',
        'glow-coral': '0 0 35px -4px rgba(255, 65, 108, 0.55)',
        'glow-sunset': '0 0 35px -4px rgba(255, 96, 54, 0.55)',
        'press-card': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'blob-float': 'blobFloat 12s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blobFloat: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(15px, 20px) scale(1.05)' },
          '100%': { transform: 'translate(-10px, 10px) scale(0.98)' },
        }
      }
    },
  },
  plugins: [],
};
