import getSiteMeta from "./utils/getSiteMeta";
const meta = getSiteMeta();

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: "en-US",
    },
    title: 'David Parks',
    meta: [
      ...meta,
      { name: "HandheldFriendly", content: "True" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:site_name", content: "David Parks" },
      {
        hid: "description",
        name: "description",
        content:
          "Articles focused on Frontend development. Focused in Vue.js, Nuxt.js, CSS and Animation!",
      },
      { charset: 'utf-8' },
      { hid: 'description', name: 'description', content: '' },
      { property: "og:image:width", content: "740" },
      { property: "og:image:height", content: "300" },
      { name: "twitter:site", content: "@dparksdev" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        hid: "canonical",
        rel: "canonical",
        href: process.env.BASE_URL,
      },
    ]
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "@/assets/css/global.css",
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'nuxt-svg-loader',
    '@nuxtjs/sitemap'
  ],

  // Content module configuration (https://go.nuxtjs.dev/content-config)
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-synthwave84.css'
      }
    }
  },
  sitemap: {
    hostname: process.env.BASE_URL || 'https://davidparks.dev/',
    routes: async () => {
      const { $content } = require("@nuxt/content");
      const files = await $content({ deep: true }).only(["path"]).fetch();

      return files.map((file) => (file.path === "/index" ? "/" : file.path));
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: false,
        minifyJS: false,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    }
  }
}
