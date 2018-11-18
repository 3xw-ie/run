require('dotenv').config()

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Run | by 3xW',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Run your business.' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Router config
  */
  router: {
    middleware: 'check-auth'
  },

  /*
  ** Global CSS
  */
  css: ['~/assets/css/tailwind.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/filters', '~/plugins/helpers'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    '@nuxtjs/dotenv',
    '@nuxtjs/proxy'
  ],

  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default'
    }
  },

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  /*
  ** Environement variables
  */
  env: {
    REST_API_ENDPOINT: process.env.REST_API_ENDPOINT || 'https://api.3xw.app',
    AUTH0_CLIENT_ID: 'c23KsgIcNFWigpLYPqa3P3VpU5ehc2K0',
    AUTH0_CLIENT_DOMAIN: '3xw.eu.auth0.com'
  }
}
