import { createApp } from 'vue'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import './style.css'
import App from './App.vue'
import { MovieTheme } from './shared/themes/primevue'

if (import.meta.env.DEV) {
  const { makeMoviesServer } = await import('./features/movies/mirage')

  makeMoviesServer({
    environment: 'development',
  })
}

const app = createApp(App)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

app.use(VueQueryPlugin, {
  queryClient,
})

app.use(PrimeVue, {
  theme: {
    preset: MovieTheme,
  },
})

app.mount('#app')
