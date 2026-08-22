import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'server-only': fileURLToPath(
        new URL(
          './node_modules/next/dist/compiled/server-only/empty.js',
          import.meta.url,
        ),
      ),
    },
    tsconfigPaths: true,
  },
  test: {
    clearMocks: true,
    environment: 'jsdom',
    globals: true,
    include: ['app/**/*.test.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
    restoreMocks: true,
    setupFiles: ['./vitest.setup.ts'],
  },
})
