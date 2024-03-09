/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#6100FF',
        'custom-cyan': '#00FFD1',
      },
      gradientColorStops: theme => ({
        'custom-purple': theme('colors.custom-purple'),
        'custom-cyan': theme('colors.custom-cyan'),
      }),
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],

}

