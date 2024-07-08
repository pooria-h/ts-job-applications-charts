// import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
import checker from 'vite-plugin-checker';

export default defineConfig({
  base: '/ts-job-applications-charts',
  plugins: [
    vue(),
    checker({
      typescript: process.env.VITEST ? false : true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
