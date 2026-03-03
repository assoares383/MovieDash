# Guia de Contribuição

Obrigado por contribuir com este projeto.

## Pré-requisitos

- Node.js 20+
- npm 10+

## Setup local

1. Instale as dependências:

```bash
npm install
```

2. Rode o projeto em desenvolvimento:

```bash
npm run dev
```

## Padrão de branch

Use o formato:

```text
<tipo>/<descricao-curta>
```

Exemplos:

- feat/filtro-por-categoria
- fix/corrige-expand-row
- chore/atualiza-dependencias

## Padrão de commit

Este repositório usa Conventional Commits via Commitlint.

Formato:

```text
<tipo>: <mensagem>
```

Tipos comuns:

- feat
- fix
- chore
- docs
- refactor
- test

Exemplos:

- feat: adiciona filtro por data de estreia
- fix: corrige renderização do detalhe no expand row
- docs: atualiza instruções do README

## Hooks e validações

- pre-commit: executa lint-staged
- commit-msg: valida mensagem de commit com commitlint

Validações manuais recomendadas antes do push:

```bash
npm run lint
npm run build
```

## Checklist de Pull Request

Antes de abrir PR, confirme:

- [ ] O escopo da alteração está focado
- [ ] O projeto compila com npm run build
- [ ] Não há erros no lint com npm run lint
- [ ] O comportamento foi validado localmente
- [ ] O README foi atualizado quando necessário
- [ ] A mensagem de commit segue Conventional Commits

## Diretrizes gerais

- Prefira mudanças pequenas e incrementais
- Evite incluir alterações não relacionadas no mesmo PR
- Mantenha o padrão visual e de componentes já adotado
- Documente decisões importantes na descrição da PR
- Prefira imports com alias `@/` em vez de caminhos relativos longos (`../../..`)

## Checklist de performance

Ao mexer em estrutura de tela, dados ou dependências, valide:

- [ ] A feature nova pode usar lazy-loading quando fizer sentido
- [ ] Código de mock (Mirage) permanece restrito ao ambiente de desenvolvimento
- [ ] O build não introduz novos warnings críticos de chunk
- [ ] O carregamento inicial não foi degradado por imports desnecessários
- [ ] Alterações de chunking/otimização foram documentadas no README quando aplicável
