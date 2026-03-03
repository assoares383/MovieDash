<script setup lang="ts">
import Paginator from 'primevue/paginator'
import Select from 'primevue/select'

defineProps<{
  first: number
  rows: number
  totalRecords: number
  rowsOptions: number[]
}>()

const emit = defineEmits<{
  'update:first': [number]
  'update:rows': [number]
}>()

const onPage = (event: { first: number; rows: number }) => {
  emit('update:first', event.first)
  emit('update:rows', event.rows)
}

const onRowsChange = (value: number) => {
  emit('update:rows', value)
  emit('update:first', 0)
}
</script>

<template>
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <div class="flex items-center gap-2">
      <span class="text-sm">Itens por página</span>
      <Select
        :model-value="rows"
        :options="rowsOptions"
        class="w-24"
        @update:model-value="onRowsChange"
      />
    </div>

    <Paginator
      :first="first"
      :rows="rows"
      :total-records="totalRecords"
      :rows-per-page-options="rowsOptions"
      @page="onPage"
    />
  </div>
</template>
