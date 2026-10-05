import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg', 'images/*.png', 'images/*.jpg'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg}']
      },
      manifest: {
        name: 'SpoolGrid',
        short_name: 'SpoolGrid',
        description: 'Professional analog film logging',
        theme_color: '#ffcc00',
        background_color: '#0a0a0a',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    host: true
  }
});