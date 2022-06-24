/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        blur: "url(/src/assets/blur-background.png)",
      },
      colors: {
        sky: {
          400: "#03F7EB",
        },
        orange: {
          400: "#FBA94C",
        },
        red: {
          400: "#F75A68",
        },
        rose: {
          700: "#AB2346",
        },
        neutral: {
          300: "#E1E1E6",
          400: "#C4C4CC",
          500: "#8D8D99",
          600: "#323238",
          800: "#121214",
          900: "#09090A",
        },
      },
      fontFamily: {
        sans: "Roboto, sans-serif",
      },
    },
  },
  plugins: [],
};
