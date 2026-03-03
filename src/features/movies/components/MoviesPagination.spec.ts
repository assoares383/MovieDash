import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MoviesPagination from './MoviesPagination.vue'

const SelectStub = defineComponent({
  emits: ['update:model-value'],
  template: '<button class="select-stub" @click="$emit(\'update:model-value\', 50)" />',
})

const PaginatorStub = defineComponent({
  emits: ['page'],
  template: '<button class="paginator-stub" @click="$emit(\'page\', { first: 20, rows: 20 })" />',
})

describe('MoviesPagination', () => {
  it('emite update:first e update:rows ao paginar', async () => {
    const wrapper = mount(MoviesPagination, {
      props: {
        first: 0,
        rows: 10,
        totalRecords: 100,
        rowsOptions: [10, 20, 50],
      },
      global: {
        stubs: {
          Paginator: PaginatorStub,
          Select: SelectStub,
        },
      },
    })

    await wrapper.find('.paginator-stub').trigger('click')

    expect(wrapper.emitted('update:first')).toEqual([[20]])
    expect(wrapper.emitted('update:rows')).toEqual([[20]])
  })

  it('reseta para primeira página ao trocar itens por página', async () => {
    const wrapper = mount(MoviesPagination, {
      props: {
        first: 30,
        rows: 10,
        totalRecords: 100,
        rowsOptions: [10, 20, 50],
      },
      global: {
        stubs: {
          Paginator: PaginatorStub,
          Select: SelectStub,
        },
      },
    })

    await wrapper.find('.select-stub').trigger('click')

    expect(wrapper.emitted('update:rows')).toEqual([[50]])
    expect(wrapper.emitted('update:first')).toEqual([[0]])
  })
})
