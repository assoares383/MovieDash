# Fluxo de Funcionamento da Aplicação

Este documento descreve o fluxo completo do MovieDash, desde o bootstrap até a renderização da lista de filmes com filtros, paginação e feedback visual.

## 1. Inicialização da aplicação

1. O arquivo [src/main.ts](src/main.ts) inicializa o MirageJS com `makeMoviesServer`.
2. Em seguida, configura o PrimeVue com o tema customizado.
3. O Vue monta o app principal (`App.vue`), que renderiza a feature de filmes.

## 2. Inicialização da API mock (MirageJS)

1. O servidor mock é criado em [src/features/movies/mirage/server.ts](src/features/movies/mirage/server.ts).
2. A rota `GET /api/movies` retorna um payload com:
   - `movies`: lista de filmes em formato DTO
   - `total`: total de itens
3. A massa é gerada em memória por factory, permitindo simular grandes volumes (1200 registros).

## 3. Geração da massa de dados

1. A factory [src/features/movies/factories/movieFactory.ts](src/features/movies/factories/movieFactory.ts) cria o dataset.
2. O builder [src/features/movies/builders/MovieBuilder.ts](src/features/movies/builders/MovieBuilder.ts) define a estrutura de cada DTO.
3. Essa combinação garante padronização de campos e escalabilidade para gerar milhares de itens.

## 4. Carregamento de dados na feature

1. O composable [src/features/movies/composables/useMovieFilters.ts](src/features/movies/composables/useMovieFilters.ts) é chamado na página da feature.
2. No `onMounted`, ele executa `getMovies` do service [src/features/movies/services/movieApi.ts](src/features/movies/services/movieApi.ts).
3. O service faz `fetch('/api/movies')`.
4. A resposta é adaptada pelo adapter [src/features/movies/adapters/movieAdapter.ts](src/features/movies/adapters/movieAdapter.ts).
5. O estado interno do composable é atualizado:
   - `movies`
   - `isLoading`
   - `hasError`

## 5. Filtros

A tela usa o componente [src/features/movies/components/MovieFilters.vue](src/features/movies/components/MovieFilters.vue) para editar o estado `filters` com três critérios:

- Filme (texto)
- Categoria (select)
- Data de estreia (date picker)

No composable, `filteredMovies` é calculado por `computed`, aplicando os critérios de forma cumulativa.

## 6. Paginação e seletor de itens por página

Na página [src/features/movies/pages/MoviesPage.vue](src/features/movies/pages/MoviesPage.vue):

1. O estado de paginação define:
   - `first` (offset)
   - `rows` (itens por página), padrão = `10`
   - `rowsOptions` ([10, 20, 50, 100])
2. `paginatedMovies` realiza o recorte (`slice`) sobre `filteredMovies`.
3. O componente [src/features/movies/components/MoviesPagination.vue](src/features/movies/components/MoviesPagination.vue):
   - exibe o paginador
   - exibe o select de itens por página
   - emite eventos para atualizar `first` e `rows`
4. Ao trocar `rows`, a página volta para a primeira página (`first = 0`).
5. Um `watch` ajusta automaticamente `first` quando os filtros mudam e reduzem o total de registros.

## 7. Feedback visual (loader e erro)

A página renderiza estados visuais:

- `isLoading = true` → componente [src/shared/components/AppLoader.vue](src/shared/components/AppLoader.vue)
- `hasError = true` → mensagem de erro
- sucesso → DataTable + paginação

Isso evita tela vazia durante carregamento e melhora a experiência do usuário.

## 8. DataTable e expansão de linha

O componente [src/features/movies/components/MovieDataTable.vue](src/features/movies/components/MovieDataTable.vue):

- recebe os filmes já paginados
- renderiza colunas principais
- permite expandir linha para ver detalhes (diretor, duração, sinopse, elenco e sessões)

## 9. Resumo do fluxo ponta a ponta

1. App sobe e inicia MirageJS.
2. Composable busca filmes na API mock.
3. Service recebe DTOs e adapter converte para modelo de UI.
4. Filtros reduzem o conjunto.
5. Paginação recorta o resultado filtrado.
6. Loader/erro/sucesso são exibidos conforme estado.
7. Tabela mostra dados e detalhes por expansão.
