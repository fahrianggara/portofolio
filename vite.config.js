import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load environment variables sesuai mode (development/production)
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const API_URL = env.VITE_API_URL;
  const isDev = mode === 'development';

  return {
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
    define: {
      'import.meta.env': {
        ...env // Memastikan variabel lingkungan dimuat
      }
    },
    server: {
      allowedHosts: [''],
      proxy: {
        '/wakatime': {
          target: `${API_URL}`,
          changeOrigin: isDev,
          secure: !isDev,
        },
        '/api': {
          target: `${API_URL}`,
          changeOrigin: isDev,
          secure: !isDev,
        },
        '/github': {
          target: `${API_URL}`,
          changeOrigin: isDev,
          secure: !isDev,
        }
      },
    }
  };
});
