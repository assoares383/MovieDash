import { describe, expect, it } from 'vitest'
import { MovieBuilder } from './MovieBuilder'

describe('MovieBuilder', () => {
  it('constrói DTO com API fluente', () => {
    const dto = new MovieBuilder(10)
      .withTitle('Filme Builder')
      .withCategory('Suspense')
      .withReleaseDate('2024-05-05')
      .withDuration(110)
      .withRating('16 anos')
      .withDirector('Diretor X')
      .withCast(['A', 'B'])
      .withSynopsis('Sinopse X')
      .withSessions([{ room: 'Sala 2', time: '20:00', language: 'Legendado' }])
      .build()

    expect(dto).toEqual({
      id: 10,
      title: 'Filme Builder',
      category: 'Suspense',
      release_date: '2024-05-05',
      duration_minutes: 110,
      rating: '16 anos',
      director_name: 'Diretor X',
      cast_members: ['A', 'B'],
      synopsis: 'Sinopse X',
      sessions: [{ room: 'Sala 2', time: '20:00', language: 'Legendado' }],
    })
  })

  it('retorna clone no build', () => {
    const builder = new MovieBuilder(1).withTitle('Original')
    const dto = builder.build()

    dto.title = 'Mutado fora'

    const rebuilt = builder.build()
    expect(rebuilt.title).toBe('Original')
  })
})
