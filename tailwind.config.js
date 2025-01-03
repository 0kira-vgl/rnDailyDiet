/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        RED: {
          900: "#BF3B44",
          500: "#F3BABD",
          300: "#F4E6E7",
        },
        GREEN: {
          900: "#639339",
          500: "#CBE4B4",
          300: "#E5F0DB",
        },
        GRAY: {
          900: "#1B1D1E",
          800: "#333638",
          700: "#5C6265",
          600: "#B9BBBC",
          500: "#DDDEDF",
          400: "#EFF0F0",
          300: "#FAFAFA",
          100: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
