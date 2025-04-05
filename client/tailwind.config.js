/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // 👈 This enables Tailwind in your React files
  theme: {
    extend: {
      fontFamily: {
        vintage: ['Vintage', 'sans-serif'], // 👈 Custom retro font
      },
    },
  },
  plugins: [],
};
