/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B4D2E', // deep temple-green
          dark: '#143D23'
        },
        accent: {
          DEFAULT: '#8B1E1E', // maroon/red
          dark: '#731818'
        },
        highlight: {
          DEFAULT: '#D4A017', // mustard-gold
          dark: '#B8860B'
        },
        surface: {
          DEFAULT: '#FDF6E9', // warm cream
          dark: '#1A1816'
        },
        'on-surface': {
          DEFAULT: '#231F1B', // near-black
          dark: '#EBE5DF'
        }
      },
      fontFamily: {
        heading: ['Poppins', 'Hind', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        // 8px rhythm is standard in tailwind (1 = 0.25rem = 4px)
      },
      borderRadius: {
        'card': '12px',
        'button': '12px',
        'badge': '16px',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
