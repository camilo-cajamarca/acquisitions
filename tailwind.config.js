/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3d4c6b',
          50: '#f5f6f8',
          100: '#e9ebef',
          200: '#d3d7df',
          300: '#b0b8c7',
          400: '#8893a9',
          500: '#6a7690',
          600: '#3d4c6b',
          700: '#4a5a7a',
          800: '#3f4d64',
          900: '#374254',
        },
        secondary: {
          DEFAULT: '#00d9c0',
          50: '#e6fffe',
          100: '#ccfffc',
          200: '#99fff9',
          300: '#66fff6',
          400: '#33fff3',
          500: '#00d9c0',
          600: '#00ae9a',
          700: '#008274',
          800: '#00574e',
          900: '#002b27',
        },
        accent: {
          DEFAULT: '#6b7fc1',
          50: '#f3f5fb',
          100: '#e7ebf7',
          200: '#cfd7ef',
          300: '#b7c3e7',
          400: '#9fafdf',
          500: '#6b7fc1',
          600: '#5566a9',
          700: '#424d7f',
          800: '#2f3455',
          900: '#1c1b2b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
