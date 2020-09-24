const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    extend: {
      colors: {
        tokyosky: '#00012D',
        darkteal: '#041628',
        retropink: '#BA2D7E',
        lightblue: '#C6D0EB',
        darkblue: '#04142D',
        retroteal: '#6CE3D4',
        neonhaze: '#0E4985',
        infoblue: '#2F40EB',
        retrogreen: '#80D34D',
        retroorange: '#fd7817',
        retroyellow: '#fed318',
        retrored: '#fd3458',
        dangerred: '#F1114D',
      }
    },
    fontFamily: {
      'h1' : ['"Uni Neue W05 Black"','serif'],
      'h2' : ['"Uni Neue W05 Bold"','serif'],
      'body' : ['"Uni Neue W05 Regular"', 'serif']
    },
    typography: {
      default: {
        css: {
          color: '#C6D0EB',
          h1: {
            color: '#BA2D7E',
          },
          h2: {
            color: '#6CE3D4',
          },
          blockquote: {
            color: '#fed318'
          },
          strong: {
            color: '#BA2D7E',
          },
          a: {
            color: '#80D34D',
            '&:hover': {
              color: '#fed318',
            },
          },
          code:  {
            color: '#f7fafc',
            fontWeight: '400',
            fontSize: '.875em',
            backgroundColor: '#2d3748',
            padding: '.25rem',
            borderWidth: '0',
            borderColor: '#edf2f7',
            borderRadius: '.25rem',
          }
        },
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.teal-glow': {
          textShadow: '0px 0px 8px rgba(108,227,212,0.6)',
        },
        '.pink-glow': {
          textShadow: '0px 0px 8px rgba(186,45,126,0.4);',
        },
        '.yellow-glow': {
          textShadow: '0px 0px 8px rgba(254,211,24,0.6)',
        },
        '.green-glow': {
          textShadow :'0px 0px 8px rgba(128,211,77,0.6)',
        }
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    mode: 'all',
    enabled: process.env.NODE_ENV === 'production',
    whitelist: ['h1', 'h2', 'h3', 'p', 'blockquote', 'code', 'a', 'strong'],
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}