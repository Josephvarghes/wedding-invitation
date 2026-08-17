/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        champagne: {
          DEFAULT: '#D4AF37',
          light: '#F3E5AB',
          dark: '#AA820A',
          glow: 'rgba(212, 175, 55, 0.4)',
        },
        cream: {
          DEFAULT: '#FAF7F2',
          light: '#FDFBF7',
          dark: '#EFE7DA',
        },
        emerald: {
          luxury: '#1B3B2B',
          deep: '#122B1E',
          soft: '#254E3A',
        },
        charcoal: {
          DEFAULT: '#2B2B2B',
          light: '#3D3D3D',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive']
      },
      boxShadow: {
        gold: '0 10px 30px -5px rgba(212, 175, 55, 0.25)',
        'gold-lg': '0 20px 50px -10px rgba(212, 175, 55, 0.4)',
        emerald: '0 20px 40px -10px rgba(27, 59, 43, 0.3)',
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.7)' },
        }
      }
    },
  },
  plugins: [],
}
