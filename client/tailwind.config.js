/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',   // Your source files
    './public/**/*.{html,js}',       // Add public folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
