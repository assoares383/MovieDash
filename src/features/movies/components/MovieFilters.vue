<script setup lang="ts">
import { computed } from 'vue'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import type { MovieFiltersState } from '@/features/movies/types'

const props = defineProps<{
  modelValue: MovieFiltersState
  categories: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [MovieFiltersState]
}>()

const film = computed({
  get: () => props.modelValue.film,
  set: (value) => emit('update:modelValue', { ...props.modelValue, film: value }),
})

const category = computed({
  get: () => props.modelValue.category,
  set: (value) => emit('update:modelValue', { ...props.modelValue, category: value }),
})

const releaseDate = computed({
  get: () => props.modelValue.releaseDate,
  set: (value) => emit('update:modelValue', { ...props.modelValue, releaseDate: value }),
})
</script>

<template>
  <div class="grid gap-4 md:grid-cols-3">
    <div class="flex flex-col gap-2">
      <label for="film" class="text-sm font-semibold">Filme</label>
      <InputText id="film" v-model="film" placeholder="Digite o nome do filme" />
    </div>

    <div class="flex flex-col gap-2">
      <label for="category" class="text-sm font-semibold">Categoria</label>
      <Select
        id="category"
        v-model="category"
        :options="categories"
        placeholder="Selecione uma categoria"
        show-clear
      />
    </div>

    <div class="flex flex-col gap-2">
      <label for="releaseDate" class="text-sm font-semibold">Data de estreia</label>
      <DatePicker
        id="releaseDate"
        v-model="releaseDate"
        date-format="dd/mm/yy"
        show-icon
        show-clear
      />
    </div>
  </div>
</template>
