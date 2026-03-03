import { MovieBuilder } from '@/features/movies/builders/MovieBuilder'
import type { MovieDto, MovieSession } from '@/features/movies/types'

const categories = ['Ação', 'Drama', 'Suspense', 'Ficção Científica', 'Aventura', 'Comédia']
const ratings = ['10 anos', '12 anos', '14 anos', '16 anos']
const firstNames = ['Lucas', 'Marina', 'Rafael', 'Clara', 'Thiago', 'Bianca', 'João', 'Sofia']
const lastNames = ['Silva', 'Costa', 'Nunes', 'Pires', 'Almeida', 'Oliveira', 'Rocha', 'Lima']
const rooms = ['Sala 1', 'Sala 2', 'Sala 3', 'Sala 4', 'Sala 5', 'Sala 6']
const languages = ['Dublado', 'Legendado', 'Nacional']

const pickByIndex = <T>(collection: readonly T[], index: number): T => {
  return collection[index % collection.length]
}

const createPersonName = (index: number): string => {
  return `${pickByIndex(firstNames, index)} ${pickByIndex(lastNames, index + 2)}`
}

const createSessions = (seed: number): MovieSession[] => {
  return [0, 1, 2].map((offset) => {
    const hour = 13 + ((seed + offset * 2) % 10)
    const minute = pickByIndex(['00', '10', '20', '30', '40', '50'], seed + offset)

    return {
      room: pickByIndex(rooms, seed + offset),
      time: `${hour.toString().padStart(2, '0')}:${minute}`,
      language: pickByIndex(languages, seed + offset),
    }
  })
}

const createMovieDto = (id: number): MovieDto => {
  const index = id - 1
  const category = pickByIndex(categories, index)
  const releaseDate = new Date(2024, index % 12, (index % 27) + 1).toISOString().slice(0, 10)
  const cast = [0, 1, 2, 3].map((offset) => createPersonName(index + offset + 1))

  return new MovieBuilder(id)
    .withTitle(`${category} ${id}`)
    .withCategory(category)
    .withReleaseDate(releaseDate)
    .withDuration(95 + (index % 55))
    .withRating(pickByIndex(ratings, index))
    .withDirector(createPersonName(index + 12))
    .withCast(cast)
    .withSynopsis(
      `Filme ${id} da categoria ${category}, com trama envolvente e desdobramentos até o ato final.`
    )
    .withSessions(createSessions(index))
    .build()
}

export const createMoviesDataset = (size = 1000): MovieDto[] => {
  return Array.from({ length: size }, (_, idx) => createMovieDto(idx + 1))
}
