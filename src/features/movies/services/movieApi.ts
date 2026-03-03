import { adaptMoviesResponse } from '@/features/movies/adapters/movieAdapter'
import type { MoviesResponseDto } from '@/features/movies/types'

export const getMovies = async () => {
  const response = await fetch('/api/movies')

  if (!response.ok) {
    throw new Error('Não foi possível carregar os filmes')
  }

  const payload = (await response.json()) as Partial<MoviesResponseDto>
  return adaptMoviesResponse(payload)
}
