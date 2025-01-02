/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'b1': '#121212',
        'b2': '#00a97f',
        'b3': '#a9cec2',
        'b4': '#8685ef',
        'b5': '#1da4b5',
        'b6': '#e76d83',
        't1': '#aca9bb',
      }
    },
  },
  plugins: [],
}

