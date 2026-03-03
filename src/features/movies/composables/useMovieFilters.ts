import { computed, onMounted, ref } from 'vue'
import { getMovies } from '@/features/movies/services/movieApi'
import type { Movie, MovieFiltersState } from '@/features/movies/types'

export const useMovieFilters = () => {
  const movies = ref<Movie[]>([])
  const isLoading = ref(false)
  const hasError = ref(false)

  const filters = ref<MovieFiltersState>({
    film: '',
    category: null,
    releaseDate: null,
  })

  const categories = computed<string[]>(() => {
    return [...new Set(movies.value.map((movie) => movie.category))]
  })

  const loadMovies = async () => {
    isLoading.value = true
    hasError.value = false

    try {
      movies.value = await getMovies()
    } catch {
      hasError.value = true
      movies.value = []
    } finally {
      isLoading.value = false
    }
  }

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

  onMounted(loadMovies)

  return {
    filters,
    categories,
    filteredMovies,
    isLoading,
    hasError,
  }
}
