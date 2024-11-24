/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      'moss-green': {
        '50': '#f5f9f4',
        '100': '#e7f3e5',
        '200': '#cfe6cc',
        '300': '#afd5aa',
        '400': '#7bb573',
        '500': '#57984f',
        '600': '#447c3d',
        '700': '#376233',
        '800': '#304f2c',
        '900': '#284126',
        '950': '#112310',
      },
      'snow-drift': {
        '50': '#f0f2ef',
        '100': '#e3e7e0',
        '200': '#c5cec1',
        '300': '#a0ad9b',
        '400': '#7a8c75',
        '500': '#5f715b',
        '600': '#4b5a47',
        '700': '#3e493c',
        '800': '#343d32',
        '900': '#2e342d',
        '950': '#181c17',
      },
    },
    extend: {},
  },
  plugins: [],
}