/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['Courier New', 'monospace'],
      },
      colors: {
        'wood': '#8B4513',
        'wood-light': '#D2B48C',
        'grass': '#228B22',
        'sky': '#87CEEB',
        'cloud': '#FFFFFF',
        'mountain': '#228B22',
        'dirt': '#8B7355',
      },
      animation: {
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        }
      }
    },
  },
  plugins: [],
}