module.exports = {
  	purge: {
		mode: 'layers',
		content: ['./public/**/*.html', './src/**/*.vue'],
	},
  	darkMode: false, // or 'media' or 'class'
  	theme: {
		screens: {
			'xs': {'min': '320px', 'max': '639px'},
			// => @media (min-width: 640px) { ... }

			'sm': '640px',
			// => @media (min-width: 640px) { ... }

			'md': '768px',
			// => @media (min-width: 768px) { ... }

			'lg': '1024px',
			// => @media (min-width: 1024px) { ... }

			'xl': '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
			
			// THIS BELOW USING MIN MAX
			// 'xs': {'min': '320px', 'max': '639px'},
			// 'sm': {'min': '640px', 'max': '767px'},
			// 'md': {'min': '768px', 'max': '1023px'},
			// 'lg': {'min': '1024px', 'max': '1279px'},
			// 'xl': {'min': '1280px', 'max': '1535px'},
			// '2xl': {'min': '1536px'},
		},
		minWidth: {
			'1/12': '6%',
			'1/8': '12%',
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
			'full': '100%',
		},
    	extend: {
      		width: {
        		'28-persen': '28%',
				'30-persen': '30%'
      		}
    	},
  	},
  	variants: {
		accessibility: ['responsive', 'focus-within', 'focus'],
		alignContent: ['responsive'],
		alignItems: ['responsive'],
		alignSelf: ['responsive'],
		animation: ['responsive'],
		appearance: ['responsive'],
		backgroundAttachment: ['responsive'],
		backgroundClip: ['responsive'],
		backgroundColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
		backgroundImage: ['responsive'],
		backgroundOpacity: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
		backgroundPosition: ['responsive'],
		backgroundRepeat: ['responsive'],
		backgroundSize: ['responsive'],
		borderCollapse: ['responsive'],
		borderColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
		borderOpacity: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
		borderRadius: ['responsive'],
		borderStyle: ['responsive'],
		borderWidth: ['responsive'],
		boxShadow: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
		boxSizing: ['responsive'],
		clear: ['responsive'],
		container: ['responsive'],
		cursor: ['responsive'],
		display: ['responsive'],
		divideColor: ['responsive', 'dark'],
		divideOpacity: ['responsive', 'dark'],
		divideStyle: ['responsive'],
		divideWidth: ['responsive'],
		fill: ['responsive'],
		flex: ['responsive'],
		flexDirection: ['responsive'],
		flexGrow: ['responsive'],
		flexShrink: ['responsive'],
		flexWrap: ['responsive'],
		float: ['responsive'],
		fontFamily: ['responsive'],
		fontSize: ['responsive'],
		fontSmoothing: ['responsive'],
		fontStyle: ['responsive'],
		fontVariantNumeric: ['responsive'],
		fontWeight: ['responsive'],
		gap: ['responsive'],
		gradientColorStops: ['responsive', 'dark', 'hover', 'focus'],
		gridAutoColumns: ['responsive'],
		gridAutoFlow: ['responsive'],
		gridAutoRows: ['responsive'],
		gridColumn: ['responsive'],
		gridColumnEnd: ['responsive'],
		gridColumnStart: ['responsive'],
		gridRow: ['responsive'],
		gridRowEnd: ['responsive'],
		gridRowStart: ['responsive'],
		gridTemplateColumns: ['responsive'],
		gridTemplateRows: ['responsive'],
		height: ['responsive', 'hover'],
		inset: ['responsive'],
		justifyContent: ['responsive'],
		justifyItems: ['responsive'],
		justifySelf: ['responsive'],
		letterSpacing: ['responsive'],
		lineHeight: ['responsive'],
		listStylePosition: ['responsive'],
		listStyleType: ['responsive'],
		margin: ['responsive', 'hover'],
		maxHeight: ['responsive'],
		maxWidth: ['responsive'],
		minHeight: ['responsive'],
		minWidth: ['responsive'],
		objectFit: ['responsive'],
		objectPosition: ['responsive'],
		opacity: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
		order: ['responsive'],
		outline: ['responsive', 'focus-within', 'focus'],
		overflow: ['responsive'],
		overscrollBehavior: ['responsive'],
		padding: ['responsive', 'hover'],
		placeContent: ['responsive'],
		placeItems: ['responsive'],
		placeSelf: ['responsive'],
		placeholderColor: ['responsive', 'dark', 'focus'],
		placeholderOpacity: ['responsive', 'dark', 'focus'],
		pointerEvents: ['responsive'],
		position: ['responsive'],
		resize: ['responsive'],
		ringColor: ['responsive', 'dark', 'focus-within', 'focus'],
		ringOffsetColor: ['responsive', 'dark', 'focus-within', 'focus'],
		ringOffsetWidth: ['responsive', 'focus-within', 'focus'],
		ringOpacity: ['responsive', 'dark', 'focus-within', 'focus'],
		ringWidth: ['responsive', 'focus-within', 'focus'],
		rotate: ['responsive', 'hover', 'focus'],
		scale: ['responsive', 'hover', 'focus'],
		skew: ['responsive', 'hover', 'focus'],
		space: ['responsive'],
		stroke: ['responsive'],
		strokeWidth: ['responsive'],
		tableLayout: ['responsive'],
		textAlign: ['responsive'],
		textColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
		textDecoration: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus'],
		textOpacity: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
		textOverflow: ['responsive'],
		textTransform: ['responsive'],
		transform: ['responsive'],
		transformOrigin: ['responsive'],
		transitionDelay: ['responsive'],
		transitionDuration: ['responsive'],
		transitionProperty: ['responsive'],
		transitionTimingFunction: ['responsive'],
		translate: ['responsive', 'hover', 'focus'],
		userSelect: ['responsive'],
		verticalAlign: ['responsive'],
		visibility: ['responsive'],
		whitespace: ['responsive'],
		width: ['responsive'],
		wordBreak: ['responsive'],
		zIndex: ['responsive', 'focus-within', 'focus'],
    	extend: {
      		animation: ['hover', 'focus'],
			tableLayout: ['hover', 'focus'],
    	},
  	},
  	plugins: [],
}
