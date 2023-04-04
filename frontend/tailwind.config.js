/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        100: '100px',
        200: '200px',
        300: '300px',
        350: '350px',
        400: '400px',
        500: '500px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        0.7: '3px',
        80: '80px',
        150: '150px',
        250: '250px',
        400: '400px',
        450: '450px',
        500: '500px',
        550: '550px',
        600: '600px',
        760: '760px',
        780: '780px',
        800: '800px',
      },
    },
  },
  plugins: [],
}

