import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (
            id.includes('node_modules/primevue/datatable') ||
            id.includes('node_modules/primevue/column') ||
            id.includes('node_modules/primevue/paginator')
          ) {
            return 'primevue-table'
          }

          if (id.includes('node_modules/primevue') || id.includes('node_modules/@primevue')) {
            return 'primevue-ui'
          }

          if (id.includes('node_modules/@primeuix')) {
            return 'primeuix'
          }

          if (id.includes('node_modules')) {
            return 'vendor'
          }

          return undefined
        },
      },
    },
  },
})
