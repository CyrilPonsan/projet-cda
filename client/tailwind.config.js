/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    colors: {
      blue: "#140a82",
      stone: {
        100: "#f5f5f4",
        200: "#e7e5e4",
        300: "#d6d3d1",
        400: "#a8a29e",
        500: "#78716c",
      },
      orange: "#FF5E1A",
      green: "#24A640",
      black: "#140a82",
      red: "red",
      white: "white",
      gray: "rgb(183, 183, 183",
      darkgray: "#363535",
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/forms")],
};
