import { describe, expect, it } from 'vitest'
import { adaptMovieDto, adaptMoviesResponse } from './movieAdapter'
import type { MovieDto } from '@/features/movies/types'

describe('movieAdapter', () => {
  it('adapta MovieDto para Movie', () => {
    const dto: MovieDto = {
      id: 1,
      title: 'Filme 1',
      category: 'Ação',
      release_date: '2024-01-10',
      duration_minutes: 120,
      rating: '14 anos',
      director_name: 'Diretor 1',
      cast_members: ['Ator 1', 'Ator 2'],
      synopsis: 'Sinopse',
      sessions: [{ room: 'Sala 1', time: '14:00', language: 'Dublado' }],
    }

    const movie = adaptMovieDto(dto)

    expect(movie).toEqual({
      id: 1,
      title: 'Filme 1',
      category: 'Ação',
      releaseDate: '2024-01-10',
      duration: 120,
      rating: '14 anos',
      director: 'Diretor 1',
      cast: ['Ator 1', 'Ator 2'],
      synopsis: 'Sinopse',
      sessions: [{ room: 'Sala 1', time: '14:00', language: 'Dublado' }],
    })
  })

  it('retorna array vazio quando payload.movies é inválido', () => {
    expect(adaptMoviesResponse({})).toEqual([])
    expect(adaptMoviesResponse({ movies: undefined })).toEqual([])
    expect(adaptMoviesResponse({ movies: null as never })).toEqual([])
  })

  it('adapta lista de filmes do payload', () => {
    const payload = {
      movies: [
        {
          id: 2,
          title: 'Filme 2',
          category: 'Drama',
          release_date: '2024-02-02',
          duration_minutes: 100,
          rating: '12 anos',
          director_name: 'Diretor 2',
          cast_members: ['Ator A'],
          synopsis: 'Sinopse 2',
          sessions: [],
        },
      ],
    }

    expect(adaptMoviesResponse(payload)[0].releaseDate).toBe('2024-02-02')
  })
})
