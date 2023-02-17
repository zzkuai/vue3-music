import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import pxToVw from 'postcss-px-to-viewport';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue3-music/',
  build: {
    outDir: 'vue3-music',
  },

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

  css: {
    postcss: {
      plugins: [
        pxToVw({
          viewportWidth: 375,
        }),
        autoprefixer(),
      ],
    },
  },

  server: {
    host: '192.168.0.108',
    proxy: {
      '/music-api': {
        target: ' http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
