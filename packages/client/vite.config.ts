import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePluginFonts } from 'vite-plugin-fonts';
import { VitePWA } from 'vite-plugin-pwa';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@typings': path.resolve(__dirname, './typings'),
    },
  },
  plugins: [
    react(),
    VitePluginFonts({
      custom: {
        families: [
          {
            name: 'Romvel Cyr',
            local: 'RomvelCyr',
            src: './src/assets/fonts/RomvelCyr.*',
          },
          {
            name: 'Cormorant Bold',
            local: 'Cormorant-Bold',
            src: './src/assets/fonts/Cormorant-Bold.*',
          },
        ],
      },
    }),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      manifest: {
        id: '/',
        name: 'Tower defence by noLabel',
        short_name: 'nL TowerDefence',
        scope: '/',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        description: '',
        lang: 'ru',
        icons: [
          {
            src: './icons/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/x-icon',
          },
          {
            src: './icons/favicon-24x24.png',
            sizes: '24x24',
            type: 'image/x-icon',
          },
          {
            src: './icons/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/x-icon',
          },
          {
            src: './icons/favicon-64x64.png',
            sizes: '64x64',
            type: 'image/x-icon',
          },
          {
            src: './icons/android-chrome-192x192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: './icons/android-chrome-512x512.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
});
