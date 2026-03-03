<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import MovieFilters from '@/features/movies/components/MovieFilters.vue'
import MovieDataTable from '@/features/movies/components/MovieDataTable.vue'
import MoviesPagination from '@/features/movies/components/MoviesPagination.vue'
import { useMovieFilters } from '@/features/movies/composables/useMovieFilters'
import AppLoader from '@/shared/components/AppLoader.vue'
import type { Movie } from '@/features/movies/types'

const { filters, categories, filteredMovies, isLoading, hasError, hasData } = useMovieFilters()

const pageState = ref({
  first: 0,
  rows: 10,
  rowsOptions: [10, 20, 50, 100],
})

const paginatedMovies = computed<Movie[]>(() => {
  const start = pageState.value.first
  const end = start + pageState.value.rows
  return filteredMovies.value.slice(start, end)
})

watch(
  () => filteredMovies.value.length,
  (total: number) => {
    if (pageState.value.first >= total && total > 0) {
      const lastPageStart = Math.floor((total - 1) / pageState.value.rows) * pageState.value.rows
      pageState.value.first = lastPageStart
    }

    if (total === 0) {
      pageState.value.first = 0
    }
  }
)

const updateFirst = (value: number) => {
  pageState.value.first = value
}

const updateRows = (value: number) => {
  pageState.value.rows = value
}
</script>

<template>
  <main
    class="min-h-screen bg-surface-50 p-6 text-surface-900 dark:bg-surface-950 dark:text-surface-0"
  >
    <div class="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <header>
        <h1 class="text-2xl font-bold">MovieDash</h1>
        <p class="text-sm opacity-80">Filtre por filme, categoria e data de estreia.</p>
      </header>

      <section class="rounded-2xl bg-white p-5 shadow-sm dark:bg-surface-900">
        <MovieFilters v-model="filters" :categories="categories" />
      </section>

      <section class="rounded-2xl bg-white p-5 shadow-sm dark:bg-surface-900">
        <AppLoader v-if="isLoading && !hasData" label="Carregando filmes..." />
        <p v-else-if="hasError && !hasData" class="text-sm text-red-600">
          Erro ao carregar os filmes.
        </p>
        <div v-else class="flex flex-col gap-4">
          <p v-if="hasError && hasData" class="text-sm text-red-600">
            Não foi possível atualizar os filmes. Exibindo dados em cache.
          </p>
          <MovieDataTable :movies="paginatedMovies" />
          <MoviesPagination
            :first="pageState.first"
            :rows="pageState.rows"
            :rows-options="pageState.rowsOptions"
            :total-records="filteredMovies.length"
            @update:first="updateFirst"
            @update:rows="updateRows"
          />
        </div>
      </section>
    </div>
  </main>
</template>
