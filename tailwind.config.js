module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: {
        // DEFAULT: {
        //   css: {
        //     color: '#000',
        //     fontFamily: "'Source Code Pro', 'monospace'",
        //     whiteSpace: 'pre-line'
        //   }
        // },
        // lg: {
        //   css: {
        //     p: {
        //       marginTop: '1rem',
        //       marginBottom: '1rem'
        //     }
        //   }
        // }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
