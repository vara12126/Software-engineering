/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        court: {
          950: '#070F1E',
          900: '#0B192C',
          850: '#0F243E',
          800: '#132F4C',
          700: '#1E3E62',
          600: '#2A527A',
          500: '#3B6A99',
          100: '#E2E8F0',
          50: '#F8FAFC'
        },
        gold: {
          50: '#FFFDF5',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12'
        },
        slate: {
          850: '#151E2E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
        display: ['Cinzel', 'Trajan Pro', 'Georgia', 'serif']
      },
      boxShadow: {
        'court': '0 4px 20px -2px rgba(11, 25, 44, 0.08), 0 2px 6px -1px rgba(11, 25, 44, 0.04)',
        'court-lg': '0 10px 30px -4px rgba(11, 25, 44, 0.12), 0 4px 10px -2px rgba(11, 25, 44, 0.06)',
        'gold-sm': '0 0 12px rgba(217, 119, 6, 0.25)',
      }
    },
  },
  plugins: [],
}
