/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend:
    {
      fontFamily: {
        'open-sans': ["'Open Sans'", 'sans-serif']
      },
    },
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-25deg)' },
        '50%': { transform: 'rotate(75deg)' },
      },
      eject: {
        '0%': { transform: 'translate(-50%, -50%) scale(0)' },
        '50%': { transform: 'translate(-50%, -50%) scale(1)' },
        '100%': { transform: 'translate(-50%, -50%) scale(0)' },
      },
    },
    animation: {
      wiggle: 'wiggle .35s ease-in-out',
      eject: 'eject 1s ease-out forwards',
    }
  },
  plugins: [],
};
