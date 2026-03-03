import { afterEach, describe, expect, it, vi } from 'vitest'
import { getMovies } from './movieApi'

const fetchMock = vi.fn()

describe('movieApi', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('retorna filmes adaptados em caso de sucesso', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        movies: [
          {
            id: 1,
            title: 'Filme',
            category: 'Ação',
            release_date: '2024-01-01',
            duration_minutes: 120,
            rating: '14 anos',
            director_name: 'Diretor',
            cast_members: ['Ator'],
            synopsis: 'Sinopse',
            sessions: [],
          },
        ],
      }),
    })

    vi.stubGlobal('fetch', fetchMock)

    const result = await getMovies()

    expect(fetchMock).toHaveBeenCalledWith('/api/movies')
    expect(result).toEqual([
      expect.objectContaining({
        id: 1,
        releaseDate: '2024-01-01',
        duration: 120,
      }),
    ])
  })

  it('lança erro quando resposta não está ok', async () => {
    fetchMock.mockResolvedValue({ ok: false })
    vi.stubGlobal('fetch', fetchMock)

    await expect(getMovies()).rejects.toThrow('Não foi possível carregar os filmes')
  })
})
