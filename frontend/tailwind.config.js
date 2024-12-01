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
      'cod-gray': {
        '50': '#f6f6f6',
        '100': '#e7e7e7',
        '200': '#d1d1d1',
        '300': '#b0b0b0',
        '400': '#888888',
        '500': '#6d6d6d',
        '600': '#5d5d5d',
        '700': '#4f4f4f',
        '800': '#454545',
        '900': '#3d3d3d',
        '950': '#0c0c0c',
    },
    },
    extend: {},
  },
  plugins: [],
}