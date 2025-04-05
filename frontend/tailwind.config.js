/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }, // smaller bounce
        },
      },
      animation: {
        'bounce-subtle': 'bounce-subtle 1s infinite',
      },
    },
  },
  plugins: [],
};
