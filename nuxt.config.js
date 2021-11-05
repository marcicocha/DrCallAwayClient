require('dotenv').config()
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  ssr: false,
  generate: { fallback: true },

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
        href: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap',
      },
    ],
    script: [
      {
        src: 'https://use.fontawesome.com/100875b2bb.js',
      },
      {
        src: 'https://kit.fontawesome.com/f270f2319d.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: 'ant-design-vue/dist/antd.less', lang: 'less' },
    '~/assets/scss/main.scss',
  ],
  router: {
    routes: [
      {
        name: '/admin/patient/case-file',
        path: '/admin/patient/case-file/:id?',
        component: 'pages/admin/patient/case-file/AppCaseFileForm.vue',
      },
    ],
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui.js',
    '@/plugins/veevalidate.js',
    '@/plugins/firebase.js',
  ],

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
    '@nuxtjs/auth-next',
    // '@nuxtjs/laravel-echo',
  ],
  // echo: {},
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL,
    headers: {
      common: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  },

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
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ],
    },
  },
  styleResources: {
    scss: [
      '~/assets/scss/base/_variables.scss',
      '~/assets/scss/base/_mixins.scss',
    ],
  },
}
