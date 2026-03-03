import type { Movie, MovieDto, MoviesResponseDto } from '@/features/movies/types'

export const adaptMovieDto = (dto: MovieDto): Movie => {
  return {
    id: dto.id,
    title: dto.title,
    category: dto.category,
    releaseDate: dto.release_date,
    duration: dto.duration_minutes,
    rating: dto.rating,
    director: dto.director_name,
    cast: dto.cast_members,
    synopsis: dto.synopsis,
    sessions: dto.sessions,
  }
}

export const adaptMoviesResponse = (payload: Partial<MoviesResponseDto>): Movie[] => {
  const movies = Array.isArray(payload.movies) ? payload.movies : []
  return movies.map(adaptMovieDto)
}
