/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:
      {
        DEFAULT: '#1A1A19', // Dark
        lightgreen: '#859F3D', // Light Green
        darkgreen: '#31511E', // Dark Green
        light: '#F6FCDF' // light 
      },

    },
  },
  plugins: [],
};
