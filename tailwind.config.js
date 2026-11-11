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
          dark: '#005B82',   // Azul oscuro EXACTO del logo
          light: '#3B9AC4',  // Azul claro EXACTO del logo
          green: '#8CC63F',  // Verde EXACTO del logo
          bg: '#F4F7F9'      // Fondo gris azulado muy claro para descansar la vista
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'blob': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      },
      animation: {
        'blob': 'blob 7s infinite',
      }
    },
  },
  plugins: [],
}