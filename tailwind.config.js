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
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui'),
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