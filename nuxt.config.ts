import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@nuxtjs/mdc',
    '@nuxt/content'
  ],
  vite: {
    plugins: [
      svgLoader(),
    ]
  },
  i18n: {
    experimental: {
      typedOptionsAndMessages: 'all'
    },
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        file: 'en-US.json'
      },
      {
        code: 'pt-br',
        file: 'pt-BR.json'
      }
    ],
    lazy: true,
    defaultLocale: 'en',

  },
  content: {
    defaultLocale: 'en',
    locales: ['en', 'pt-br']
  },
  googleFonts: {
    families: {
      "Noto Sans Mono": true,
    }
  }
})