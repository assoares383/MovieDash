export const movieQueryKeys = {
  all: ['movies'] as const,
  list: () => [...movieQueryKeys.all, 'list'] as const,
}
