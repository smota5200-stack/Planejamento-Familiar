/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        surface: '#111118',
        surface2: '#16161f',
        accent: '#7c5cfc',
        accent2: '#a78bfa',
        green: '#22d3a0',
        amber: '#f59e0b',
        coral: '#f87171',
        blue: '#60a5fa',
        pink: '#f472b6',
        text: '#e8e6f0',
        muted: '#6b6880',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

