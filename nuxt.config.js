const fs = require('fs')
const sass = require('sass')
const { URL } = require('url')

const config = loadConfig('./config.json')
const { BASE_DIR, GOOGLE_ANALYTICS_UA, TWITTER_ID, OG_IMAGE_PATH, ORIGIN } = config
const BASE_URL = new URL(BASE_DIR, ORIGIN).toString()
const OG_IMAGE_URL = new URL(OG_IMAGE_PATH, BASE_URL).toString()
const TWITTER_ACCOUNT = `@${TWITTER_ID}`

const i18n = require('./nuxt-i18n.config')
const lang = require(`./${i18n.langDir}${i18n.defaultLocale}`)
const APP_NAME = lang.APP_NAME
const APP_DESCRIPTION = lang.APP_DESCRIPTION

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: APP_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: APP_DESCRIPTION },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: APP_NAME },
      { hid: 'og:description', property: 'og:description', content: APP_DESCRIPTION },
      { hid: 'og:url', property: 'og:url', content: BASE_URL },
      { hid: 'og:site_name', property: 'og:title', content: APP_NAME },
      { hid: 'og:image', property: 'og:image', content: OG_IMAGE_URL },
      { hid: 'og:image:width', property: 'og:image:width', content: '256' },
      { hid: 'og:image:height', property: 'og:image:height', content: '256' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', content: TWITTER_ACCOUNT }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', href: '/favicon-256x256.png', sizes: '256x256' },
      { rel: 'icon', type: 'image/png', href: '/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon-180x180.png', sizes: '180x180' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons|Noto+Sans+JP' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css' }

    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['nuxt-i18n', i18n],
    ['@nuxtjs/google-analytics', {
      id: GOOGLE_ANALYTICS_UA
    }]
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {},
    loaders: {
      scss: {
        implementation: sass
      }
    }
  },

  router: {
    base: BASE_DIR
  },

  env: {
    config
  }
}

function loadConfig (filepath) {
  try {
    const data = fs.readFileSync(filepath, 'utf-8')
    return JSON.parse(data)
  } catch (ignored) {
    const {
      BASE_DIR,
      GIFTEE_URL,
      GITHUB_SPONSOERS_URL,
      GOOGLE_ANALYTICS_UA,
      PAYPAL_URL,
      TWITTER_ID,
      OG_IMAGE_PATH,
      ORIGIN,
      WISH_LIST_URL
    } = process.env
    return {
      BASE_DIR,
      GIFTEE_URL,
      GITHUB_SPONSOERS_URL,
      GOOGLE_ANALYTICS_UA,
      PAYPAL_URL,
      TWITTER_ID,
      OG_IMAGE_PATH,
      ORIGIN,
      WISH_LIST_URL
    }
  }
}
