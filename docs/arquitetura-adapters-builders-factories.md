# Arquitetura: Adapters, Builders e Factories

Este documento descreve como os padrões Adapters, Builders e Factories foram aplicados na feature de filmes do MovieDash.

## Objetivo

Separar responsabilidades para facilitar manutenção, testes e evolução da feature:

- **Builder**: construção consistente de objetos DTO
- **Factory**: geração de massa de dados em escala
- **Adapter**: transformação de formato externo (DTO) para formato interno (domínio/UI)

---

## 1. Builder

Arquivo: [src/features/movies/builders/MovieBuilder.ts](src/features/movies/builders/MovieBuilder.ts)

### Responsabilidade

Encapsular a criação de um DTO de filme com API fluente (`withX`) para cada campo.

### Benefícios

- reduz acoplamento entre quem gera dados e o formato final
- centraliza estrutura do DTO em um único lugar
- facilita inclusão/remoção de campos futuros

### Exemplo conceitual

1. `new MovieBuilder(id)`
2. `.withTitle(...)`
3. `.withCategory(...)`
4. `.build()`

---

## 2. Factory

Arquivo: [src/features/movies/factories/movieFactory.ts](src/features/movies/factories/movieFactory.ts)

### Responsabilidade

Gerar uma coleção grande de filmes DTO (`createMoviesDataset`) usando o `MovieBuilder`.

### Como funciona

- Define catálogos base (categorias, classificações, salas, idiomas, nomes)
- Usa funções auxiliares determinísticas para montar valores
- Cria cada registro via builder
- Retorna um array com tamanho configurável (`size`)

### Benefícios

- permite simular cenários reais com grande volume
- evita dados mock manuais repetitivos
- facilita benchmark de paginação/filtros/UX

---

## 3. Adapter

Arquivo: [src/features/movies/adapters/movieAdapter.ts](src/features/movies/adapters/movieAdapter.ts)

### Responsabilidade

Converter o DTO recebido da API mock para o modelo utilizado pela interface.

### Conversões aplicadas

- `release_date` → `releaseDate`
- `duration_minutes` → `duration`
- `director_name` → `director`
- `cast_members` → `cast`

### Benefícios

- isola mudanças de contrato da API
- evita espalhar transformação pela UI
- mantém a camada de apresentação limpa e previsível

---

## 4. Encadeamento entre os padrões

1. **Factory** gera N registros
2. **Builder** garante estrutura de cada DTO
3. Mirage entrega payload em `/api/movies`
4. Service consome endpoint
5. **Adapter** transforma DTO em modelo da UI
6. Composable aplica filtros e expõe estado para a página

---

## 5. Pontos de extensão

### Se a API real mudar

- alterar somente o adapter
- manter componentes e composables sem mudanças estruturais

### Se precisar enriquecer massa de dados

- adicionar métodos no builder
- atualizar regras na factory

### Se houver múltiplas origens de dados

- manter adapters por origem (`movieApiAdapter`, `legacyMovieAdapter`, etc.)
- normalizar para o mesmo modelo de domínio

---

## 6. Conclusão

A combinação de Adapters + Builders + Factories trouxe:

- separação clara de camadas
- maior legibilidade e organização
- menor impacto de mudanças de contrato
- facilidade para trabalhar com grandes massas de dados
