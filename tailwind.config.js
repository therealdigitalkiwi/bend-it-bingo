import { type Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'apple-gray': '#f5f5f7',
        'apple-blue': '#0071e3',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif'
        ],
      },
    },
  },
  plugins: [],
} satisfies Config
