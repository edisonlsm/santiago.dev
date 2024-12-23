import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@nuxtjs/mdc'
  ],
  vite: {
    plugins: [
      svgLoader(),
    ]
  },
  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        file: 'en-US.ts'
      },
      {
        code: 'pt-br',
        file: 'pt-BR.ts'
      }
    ],
    lazy: true,
    defaultLocale: 'en'
  },
  googleFonts: {
    families: {
      "Noto Sans Mono": true,
    }
  }
})