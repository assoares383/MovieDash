import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MovieFilters from './MovieFilters.vue'
import type { MovieFiltersState } from '@/features/movies/types'

const InputTextStub = defineComponent({
  emits: ['update:modelValue'],
  template: '<button class="input-stub" @click="$emit(\'update:modelValue\', \'Matrix\')" />',
})

const SelectStub = defineComponent({
  emits: ['update:modelValue'],
  template: '<button class="select-stub" @click="$emit(\'update:modelValue\', \'Drama\')" />',
})

const DatePickerStub = defineComponent({
  emits: ['update:modelValue'],
  template:
    '<button class="date-stub" @click="$emit(\'update:modelValue\', new Date(\'2024-01-10\'))" />',
})

const baseModelValue: MovieFiltersState = {
  film: '',
  category: null,
  releaseDate: null,
}

describe('MovieFilters', () => {
  it('emite update:modelValue ao alterar filme', async () => {
    const wrapper = mount(MovieFilters, {
      props: {
        modelValue: baseModelValue,
        categories: ['Ação', 'Drama'],
      },
      global: {
        stubs: {
          InputText: InputTextStub,
          Select: SelectStub,
          DatePicker: DatePickerStub,
        },
      },
    })

    await wrapper.find('.input-stub').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([
      [{ film: 'Matrix', category: null, releaseDate: null }],
    ])
  })

  it('emite update:modelValue ao alterar categoria', async () => {
    const wrapper = mount(MovieFilters, {
      props: {
        modelValue: baseModelValue,
        categories: ['Ação', 'Drama'],
      },
      global: {
        stubs: {
          InputText: InputTextStub,
          Select: SelectStub,
          DatePicker: DatePickerStub,
        },
      },
    })

    await wrapper.find('.select-stub').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([
      [{ film: '', category: 'Drama', releaseDate: null }],
    ])
  })

  it('emite update:modelValue ao alterar data de estreia', async () => {
    const wrapper = mount(MovieFilters, {
      props: {
        modelValue: baseModelValue,
        categories: ['Ação', 'Drama'],
      },
      global: {
        stubs: {
          InputText: InputTextStub,
          Select: SelectStub,
          DatePicker: DatePickerStub,
        },
      },
    })

    await wrapper.find('.date-stub').trigger('click')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]?.[0]).toEqual({
      film: '',
      category: null,
      releaseDate: new Date('2024-01-10'),
    })
  })
})
