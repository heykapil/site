const dt = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      xs: '0.6em',
      sm: '0.8em',
      lg: '1.2em',
      xl: '1.4em',
      '2xl': '1.6em',
      '3xl': '1.8em',
      '4xl': '2.0em',
      '5xl': '2.2em',
      '6xl': '2.4em',
    },
    extend: {
      fontFamily: {
        readex: ['Readex Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
