export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'pxl.media : qrayg\'s game room',
    titleTemplate: '%s - pxl.media : qrayg\'s game room',
    htmlAttrs: {
      lang: 'en',
      class: 'bg-gray-900'
    },
    bodyAttrs: {
      class: 'text(gray-400 sm) font-sans'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;900&display=swap' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://kit.fontawesome.com/a2bf4ed495.js', body: true },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content',
  ],

  // allow custom error/404 on netlify
  generate: {
    fallback: true
  },

  router: {
    // prefetchLinks: false
  },

  loading: {
    height: '2px',
    color: '#0EA5E9',
    failedColor: '#EF4444',
    continuous: true
  },

  content: {
    fullTextSearchFields: ['title', 'note', 'slug'],
    nestedProperties: ['genre.slug'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
