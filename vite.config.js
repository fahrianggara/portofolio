import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    allowedHosts: ['e81b-2001-448a-2096-951-ad07-4cf9-9bc4-973a.ngrok-free.app'],
    port: 3000,
    proxy: {
      '/wakatime-api' : {
        target: 'https://wakatime.com/api/v1/users/current/stats',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wakatime-api/, '')
      },
    }
  }
})
