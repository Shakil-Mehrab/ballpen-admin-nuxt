import webpack from 'webpack'
const env = require('dotenv').config()
export default {
  env: {
    ADMIN_BACKEND_URL:
      process.env.ADMIN_BACKEND_URL || 'https://api.dbcnews.tv',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'DBC News Admin',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: { color: '#5E8E3E' },

  css: ['@/assets/css/tailwind.css', '@/assets/css/global.css'],

  server: {
    port: 3002, // default: 3000
    // host: "127.0.0.2", // default: localhost
  },

  plugins: [
    '~/plugins/components',
    '@/plugins/VueSweetAlert',
    '@/plugins/VueJsModal',
    '@/plugins/VueLazyload',
    // '@/plugins/VueFragment',
    // '@/plugins/VueScrollTo',
  ],

  components: true,

  router: {
    middleware: ['clearValidationErrors', 'drawerMenuMiddleware'],
  },

  buildModules: ['@nuxt/postcss8'],

  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next', 'vue-scrollto/nuxt'],

  axios: {
    baseURL: process.env.ADMIN_BACKEND_URL,
    credentials: true,
  },

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.ADMIN_BACKEND_URL,
        user: {
          property: 'data',
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user/profile', method: 'get' },
        },
      },
    },
  },

  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },

    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash',
      }),
    ],

    // extend(config, ctx) {
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/,
    //       options: {
    //         fix: true,
    //       },
    //     })
    //   }
    // },
  },
}
