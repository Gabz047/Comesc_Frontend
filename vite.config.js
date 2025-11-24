import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png'
      ],

      devOptions: {
        enabled: true,
        type: 'module'
      },
      manifest: {
        name: 'Comesc - Gestão de Estoque',
        short_name: 'Comesc App',
        description: 'Gestão de estoque da empresa Comesc',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/comesc_logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/comesc_logo.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/comesc_logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {

        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document' || request.destination === 'script',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'documents-scripts',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24
              }
            }
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
