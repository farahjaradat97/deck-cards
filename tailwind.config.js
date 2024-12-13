/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],     purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  dark:false,
  theme: {
    
    extend: {},
  },
  plugins: [],
}

