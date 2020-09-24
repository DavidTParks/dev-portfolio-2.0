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
  },
  variants: {},
  plugins: [
  ],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}