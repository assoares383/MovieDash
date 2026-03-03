<script setup lang="ts">
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import type { Movie } from '@/features/movies/types'

defineProps<{
  movies: Movie[]
}>()

const expandedRows = ref<Record<string, boolean>>({})

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(value))
}
</script>

<template>
  <DataTable
    v-model:expanded-rows="expandedRows"
    :value="movies"
    data-key="id"
    table-style="min-width: 65rem"
  >
    <Column expander style="width: 3rem" />
    <Column field="title" header="Filme" />
    <Column field="category" header="Categoria" />
    <Column header="Data de estreia">
      <template #body="slotProps">
        {{ formatDate(slotProps.data.releaseDate) }}
      </template>
    </Column>
    <Column field="rating" header="Classificação" />

    <template #expansion="slotProps">
      <div class="rounded-xl bg-surface-100 p-4 dark:bg-surface-800">
        <div class="mb-3 flex flex-wrap items-center gap-2">
          <Tag :value="slotProps.data.director" severity="info" />
          <Tag :value="`${slotProps.data.duration} min`" severity="warn" />
          <Tag :value="slotProps.data.rating" severity="contrast" />
        </div>

        <p class="mb-3 leading-relaxed">{{ slotProps.data.synopsis }}</p>

        <div class="grid gap-3 md:grid-cols-2">
          <div>
            <h4 class="mb-2 text-sm font-semibold">Elenco</h4>
            <ul class="list-inside list-disc">
              <li v-for="actor in slotProps.data.cast" :key="actor">{{ actor }}</li>
            </ul>
          </div>

          <div>
            <h4 class="mb-2 text-sm font-semibold">Sessões</h4>
            <ul class="space-y-1">
              <li
                v-for="session in slotProps.data.sessions"
                :key="`${session.room}-${session.time}`"
              >
                {{ session.time }} · {{ session.room }} · {{ session.language }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </DataTable>
</template>
