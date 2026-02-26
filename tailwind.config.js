/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#00527f',
        'brand-red': '#a11d21',
        'dark-bg': '#1b1f22',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
     almarai: ['var(--font-almarai)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}