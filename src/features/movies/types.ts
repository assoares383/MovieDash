export interface MovieSession {
  room: string
  time: string
  language: string
}

export interface MovieDto {
  id: number
  title: string
  category: string
  release_date: string
  duration_minutes: number
  rating: string
  director_name: string
  cast_members: string[]
  synopsis: string
  sessions: MovieSession[]
}

export interface Movie {
  id: number
  title: string
  category: string
  releaseDate: string
  duration: number
  rating: string
  director: string
  cast: string[]
  synopsis: string
  sessions: MovieSession[]
}

export interface MoviesResponseDto {
  movies: MovieDto[]
  total: number
}

export interface MovieFiltersState {
  film: string
  category: string | null
  releaseDate: Date | null
}
