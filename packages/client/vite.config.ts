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

//American TextC.ttf
