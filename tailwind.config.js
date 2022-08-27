const dt = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      sm: '0.8em',
      lg: '1.2em',
      xl: '1.4em',
    },
    extend: {
      fontFamily: {
        readex: ['Readex Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
