/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {

    fontFamily: {
      montser: ['Montserrat', 'sans-serif'],
      intercursive: ['Delicious Handrawn', 'cursive'
      ],
      interer: ['Inter', 'sans-serif'],
    },
    screens: {
      'sm': '640px',
      'ms': '760px',
      'md': '868px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'

    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}