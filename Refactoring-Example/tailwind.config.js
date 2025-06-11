/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./dist/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./node_modules/vue-tailwind-datepicker/**/*.js"],
  theme: {
    extend: {
      colors: {
        "vtd-primary": colors.sky, // Light mode Datepicker color
        "vtd-secondary": colors.black, // Dark mode Datepicker color
      },
      screens: {
        tablet: "768px",
        pc: "1200px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
