/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#000000',
        dark: {
          bg: '#121212',
          card: '#1e1e1e',
        },
        light: {
          bg: '#ffffff',
          card: '#f3f4f6',
        },
      },
    },
  },
  plugins: [],
};
