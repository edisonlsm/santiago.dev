module.exports = {
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    // compatible with @nuxtjs/color-mode
    // darkSelector: '.dark-mode',
    fontFamily: {
      sans: [
        'Source Code Pro',
        'monospace'
      ]
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#000',
            strong: {
              color: '#000'
            },
            a: {
              color: '#000',
              fontWeight: 'inherit'
            },
            'a:hover': {
              textDecoration: 'underline'
            },
            ul: {
              marginTop: 0,
              marginBottom: 0
            },
            'ul > li': {
              marginTop: 0,
              marginBottom: 0,
              paddingLeft: '0 !important'
            },
            'ul > li::before': {
              content: ''
            },
            'ul > li > p': {
              marginTop: '0 !important',
              marginBottom: '0 !important'
            },
            ' > ul > li > p': {
              marginTop: '0 !important',
              marginBottom: '0 !important'
            }
          }
        },
        dark: {
          css: {
            color: '#27FE14',
            strong: {
              color: '#27FE14'
            },
            a: {
              color: '#27FE14'
            }
          }
        }
      }
    }
  },
  variants: {
    typography: ['dark']
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-padding-safe')()
  ]
}
