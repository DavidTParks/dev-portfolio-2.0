import getSiteMeta from "./utils/getSiteMeta";
const meta = getSiteMeta();
require("dotenv").config();
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
  colorMode: {
    classSuffix: '',
    fallback: 'dark'
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'nuxt-svg-loader',
    '@nuxtjs/sitemap',
    '@nuxtjs/axios',
    '@nuxtjs/feed'
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
      const blogs = await $content({ deep: true })
      .only(["path"])
      .where({ published: { $eq: true } })
      .fetch();

      let routes = [];

      blogs.forEach((blog) => {
        routes.push({
          url: blog.path,
          lastmod: blog.updatedAt
        })
      });
      
      return routes;
    }
  },
  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        feed.options = {
          title: 'David Parks Blog',
          description: 'A Frontend Development blog from David Parks',
          link: 'https://www.davidparks.dev/feed.xml',
        };

        // eslint-disable-next-line global-require
        const { $content } = require('@nuxt/content');

        const blogs = await $content('blogs')
        .where({ published: { $eq: true } })
        .fetch();

        blogs.forEach((post) => {
          const url = `https://www.davidparks.dev/blog/${post.slug}`;
          feed.addItem({
            title: post.title,
            id: url,
            link: url,
            description: post.description,
            content: post.bodyPlainText,
          });
        });
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
  ],
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  },
  generate: {
    fallback: true,
  },
  axios: {
    baseURL: process.env.NODE_ENV === 'production' ? process.env.BASE_URL || 'http://localhost:8888/' : 'http://localhost:8888/',
  },
  publicRuntimeConfig: {
    faunaSecretKey: process.env.FAUNA_SECRET_KEY,
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },
  privateRuntimeConfig: {
    faunaSecretKey: process.env.FAUNA_SECRET_KEY,
    axios: {
      baseURL: process.env.BASE_URL
    }
  },
  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        document.bodyPlainText = document.text;
      }
    },
  },
}
