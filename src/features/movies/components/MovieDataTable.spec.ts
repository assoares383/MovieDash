import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MovieDataTable from './MovieDataTable.vue'
import type { Movie } from '@/features/movies/types'

const DataTableStub = defineComponent({
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  template: '<div><slot /><slot name="expansion" :data="value[0]" /></div>',
})

const ColumnStub = defineComponent({
  setup() {
    return {
      rowData: movies[0],
    }
  },
  template: '<div><slot name="body" :data="rowData" /></div>',
})

const TagStub = defineComponent({
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
  },
  template: '<span>{{ value }}</span>',
})

const movies: Movie[] = [
  {
    id: 1,
    title: 'Ação Total',
    category: 'Ação',
    releaseDate: '2024-01-10',
    duration: 120,
    rating: '14 anos',
    director: 'Diretor 1',
    cast: ['Ator 1'],
    synopsis: 'Sinopse 1',
    sessions: [
      {
        room: 'Sala 1',
        time: '18:00',
        language: 'Dublado',
      },
    ],
  },
]

describe('MovieDataTable', () => {
  it('renderiza dados formatados e detalhes da expansão', () => {
    const wrapper = mount(MovieDataTable, {
      props: {
        movies,
      },
      global: {
        stubs: {
          DataTable: DataTableStub,
          Column: ColumnStub,
          Tag: TagStub,
        },
      },
    })

    expect(wrapper.text()).toMatch(/\d{2}\/\d{2}\/2024/)
    expect(wrapper.text()).toContain('Diretor 1')
    expect(wrapper.text()).toContain('120 min')
    expect(wrapper.text()).toContain('Sinopse 1')
    expect(wrapper.text()).toContain('Ator 1')
    expect(wrapper.text()).toContain('18:00 · Sala 1 · Dublado')
  })
})
