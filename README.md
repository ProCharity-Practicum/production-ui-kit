# Template for React UI-library

Stack: 
- React 18
- TypeScript 5
- Dart SASS \ SCSS

Toolset:
- Yarn + PNP, zero install ready
- Vite
- Storybook + Playwright tests
- ESlint
- Prettier
- Husky + lint-staged
- generate-react-cli configuration

# Installation

1. Clone repository
2. cd DIR
3. yarn

# Commands

### Create new component
`yarn gen component Name` — place new component files in src/components including CSS module and story.

`yarn gen component Name --withLazy=true` — like first, but add index.ts file with default lazy export of component for federation, pages and etc.

---
### Run in watch mode 
`yarn dev` — just execute build --watch for rebuild on changes, usefull when this repo used as dependency somewhere else. 

---

### Build library
`yarn build` — required for publishing library or using in other packages as dependency.

`yarn build-storybook` — used for publishing storybook build somewhere like chromatic.

---

### Check code quality
`yarn lint` — execute eslint
`yarn format` — format code in src/
`yarn test` — execute all tests, initial include only storybook tests

### Developing
`yarn storybook` — main development environment.

# Do as follows:
1. generate new component
2. define prop types
3. write a story
4. write a play function for key use cases
5. develop component while looking to story preview
6. add more use cases playbooks

# Naming conventions

Prefixed names:
- `Layout*` — global page Layout, top-level component of every page or screen
- `Section*` — second level component under Layout
- `Card*` — box content wrapper for column based content presentation

Postfixed names:
- `*Page` — top level component for building page including Layout and all under
- `*Screen` — middle level component for building large part of page, screen flow, modal content and etc. Don't include top-level Layouts.
- `*Flow` — group of screens combined with internal routing logic.