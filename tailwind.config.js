// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        livvic: ["var(--font-livvic)"],
      },
      colors: {
        customGray: "#f4f4f5",
        lightBlue: "#0D3350",
        lightOrange: "#cc6d3d",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({})],
};
