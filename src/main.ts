import { createApp } from 'vue'
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

app.use(PrimeVue, {
  theme: {
    preset: MovieTheme,
  },
})

app.mount('#app')
