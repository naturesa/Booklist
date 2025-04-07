// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-light': '#ACB6E5',
        'custom-dark': '#74ebd5',
      },
    },
  },
  plugins: [],
};
