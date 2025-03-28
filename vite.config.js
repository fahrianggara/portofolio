import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';
import commonjs from 'vite-plugin-commonjs'

export default defineConfig(({ mode }) => {
  // Load environment variables based on mode
  dotenv.config({ path: fileURLToPath(new URL(`.env.${mode}`, import.meta.url)) });
  
  const isDev = mode === 'development';
  const apiUrl = process.env.VITE_API_URL;

  return {
    publicDir: 'public',
    plugins: [
      vue(),
      tailwindcss(),
      commonjs()
    ],
    optimizeDeps: {
      include: ["vue3-calendar-heatmap"]
    },
    ssr: {
      noExternal: ["vue3-calendar-heatmap"]
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      allowedHosts: [''],
      proxy: {
        '/wakatime': {
          target: apiUrl,
          changeOrigin: isDev,
          secure: !isDev,
        },
        '/api': {
          target: apiUrl,
          changeOrigin: isDev,
          secure: !isDev,
        },
        '/github': {
          target: apiUrl,
          changeOrigin: isDev,
          secure: !isDev,
        },
      }
    }
  };
});
