## Context

This is a greenfield single-page application for sticky notes built with React 19 + TypeScript + Vite. The architecture is defined in ADR-001, which establishes Zustand for state management, Strict Atomic Design for components, Pointer Events for drag/resize interactions, Repository Pattern for persistence, Storybook for component documentation, and CI/CD via GitHub Actions and Vercel.

The current codebase contains only the default Vite + React scaffold. All application code will be written from scratch following the architectural decisions in ADR-001.

## Goals / Non-Goals

**Goals:**
- Implement four core sticky note interactions: create, move, resize, delete via trash zone
- Implement five bonus features: text editing, bring-to-front layering, multiple colors, LocalStorage persistence, mock REST API persistence
- Follow Strict Atomic Design component hierarchy exactly as specified in ADR-001
- Achieve WCAG 2.2 AAA accessibility compliance
- Deliver full test coverage (unit, integration, e2e)
- Build Storybook catalog with accessibility validation for every component
- Set up GitHub Actions CI pipeline and Vercel deployment

**Non-Goals:**
- Real REST API implementation (mock only, with async delays)
- Multi-user or collaborative editing
- Undo/redo functionality
- Offline-first mode beyond LocalStorage persistence
- Mobile or touch-optimized interactions (desktop-first: 1024×768 minimum)

## Decisions

### 1. State Management: Zustand
- Single store with the `Note` model: `{ id, x, y, width, height, text, color, zIndex }`
- Actions: `createNote`, `moveNote`, `resizeNote`, `deleteNote`, `updateText`, `changeColor`, `bringToFront`, `loadNotes`, `saveNotes`
- Selectors for derived data (e.g., `sortedNotes`, `highestZIndex`)
- **Why Zustand over Context/Redux**: Minimal boilerplate, excellent TypeScript inference, no provider nesting, performant selective re-renders. Consistent with ADR-001.

### 2. Interactions: Pointer Events
- `onPointerDown` / `onPointerMove` / `onPointerUp` on note and resize handle elements
- Event listeners attached to `document` during drag/resize to capture moves outside the element
- **Why not HTML5 Drag and Drop**: Pointer Events offer better performance, finer control, unified pointer/cursor handling, and simpler accessibility integration as specified in ADR-001.

### 3. Rendering Strategy: CSS Transforms
- Notes rendered with `position: absolute; transform: translate(x, y);`
- Width/height applied via inline `width`/`height` styles
- **Why**: GPU-accelerated transforms avoid layout thrashing during drag operations. Only composite changes, no reflows.

### 4. Persistence: Repository Pattern
```
NotesRepository (interface)
├── LocalStorageRepository
└── MockApiRepository
```
- `load(): Promise<Note[]>` and `save(notes: Note[]): Promise<void>`
- Strategy: use LocalStorage primarily, MockApi as secondary/fallback or sync target
- Both implementations include artificial async delay (setTimeout) to simulate real I/O
- **Why**: Decouples persistence logic from UI. Future real API drops in without component changes.

### 5. Component Architecture: Strict Atomic Design

```
Atoms
├── Button              - Base button element
├── IconButton          - Icon-only button with accessible label
├── TextArea            - Auto-resizing textarea for note content
├── ColorSwatch         - Single color square indicator
└── FocusRing           - Keyboard focus indicator wrapper

Molecules
├── ResizeHandle        - Drag handle for note resizing (positioned at corners/edges)
├── ColorPicker         - Grid of ColorSwatches for selection
├── ToolbarButton       - Button with tooltip for toolbar actions
└── NoteHeader          - Top bar of note with color indicator and drag handle

Organisms
├── StickyNote          - Complete sticky note (header + textarea + resize handles)
├── Toolbar             - Top toolbar with create button, color picker
├── TrashZone           - Bottom drop zone for note deletion
└── NotesCanvas         - Full-canvas container for all notes

Templates
└── StickyNotesLayout   - Layout shell (toolbar + canvas + trash zone)

Pages
└── StickyNotesPage     - Root page component
```

### 6. Accessibility
- All interactive elements are semantic HTML (`<button>`, `<textarea>`, `<section>`, `<main>`)
- Keyboard navigation: Arrow keys to move, Shift+Arrow to resize, N to create, Delete to remove, Enter to bring to front, Tab to cycle notes
- Focus management: newly created notes receive focus, deleted notes pass focus to next note
- Screen reader: `aria-label` on all interactive elements, live regions for create/delete announcements
- Color: never the sole information carrier — text labels accompany color indicators
- WCAG AAA contrast ratios enforced via a defined color palette

### 7. Observability
```typescript
interface Logger {
  info(message: string, data?: Record<string, unknown>): void;
  warn(message: string, data?: Record<string, unknown>): void;
  error(message: string, data?: Record<string, unknown>): void;
}
```
- Events captured: NoteCreated, NoteMoved, NoteResized, NoteDeleted, NoteTextUpdated, NoteColorChanged, NoteBroughtToFront, StorageLoaded, StorageSaved, ApiLoaded, ApiSaved
- ConsoleLogger implementation for development; designed to accept Sentry/Datadog/NewRelic adapters later

### 8. Testing
- **Unit (Vitest)**: Store actions, selectors, repositories, hooks, utilities, accessibility helpers
- **Integration (Vitest + RTL)**: Note+Store interactions, TrashZone+Store, persistence flows, keyboard navigation, focus management
- **E2E (Playwright)**: Create, move, resize, delete, persist, accessibility workflows

### 9. CI/CD
- **CI (GitHub Actions)**: Install → Lint → Type Check → Unit Tests → Integration Tests → Build → Storybook Validation
- **CD (Vercel)**: Feature branches → Preview Deployments, Main → Production Deployment

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Pointer Events not firing reliably on all browsers | Use `setPointerCapture` and fallback to mouse events in pointer polyfill |
| Drag performance with many notes (50+) | CSS transforms keep compositing cheap; if needed, add virtualization later |
| Repository save race conditions | Debounce auto-save (300ms) and queue sequential saves |
| Accessibility complexity increases build time | Address a11y per-component during implementation, not at the end |
| Zustand store becomes a god object | Split into slices if store grows beyond 10 actions |
| Storybook maintenance burden | Auto-generate stories from component props where possible |
