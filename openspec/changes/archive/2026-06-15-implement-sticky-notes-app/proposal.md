## Why

The project requires a Sticky Notes single-page web application with four core interactions: create, resize, move, and delete notes. Beyond the core requirements, five bonus features (text editing, layering, persistence, colors, REST API) are specified as stretch goals. The application needs a production-quality architecture from the start — accessibility-first, well-tested, and scalable — rather than a throwaway prototype.

## What Changes

- Scaffold a React + TypeScript + Vite application with full project structure
- Implement core sticky note interactions via Pointer Events:
  - Create notes at a specified position and size
  - Resize notes by dragging resize handles
  - Move notes by dragging their body
  - Delete notes by dragging them onto a trash zone
- Implement note text editing with inline textarea
- Implement note layering (bring to front on click)
- Implement multiple note colors
- Implement persistence via Repository Pattern (LocalStorage + mock REST API)
- Adopt Strict Atomic Design component hierarchy
- Add Zustand for state management
- Build Storybook component catalog with accessibility validation
- Add full test suite: Vitest unit tests, React Testing Library integration tests, Playwright e2e tests
- Set up CI/CD: GitHub Actions pipeline + Vercel deployment
- Build-in observability (Logger + Analytics abstractions)
- Comply with WCAG 2.2 AAA accessibility standards

## Capabilities

### New Capabilities
- `note-crud`: Create, move, resize, and delete sticky notes via pointer and keyboard interactions
- `note-text-editing`: Inline editing of note text content
- `note-layering`: Z-index management for overlapping notes, bring to front on interaction
- `note-colors`: Selection and application of multiple note colors with WCAG AAA contrast
- `note-persistence`: Save and restore notes via LocalStorage and a mock asynchronous REST API

### Modified Capabilities
<!-- No existing capabilities to modify; this is a greenfield project. -->

## Impact

- **Greenfield application** — no existing code to modify (current `src/` contains only Vite scaffold files)
- **Dependencies added**: React 19, Zustand, Storybook, Vitest, React Testing Library, Playwright, ESLint a11y plugin
- **Project structure** reorganized into layered architecture: `domain/`, `infrastructure/`, `components/` (atomic design), `hooks/`, `tests/`
- **`.github/workflows/`** added for CI pipeline
- **`vercel.json`** added for deployment configuration
- **`stories/`** directory added for Storybook
