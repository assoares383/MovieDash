import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'
import { movieQueryKeys } from '@/features/movies/queries/movieQueryKeys'
import { getMovies } from '@/features/movies/services/movieApi'
import type { Movie, MovieFiltersState } from '@/features/movies/types'

export const useMovieFilters = () => {
  const moviesQuery = useQuery<Movie[]>({
    queryKey: movieQueryKeys.list(),
    queryFn: getMovies,
  })

  const filters = ref<MovieFiltersState>({
    film: '',
    category: null,
    releaseDate: null,
  })

  const movies = computed<Movie[]>(() => moviesQuery.data.value ?? [])
  const isLoading = computed<boolean>(() => moviesQuery.isLoading.value)
  const hasError = computed<boolean>(() => moviesQuery.isError.value)
  const hasData = computed<boolean>(() => movies.value.length > 0)

  const categories = computed<string[]>(() => {
    return [...new Set(movies.value.map((movie) => movie.category))]
  })

  const filteredMovies = computed<Movie[]>(() => {
    return movies.value.filter((movie) => {
      const byFilm = movie.title.toLowerCase().includes(filters.value.film.trim().toLowerCase())
      const byCategory = !filters.value.category || movie.category === filters.value.category

      const byReleaseDate =
        !filters.value.releaseDate ||
        new Date(movie.releaseDate).toDateString() === filters.value.releaseDate.toDateString()

      return byFilm && byCategory && byReleaseDate
    })
  })

  return {
    filters,
    categories,
    filteredMovies,
    isLoading,
    hasError,
    hasData,
  }
}
