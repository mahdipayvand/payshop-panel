const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["vazirmatn", ...defaultTheme.fontFamily["sans"]],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

module.exports = tailwindConfig;
