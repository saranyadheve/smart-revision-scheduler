/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: "#F4F7F5",
        "primary-green": "#A3B18A",
        "secondary-green": "#588157",
        "accent-beige": "#DAD7CD",
        "text-primary": "#2F3E46",
        "text-secondary": "#6B7A7A",
        primary: {
          DEFAULT: "#A3B18A",
          dark: "#588157",
          light: "#EAF0EA",
        },
        slate: {
          950: "#020617",
        }
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shine': 'shine 2s infinite',
      },
      keyframes: {
        shine: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        }
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      }
    },
  },
  plugins: [],
}
