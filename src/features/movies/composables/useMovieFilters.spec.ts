import { defineComponent } from 'vue'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { mount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useMovieFilters } from './useMovieFilters'

const { getMoviesMock } = vi.hoisted(() => ({
  getMoviesMock: vi.fn(),
}))

vi.mock('@/features/movies/services/movieApi', () => ({
  getMovies: getMoviesMock,
}))

const baseMovies = [
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
    sessions: [],
  },
  {
    id: 2,
    title: 'Drama Central',
    category: 'Drama',
    releaseDate: '2024-02-20',
    duration: 100,
    rating: '12 anos',
    director: 'Diretor 2',
    cast: ['Ator 2'],
    synopsis: 'Sinopse 2',
    sessions: [],
  },
]

const createHarness = () =>
  defineComponent({
    setup() {
      return useMovieFilters()
    },
    template: '<div />',
  })

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

describe('useMovieFilters', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('carrega filmes com sucesso no mounted', async () => {
    getMoviesMock.mockResolvedValue(baseMovies)

    const wrapper = mount(createHarness(), {
      global: {
        plugins: [[VueQueryPlugin, { queryClient: createQueryClient() }]],
      },
    })
    await flushPromises()

    const vm = wrapper.vm as any
    expect(vm.hasError).toBe(false)
    expect(vm.isLoading).toBe(false)
    expect(vm.filteredMovies).toHaveLength(2)
    expect(vm.categories).toEqual(['Ação', 'Drama'])
  })

  it('marca erro quando o carregamento falha', async () => {
    getMoviesMock.mockRejectedValue(new Error('falha'))

    const wrapper = mount(createHarness(), {
      global: {
        plugins: [[VueQueryPlugin, { queryClient: createQueryClient() }]],
      },
    })
    await flushPromises()

    const vm = wrapper.vm as any
    expect(vm.hasError).toBe(true)
    expect(vm.isLoading).toBe(false)
    expect(vm.filteredMovies).toEqual([])
    expect(vm.categories).toEqual([])
  })

  it('aplica filtros por filme, categoria e data', async () => {
    getMoviesMock.mockResolvedValue(baseMovies)

    const wrapper = mount(createHarness(), {
      global: {
        plugins: [[VueQueryPlugin, { queryClient: createQueryClient() }]],
      },
    })
    await flushPromises()

    const vm = wrapper.vm as any

    vm.filters.film = 'ação'
    expect(vm.filteredMovies).toHaveLength(1)
    expect(vm.filteredMovies[0].id).toBe(1)

    vm.filters.film = ''
    vm.filters.category = 'Drama'
    expect(vm.filteredMovies).toHaveLength(1)
    expect(vm.filteredMovies[0].id).toBe(2)

    vm.filters.category = null
    vm.filters.releaseDate = new Date('2024-01-10')
    expect(vm.filteredMovies).toHaveLength(1)
    expect(vm.filteredMovies[0].id).toBe(1)
  })
})
