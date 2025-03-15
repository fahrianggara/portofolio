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
    allowedHosts: [''],
    port: 3000,
    proxy: {
      '/wakatime-api' : {
        target: 'https://wakatime.com/api/v1/users/current/stats',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wakatime-api/, '')
      },
      '/api' : {
        target: 'https://be.fahrianggara.my.id',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, 'api')
      },
      '/github-api' : {
        target: 'https://api.github.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/github-api/, '')
      }
    },
  }
})
