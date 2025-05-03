/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f5f5',
          100: '#e0e0e0',
          200: '#c2c2c2',
          300: '#a3a3a3',
          400: '#858585',
          500: '#666666',
          600: '#4d4d4d',
          700: '#333333',
          800: '#1a1a1a',
          900: '#0a0a0a',
          950: '#000000',
        },
        secondary: {
          50: '#fff0f0',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff7e7e',
          500: '#ff5a5f',
          600: '#ff3333',
          700: '#ee2724',
          800: '#c41d1b',
          900: '#991b19',
        },
        accent: {
          50: '#e5f3ff',
          100: '#cce7ff',
          200: '#99d0ff',
          300: '#66b8ff',
          400: '#33a1ff',
          500: '#007aff',
          600: '#0062cc',
          700: '#004999',
          800: '#003166',
          900: '#001833',
        },
        success: {
          500: '#34c759',
        },
        warning: {
          500: '#ff9500',
        },
        error: {
          500: '#ff3b30',
        },
      },
      fontFamily: {
        sans: [
          'SF Pro Display',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
      gridTemplateColumns: {
        'products-4': 'repeat(4, minmax(0, 1fr))',
        'products-3': 'repeat(3, minmax(0, 1fr))',
        'products-2': 'repeat(2, minmax(0, 1fr))',
        'products-1': 'repeat(1, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}