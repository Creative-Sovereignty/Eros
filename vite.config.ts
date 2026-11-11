import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['assets/erosdreamz_logo_original.jpg'],
        manifest: {
          id: '/',
          name: 'ErosDreamz - Male Video Dating & Nearby Radar',
          short_name: 'ErosDreamz',
          description: 'Short-form 10-second video stream meets nearby proximity radar for men. 18+ verified vibes and private vaults.',
          theme_color: '#060a14',
          background_color: '#060a14',
          display: 'standalone',
          orientation: 'portrait',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/assets/erosdreamz_logo_original.jpg',
              sizes: '192x192 512x512',
              type: 'image/jpeg',
              purpose: 'any'
            },
            {
              src: '/assets/erosdreamz_logo_original.jpg',
              sizes: '192x192 512x512',
              type: 'image/jpeg',
              purpose: 'maskable'
            }
          ]
        },
        devOptions: {
          enabled: true,
          type: 'module'
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      strictPort: true,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
