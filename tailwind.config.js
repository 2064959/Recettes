/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        slideInDown: 'slideInDown 0.5s ease-out',
        slideOutRight: 'slideOutRight 0.5s ease-out',
      },
      keyframes: {
        slideInDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
      colors: {
        'blue': '#306bac',
        'orange': '#F57A00',
        'gray': '#D0CCD0',
        'lightgray': '#e7e7e7',
        'offwhite': '#FBFCFF',
        'dark': '#121420',
        'softdark': '#1A1C23',
        'red' : '#FF0000',
        'darkwhite': '#F0F0F0',
        'darkgray': '#21253a',
        'green': '#22d722',
        'darkergray': '#1A1C23',
      },
      backgroundColor: {
        'bleu': '#306bac',
        'red' : '#FF0000',
        'gray': '#727172',
      },
      placeholderColor: {
        'gray': '#727172',
        'orange': '#F57A00',
      },
    },
    screens: {
        'xxxs': '280px',
        'xxs': '320px',
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
    },
  },
  variants: {
    extend: {
      borderColor: ['focus-visible'],
      opacity: ['disabled'],
      backgroundImage: ['dark'],
    },
  },
  plugins: [],
}