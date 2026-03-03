# MovieDash (Vue + Vite)

Projeto Vue 3 com Vite contendo:

- PrimeVue + PrimeIcons
- TanStack Query (Vue)
- Tailwind CSS
- Tema customizado de UI
- Filtros de filmes por nome, categoria e data de estreia
- DataTable com expansão de linha para detalhes
- Pipeline de qualidade com ESLint, Prettier, Husky, lint-staged e Commitlint

## Requisitos

- Node.js 20+
- npm 10+

## Instalação

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

## Qualidade de código

```bash
npm run lint
npm run lint:fix
npm run format
```

## Fluxo de commits (Husky + Commitlint)

Os hooks estão configurados para:

- `pre-commit`: rodar `lint-staged`
- `commit-msg`: validar mensagem com `commitlint`

Padrão recomendado de commit (Conventional Commits):

```text
feat: adiciona filtro por categoria
fix: corrige ordenação da tabela
chore: atualiza dependências
```

## Estrutura principal

```text
src/
	features/
		movies/
			adapters/
				movieAdapter.ts
			builders/
				MovieBuilder.ts
			components/
				MovieFilters.vue
				MovieDataTable.vue
			composables/
				useMovieFilters.ts
			factories/
				movieFactory.ts
			mirage/
				server.ts
			pages/
				MoviesPage.vue
			services/
				movieApi.ts
			index.ts
	shared/
		themes/
			primevue/
				movieTheme.ts
				index.ts
	App.vue
	main.ts
	style.css
```

## Observações

- O tema customizado do PrimeVue está em `src/shared/themes/primevue/movieTheme.ts`.
- A API mock com grande massa de dados usa MirageJS em `src/features/movies/mirage/server.ts`.
- O dataset é criado com Builder + Factory em `src/features/movies/builders/MovieBuilder.ts` e `src/features/movies/factories/movieFactory.ts`.
- O Adapter de resposta está em `src/features/movies/adapters/movieAdapter.ts`.
- A configuração do lint-staged está em `.lintstagedrc.json`.

### Padrão de imports

O projeto usa alias `@/` apontando para `src/`.

Exemplo:

```ts
import AppLoader from '@/shared/components/AppLoader.vue'
import { useMovieFilters } from '@/features/movies/composables/useMovieFilters'
import { MoviesMainPage } from '@/features/movies'
```

`MoviesPage` e `MoviesMainPage` exportam o mesmo componente, mantendo compatibilidade de nomenclatura.

## Performance e Bundle

Para melhorar carregamento inicial e manter o bundle sob controle, o projeto usa:

- **Lazy-loading da feature de filmes**: a página principal da feature é carregada sob demanda em `App.vue`.
- **MirageJS somente em desenvolvimento**: o mock server é importado dinamicamente em `main.ts` apenas quando `import.meta.env.DEV` é `true`.
- **Code-splitting manual**: o `vite.config.ts` separa chunks de `primevue-ui`, `primevue-table`, `primeuix` e `vendor`.

Resultado prático:

- menor JavaScript inicial no carregamento da aplicação
- distribuição dos módulos pesados em chunks menores
- build de produção sem warning de chunk acima de 500 kB

## TanStack Query

O `VueQueryPlugin` está configurado globalmente em `src/main.ts` com `QueryClient`.

Exemplo de uso em composable:

```ts
import { useQuery } from '@tanstack/vue-query'
import { movieQueryKeys } from '@/features/movies'
import { getMovies } from '@/features/movies/services/movieApi'

const query = useQuery({
  queryKey: movieQueryKeys.list(),
  queryFn: getMovies,
})
```

## Documentação detalhada

- Fluxo completo da aplicação: [docs/fluxo-funcionamento.md](docs/fluxo-funcionamento.md)
- Fluxo de Adapters, Builders e Factories: [docs/arquitetura-adapters-builders-factories.md](docs/arquitetura-adapters-builders-factories.md)
