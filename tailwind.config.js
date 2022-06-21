/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        green: {
          500: "#00B37E",
          700: "#00875F",
          900: "#015F43",
        },
        sky: {
          300: "#81D8F7",
        },
        orange: {
          400: "#FBA94C",
        },
        red: {
          400: "#F75A68",
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
    },
  },
  plugins: [],
};
