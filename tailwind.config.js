/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#101C2C',
          slate: '#1B2A3A',
          copper: '#D97736',
          'copper-hover': '#C26325',
          'copper-light': '#FDF4EC',
          warm: '#F8F7F4',
          'warm-dark': '#EFECE6',
          dark: '#202A35',
          muted: '#697586',
          border: '#E5E7EB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Manrope', 'sans-serif'],
      },
      maxWidth: {
        'content': '1280px',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
};

