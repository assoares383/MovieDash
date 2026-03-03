import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: ['text', 'html'],
      include: [
        'src/features/movies/adapters/**/*.ts',
        'src/features/movies/builders/**/*.ts',
        'src/features/movies/composables/**/*.ts',
        'src/features/movies/factories/**/*.ts',
        'src/features/movies/services/**/*.ts',
      ],
      exclude: ['**/*.spec.ts', '**/index.ts'],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
      },
    },
  },
})
