/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        google: "#DB4437",
        facebook: "#1877F2",
      },
    },
  },
  plugins: [],
};
