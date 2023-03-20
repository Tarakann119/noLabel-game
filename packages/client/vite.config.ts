/* eslint-disable @typescript-eslint/ban-ts-comment */
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePluginFonts } from 'vite-plugin-fonts';
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
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store'),
      '@game': path.resolve(__dirname, '.src/game'),
      '@typings': path.resolve(__dirname, './typings'),
      '@utils': path.resolve(__dirname, './utils'),
    },
  },
  plugins: [
    react(),
    VitePluginFonts({
      custom: {
        families: [
          { name: 'Romvel Cyr', local: 'RomvelCyr', src: './src/assets/fonts/RomvelCyr.*' },
          {
            name: 'Cormorant-Bold',
            local: 'Cormorant-Bold',
            src: './src/assets/fonts/Cormorant-Bold.*',
          },
          {
            name: 'Cormorant-Regular',
            local: 'Cormorant-Regular',
            src: './src/assets/fonts/Cormorant-Regular.*',
          },
          {
            name: 'Cormorant-SemiBold',
            local: 'Cormorant-SemiBold',
            src: './src/assets/fonts/Cormorant-SemiBold.*',
          },
        ],
      },
    }),
  ],
});
