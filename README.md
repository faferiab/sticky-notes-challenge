# Sticky Notes

A React + TypeScript single-page application for creating, editing, moving, resizing, colorizing, and deleting sticky notes with persistence.

## Tech Stack

- **Framework**: React 19 + TypeScript 6
- **Build**: Vite 8
- **State**: Zustand 5
- **Persistence**: LocalStorage + Mock REST API (Repository Pattern)
- **Interactions**: Pointer Events (drag, resize)
- **Testing**: Vitest + React Testing Library (unit/integration), Playwright (e2e)
- **Documentation**: Storybook with accessibility validation
- **CI/CD**: GitHub Actions + Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Available Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting without writing |
| `npm test` | Run all unit and integration tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:ui` | Run tests with Vitest UI |
| `npx playwright test` | Run e2e tests (requires dev server) |
| `npx storybook dev` | Start Storybook |

## Project Structure

```
src/
├── domain/note/          # Domain model (Note, NoteColor, constants)
├── store/                # Zustand store (actions, selectors)
├── infrastructure/       # Repository, Logger, Analytics implementations
├── components/
│   ├── atoms/            # Button, IconButton, TextArea, ColorSwatch, FocusRing
│   ├── molecules/        # ResizeHandle, ColorPicker, NoteHeader
│   ├── organisms/        # StickyNote, Toolbar, TrashZone, NotesCanvas
│   ├── templates/        # StickyNotesLayout
│   └── pages/            # StickyNotesPage
├── hooks/                # useDrag, useResize, useDragToTrash, usePersistence
└── utils/                # debounce
stories/                  # Storybook stories (atomic design hierarchy)
tests/
├── unit/                 # Vitest unit tests (store, repositories, hooks)
├── integration/          # RTL integration tests (component + store)
└── e2e/                  # Playwright e2e tests (notes, accessibility)
```

## Testing Strategy

- **Unit tests** cover store actions/selectors, repositories, and hooks
- **Integration tests** verify component + store interactions (StickyNote, TrashZone, keyboard navigation)
- **E2E tests** validate full workflows: create, move, resize, delete, persistence, and accessibility

```bash
npm test                          # Unit + integration
npx playwright test               # E2E
```

## Accessibility

WCAG 2.2 AAA compliant:
- Semantic HTML (`<button>`, `<textarea>`, `<main>`, `<section>`)
- Keyboard navigation (arrow keys, Tab, Enter, Delete, N)
- ARIA labels and live regions for screen readers
- Focus management on create/delete
- High-contrast color palette

## Architecture

Atomic Design component hierarchy with strict layering: Atoms → Molecules → Organisms → Templates → Pages. State managed via Zustand with Repository Pattern for persistence. Pointer Events for drag/resize interactions with pointer capture for reliable multi-browser support.

Deployed at: [Live](https://sticky-notes-challenge.onrender.com)