import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],

  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
  },

  server: {
    proxy: {
      '/music-api': {
        target: ' http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
