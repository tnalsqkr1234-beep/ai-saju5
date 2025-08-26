/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css,scss}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",   // slate-900
        accent:  "#735233",   // brand brown accent
        surface: "#111827"    // gray-900
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Apple SD Gothic Neo", "Noto Sans KR", "Helvetica", "Arial", "sans-serif"]
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(0,0,0,0.12)'
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
