<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner'

withDefaults(
  defineProps<{
    label?: string
  }>(),
  {
    label: 'Carregando...',
  }
)
</script>

<template>
  <div class="flex min-h-40 flex-col items-center justify-center gap-3">
    <ProgressSpinner
      style="width: 2.5rem; height: 2.5rem"
      stroke-width="6"
      animation-duration="0.8s"
    />
    <p class="text-sm opacity-80">{{ label }}</p>
  </div>
</template>
