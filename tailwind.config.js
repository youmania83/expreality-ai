/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: "#0B0B0B",
          white: "#F5F5F5",
          gold: "#C6A15B",
        },
      },
    },
  },
  plugins: [],
};