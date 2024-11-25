/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // Blue
        success: "#10B981", // Green
        warning: "#FACC15", // Yellow
      },
    },
  },
  plugins: [],
};
