require('dotenv').config()
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  ssr: false,
  // mode: 'universal',
  head: {
    title: 'Dr Call Away',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        size: '32x32',
        href: '/favicon-32x32.png',
      },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap',
      },
    ],
    script: [
      {
        src: 'https://use.fontawesome.com/100875b2bb.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: 'ant-design-vue/dist/antd.less', lang: 'less' },
    '~/assets/scss/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/antd-ui', '@/plugins/veevalidate'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
    loaders: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#92278f',
        },
      },
    },
    transpile: ['vee-validate/dist/rules'],
  },
  styleResources: {
    scss: [
      '~/assets/scss/base/_variables.scss',
      '~/assets/scss/base/_mixins.scss',
    ],
  },
}
