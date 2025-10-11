// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")], // ← this line is required!
  theme: {
    extend: {
      colors: {
        background: {
          light: "#fef9f3",
          peach: "#f9d6c2",
          coral: "#f6b092",
        },
        card: "#fffaf7",
        navy: "#1e1b4b", // headings, icons
        placeholder: "#9ca3af",
        accent: {
          yellow: "#fde047", // upload btn
          gold: "#fcd34d", // plus icon
        },
        grayish: "#94a3b8", // bottom nav icons
      },
    },
  },
  plugins: [],
};
