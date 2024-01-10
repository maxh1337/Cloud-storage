/** @type {import('tailwindcss').Config} */
const twColors = require("tailwindcss/colors");

const colors = {
  transparent: twColors.transparent,
  gray: "#281c30",
  gray1: "#392e40",
  gray2: "#9ca3af",
  white: twColors.white,
  red: "#db1035",
  blue: "#1677ff",
  bg: "linear-gradient(90deg, #100e19 0%, #1c1326 46.87%, #100e19 100%)",
};

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors,
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
