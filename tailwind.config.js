/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#005B82', // Azul oscuro del logo
          light: '#3B9AC4', // Azul claro del logo
          green: '#8CC63F', // Verde del logo
          bg: '#F3F6F8',
        },
        ink: {
          DEFAULT: '#0E2A3A', // Tinta azul profunda en lugar de negro
          soft: '#557083',
        },
        paper: '#F3F6F8',
        line: '#DDE6EC',
        danger: '#D92D20',
        warn: '#B54708',
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', '"Instrument Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
