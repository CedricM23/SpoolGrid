import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically updates the cache when you push a new build
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'], // Any static assets you add later
      manifest: {
        name: 'SpoolGrid',
        short_name: 'SpoolGrid',
        description: 'Professional analog film logging',
        theme_color: '#ffcc00', // Changes the status bar color on Android
        background_color: '#0a0a0a', // Matches your neutral-900 UI on launch
        display: 'standalone', // Hides the browser URL bar to feel like a native app
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