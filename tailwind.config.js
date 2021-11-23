module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#1d81cf',
        'cloudy-blue': '#b7bed8',
        'blue-grey-two': '#6f78a0'
      },
      fontSize: {
        sm2: '0.8125rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
