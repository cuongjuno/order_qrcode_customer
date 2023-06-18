import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx}"',
      },
      terminal: false,
      overlay: {
        initialIsOpen: false,
      },
    }),
  ],
  resolve: {
    alias: {
      '~login': path.resolve(__dirname, './src/app/login/'),
      '~components': path.resolve(__dirname, './src/app/shared/components/'),
      '~constant': path.resolve(__dirname, './src/app/shared/constant/'),
      '~hooks': path.resolve(__dirname, './src/app/shared/hooks/'),
      '~layouts': path.resolve(__dirname, './src/app/shared/layouts/'),
      '~query-hooks': path.resolve(__dirname, './src/app/shared/services/query-hooks/'),
      '~services': path.resolve(__dirname, './src/app/shared/services/'),
      '~store': path.resolve(__dirname, './src/app/shared/store/'),
      '~styles': path.resolve(__dirname, './src/app/shared/styles/'),
      '~utils': path.resolve(__dirname, './src/app/shared/utils/'),
      '~app': path.resolve(__dirname, './src/app/'),
      '~core': path.resolve(__dirname, './src/core/'),
      '~static': path.resolve(__dirname, './src/static/'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import '~styles/_variables.scss';
      `,
      },
    },
  },
});
