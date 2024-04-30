// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./mainWebsite2/**/*.{js,ts,jsx,tsx,mdx}",
    "./themes/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      lightGrey: "#fbfcfc",
      darkerLightGrey: "#f5f7f7",
      veryLightBlue: "#A3b4c8",
      lightBlue: "#0D3350",
      darkBlue: "#05253A",
      lightLightBlue: "#45B9FF",
      lightOrange: "#cc6d3d",
      darkOrange: "#b74803",
      transparent: "transparent",
      black: "#060606",
      white: "#ffff",
      red: "rgba(255, 0, 0, 0.8)",
      green: "rgba(19, 206, 102, 0.8)",
      whiteTint: "rgba(255, 255, 255, 0.5)",
    },
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
  plugins: [
    nextui({}),
    require("@headlessui/tailwindcss"),

    require("@tailwindcss/forms"),
  ],
};
