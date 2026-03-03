import { describe, expect, it } from 'vitest'
import { createMoviesDataset } from './movieFactory'

describe('movieFactory', () => {
  it('gera quantidade configurada de filmes', () => {
    const movies = createMoviesDataset(5)

    expect(movies).toHaveLength(5)
    expect(movies[0].id).toBe(1)
    expect(movies[4].id).toBe(5)
  })

  it('gera estrutura válida para dto e sessões', () => {
    const [movie] = createMoviesDataset(1)

    expect(movie.title).toContain('1')
    expect(movie.release_date).toMatch(/^2024-\d{2}-\d{2}$/)
    expect(movie.duration_minutes).toBeGreaterThanOrEqual(95)
    expect(movie.duration_minutes).toBeLessThanOrEqual(149)
    expect(movie.cast_members).toHaveLength(4)
    expect(movie.sessions).toHaveLength(3)

    for (const session of movie.sessions) {
      expect(session.room).toMatch(/^Sala\s\d$/)
      expect(session.time).toMatch(/^\d{2}:\d{2}$/)
      expect(['Dublado', 'Legendado', 'Nacional']).toContain(session.language)
    }
  })

  it('usa tamanho padrão quando não recebe argumento', () => {
    const movies = createMoviesDataset()
    expect(movies).toHaveLength(1000)
  })
})
