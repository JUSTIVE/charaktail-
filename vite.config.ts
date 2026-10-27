import { fileURLToPath } from 'node:url'
import { transformAsync } from '@babel/core'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

/**
 * Vite 8's React plugin runs on oxc, which has no Babel pipeline, so the one
 * transform Relay needs gets its own pass: babel-plugin-relay rewrites every
 * graphql`` tag into an import of the artifact relay-compiler emitted.
 */
function relayTags(): Plugin {
  return {
    name: 'relay-graphql-tags',
    enforce: 'pre',
    async transform(code, id) {
      if (!/\.[jt]sx?$/.test(id) || id.includes('node_modules')) return null
      if (!code.includes('graphql`')) return null
      const result = await transformAsync(code, {
        filename: id,
        babelrc: false,
        configFile: false,
        parserOpts: { plugins: ['typescript', 'jsx'] },
        plugins: [['relay', { artifactDirectory: './src/__generated__', eagerEsModules: true }]],
        sourceMaps: true,
      })
      if (!result?.code) return null
      return { code: result.code, map: result.map as never }
    },
  }
}

const vendor = (path: string) => fileURLToPath(new URL(`./vendor/morphing-sheet/${path}`, import.meta.url))

export default defineConfig({
  plugins: [
    relayTags(),
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'charaktail — 캐릭터 설정 뽑기',
        short_name: 'charaktail',
        description: '속성을 고르고, 흔들고, 캐릭터를 뽑는다.',
        lang: 'ko',
        theme_color: '#0b0914',
        background_color: '#0b0914',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.hostname === 'cdn.jsdelivr.net',
            handler: 'CacheFirst',
            options: { cacheName: 'fonts', expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: [
      { find: /^morphing-sheet\/react$/, replacement: vendor('react/index.ts') },
      { find: /^morphing-sheet\/styles\.css$/, replacement: vendor('styles/morphing-sheet.css') },
      { find: /^morphing-sheet$/, replacement: vendor('index.ts') },
    ],
  },
  build: { chunkSizeWarningLimit: 1500 },
  server: { port: 5181, open: false },
})
