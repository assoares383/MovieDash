import { createServer } from 'miragejs'
import { createMoviesDataset } from '@/features/movies/factories/movieFactory'

declare global {
  var __moviesMirageServer__: ReturnType<typeof createServer> | undefined
}

export const makeMoviesServer = ({ environment = 'development' } = {}) => {
  if (globalThis.__moviesMirageServer__) {
    return globalThis.__moviesMirageServer__
  }

  const dataset = createMoviesDataset(1200)

  const server = createServer({
    environment,
    logging: false,
    routes() {
      this.namespace = 'api'
      this.timing = 250

      this.get('/movies', () => {
        return {
          movies: dataset,
          total: dataset.length,
        }
      })

      this.passthrough('https://*')
    },
  })

  globalThis.__moviesMirageServer__ = server
  return server
}
