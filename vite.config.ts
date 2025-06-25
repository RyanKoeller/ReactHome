import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    outDir: 'dist',
  },
  // 👇 Vite will serve index.html for all routes (SPA fallback)
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
