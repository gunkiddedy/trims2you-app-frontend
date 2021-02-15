module.exports = {
  purge: {
		mode: 'layers',
		content: ['./public/**/*.html', './src/**/*.vue'],
	},
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '28-persen': '28%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
