import type { MovieDto, MovieSession } from '@/features/movies/types'

export class MovieBuilder {
  private movie: MovieDto

  constructor(id: number) {
    this.movie = {
      id,
      title: '',
      category: '',
      release_date: '',
      duration_minutes: 0,
      rating: '',
      director_name: '',
      cast_members: [],
      synopsis: '',
      sessions: [],
    }
  }

  withTitle(value: string): this {
    this.movie.title = value
    return this
  }

  withCategory(value: string): this {
    this.movie.category = value
    return this
  }

  withReleaseDate(value: string): this {
    this.movie.release_date = value
    return this
  }

  withDuration(value: number): this {
    this.movie.duration_minutes = value
    return this
  }

  withRating(value: string): this {
    this.movie.rating = value
    return this
  }

  withDirector(value: string): this {
    this.movie.director_name = value
    return this
  }

  withCast(value: string[]): this {
    this.movie.cast_members = value
    return this
  }

  withSynopsis(value: string): this {
    this.movie.synopsis = value
    return this
  }

  withSessions(value: MovieSession[]): this {
    this.movie.sessions = value
    return this
  }

  build(): MovieDto {
    return { ...this.movie }
  }
}
