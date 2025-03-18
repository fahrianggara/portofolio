import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load environment variables sesuai mode (development/production)
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const proxyApi = env.VITE_API_URL;

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
          target: `${proxyApi}/wakatime`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/wakatime/, '')
        },
        '/api': {
          target: `${proxyApi}/api`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/github': {
          target: `${proxyApi}/github`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/github/, '')
        }
      },
    }
  };
});
