/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef4ff',
          100: '#dbe6ff',
          200: '#bcd0ff',
          300: '#8eb0ff',
          400: '#6588ff',
          500: '#4660ff',
          600: '#3147e8',
          700: '#2335b8',
          800: '#1f2c93',
          900: '#1d2875',
        },
        ink: {
          950: '#05070d',
          900: '#0a0d17',
          800: '#0f1320',
          700: '#171c2c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 20px 60px -20px rgba(70, 96, 255, 0.5)',
        'glow-purple': '0 20px 60px -20px rgba(168, 85, 247, 0.5)',
        'card': '0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 24px -10px rgba(0,0,0,0.5)',
      },
      animation: {
        'float-1': 'float1 14s ease-in-out infinite',
        'float-2': 'float2 16s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float1: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-12px,0)' },
        },
        float2: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,10px,0)' },
        },
        fadeInUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
