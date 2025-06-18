/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/amadeus': {
        target: 'https://test.api.amadeus.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/amadeus/, ''),
        headers: {
          'Origin': 'https://test.api.amadeus.com'
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
