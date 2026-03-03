<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import AppLoader from './shared/components/AppLoader.vue'

const MoviesPage = defineAsyncComponent(() => import('./features/movies/pages/MoviesPage.vue'))
</script>

<template>
  <Suspense>
    <MoviesPage />

    <template #fallback>
      <main class="min-h-screen bg-surface-50 p-6 dark:bg-surface-950">
        <div
          class="mx-auto w-full max-w-7xl rounded-2xl bg-white p-5 shadow-sm dark:bg-surface-900"
        >
          <AppLoader label="Carregando módulo de filmes..." />
        </div>
      </main>
    </template>
  </Suspense>
</template>
