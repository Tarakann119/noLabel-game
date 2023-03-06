import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
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
  plugins: [
    react(),
    VitePluginFonts({
      custom: {
        families: [
          { name: 'Romvel', local: 'Romvel.ttf', src: './src/assets/fonts/Romvel.ttf' },
          {
            name: 'American TextC',
            local: 'American TextC.ttf',
            src: './src/assets/fonts/American TextC.ttf',
          },
          {
            name: 'Cormorant-Bold',
            local: 'Cormorant-Bold.woff2',
            src: './src/assets/fonts/Cormorant-Bold.woff2',
          },
        ],
      },
    }),
  ],
});

//American TextC.ttf
