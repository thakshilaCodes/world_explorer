/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Add this line to enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Optional: Customize your dark mode colors
        dark: {
          100: '#1E293B',
          200: '#0F172A',
          // Add more shades as needed
        }
      },
    },
  },
  plugins: [],
}