import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },
  css: ['~/assets/styles/index.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "${resolve(__dirname, 'app/assets/styles/_index')}" as *;\n`,
        },
      },
    },
  },
  nitro: {
    preset: 'vercel',
    compressPublicAssets: true,
    minify: true,
  },
  routeRules: {
    '/**': { headers: { 'cache-control': 'public, max-age=0, must-revalidate' } },
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'pl' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
})
