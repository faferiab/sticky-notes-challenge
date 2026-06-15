# ADR-001: Frontend Architecture for Sticky Notes Application

## Status
Accepted

## Context

The Sticky Notes application is a React + TypeScript single-page application that allows users to create, edit, move, resize, colorize, persist, and delete sticky notes.

The solution must satisfy both the interview assignment requirements and provide a scalable foundation for future evolution.

### Functional Requirements

#### Core Features
- Create notes at a specified position and size
- Move notes via drag-and-drop
- Resize notes via drag handles
- Delete notes by dragging them into a trash zone

#### Additional Features
- Edit note text
- Bring notes to front when selected
- Persist notes in Local Storage
- Support multiple note colors
- Persist notes through an asynchronous mocked REST API

### Non-Functional Requirements

- React + TypeScript
- Desktop-first application
- Latest Chrome, Firefox, and Edge support
- Strong static typing
- High performance interactions
- Maintainable architecture
- Scalable design

### Accessibility Requirements

Accessibility is a feature requirement, not an enhancement.

The application shall comply with:

- WCAG 2.2 AAA
- Semantic HTML
- Keyboard-only navigation
- Screen reader support
- Accessible labels
- Focus management
- Color contrast compliance
- Non-pointer interaction support

### Engineering Requirements

- Zustand state management
- Strict Atomic Design
- Storybook documentation
- Observability
- CI/CD
- Automated testing

---

## Decision Drivers

1. Accessibility First
2. Scalability
3. Maintainability
4. Performance
5. Type Safety
6. Testability
7. Observability
8. Design System Consistency
9. Developer Experience

---

## Decision

The application will adopt:

- React + TypeScript
- Zustand for state management
- Pointer Events for drag and resize interactions
- Strict Atomic Design
- Repository Pattern for persistence
- Storybook as the component catalog
- GitHub Actions for CI
- Vercel for deployment
- Accessibility-first component design
- Built-in observability abstractions

---

## Architecture Overview

### Layered Architecture

```text
UI Layer
├── Pages
├── Templates
├── Organisms
├── Molecules
└── Atoms

State Layer
├── Zustand Store
├── Selectors
└── Actions

Domain Layer
├── Note Model
├── Drag Logic
├── Resize Logic
├── Accessibility Rules
└── Persistence Rules

Infrastructure Layer
├── Local Storage Repository
├── Mock API Repository
├── Logger
└── Analytics
```

---

## Atomic Design Decision

### Decision

The application will follow Strict Atomic Design.

```text
Atoms
├── Button
├── IconButton
├── Input
├── TextArea
├── ColorSwatch
└── FocusRing

Molecules
├── ResizeHandle
├── ColorPicker
├── ToolbarButton
└── NoteHeader

Organisms
├── StickyNote
├── Toolbar
├── TrashZone
└── NotesCanvas

Templates
└── StickyNotesLayout

Pages
└── StickyNotesPage
```

### Consequences

Positive:

- Reusable components
- Consistent UI
- Easier Storybook documentation
- Better testability

Negative:

- More initial structure than required for a small prototype

---

## State Management Decision

### Decision

Zustand will be used as the single source of truth.

### State Model

```typescript
type Note = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  color: string;
  zIndex: number;
};
```

### Store Actions

```typescript
createNote()
moveNote()
resizeNote()
deleteNote()
updateText()
changeColor()
bringToFront()
loadNotes()
saveNotes()
```

### Rationale

- Minimal boilerplate
- Excellent TypeScript support
- High performance
- Easy future scalability

---

## Interaction Architecture

### Dragging and Resizing

Pointer Events will be used instead of HTML5 Drag and Drop.

Reasons:

- Better performance
- Greater control
- Consistent behavior
- Easier accessibility support

### Rendering Strategy

Notes will use:

```css
position: absolute;
transform: translate(x, y);
```

Benefits:

- GPU acceleration
- Reduced layout recalculations
- Smooth dragging experience

---

## Accessibility Architecture

### Decision

Accessibility requirements are enforced during component design.

### Semantic HTML

Use native elements whenever possible.

Examples:

```html
<main>
<section>
<aside>
<button>
<textarea>
```

Avoid generic div elements when semantic alternatives exist.

### Keyboard Navigation

Required keyboard interactions:

| Action | Shortcut |
|----------|----------|
| Create Note | N |
| Delete Note | Delete |
| Move Note | Arrow Keys |
| Resize Note | Shift + Arrow Keys |
| Cycle Notes | Tab |
| Bring To Front | Enter |

### Focus Management

Rules:

- Focus moves to newly created notes
- Focus returns predictably after dialogs
- Focus is preserved whenever possible
- Deleted note focus moves to the next logical target

### Screen Reader Support

Requirements:

- Accessible names for all interactive elements
- ARIA only when semantic HTML is insufficient
- Announcements for note creation and deletion

### Color Accessibility

- WCAG AAA contrast ratios
- Color is never the sole information carrier

---

## Persistence Architecture

### Decision

Persistence will be abstracted using the Repository Pattern.

### Contract

```typescript
interface NotesRepository {
  load(): Promise<Note[]>;
  save(notes: Note[]): Promise<void>;
}
```

### Implementations

```text
LocalStorageRepository
MockApiRepository
```

### Benefits

- Future backend replacement without UI changes
- Testability
- Clear separation of concerns

---

## Observability Architecture

### Decision

Observability will be built into the application from the beginning.

### Logger Abstraction

```typescript
interface Logger {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}
```

### Captured Events

- Note Created
- Note Updated
- Note Deleted
- Note Moved
- Note Resized
- Storage Loaded
- Storage Saved
- API Loaded
- API Saved

### Future Integrations

- Sentry
- Datadog
- New Relic

### Performance Monitoring

Metrics:

- Drag latency
- Resize latency
- Persistence latency
- Render duration

---

## Storybook Decision

### Decision

Storybook is the source of truth for component documentation.

### Requirements

Every Atom, Molecule, and Organism must include:

- Stories
- Controls
- Documentation
- Accessibility validation

### Tooling

```text
Storybook
@storybook/addon-a11y
```

Benefits:

- Living documentation
- Design consistency
- Easier onboarding
- Early accessibility validation

---

## Testing Strategy

### Decision

The project follows a testing pyramid.

### Distribution

```text
70% Unit Tests
20% Integration Tests
10% End-to-End Tests
```

### Unit Tests

Tools:

- Vitest
- React Testing Library

Coverage:

- Store actions
- Selectors
- Repositories
- Hooks
- Utilities
- Accessibility helpers

### Integration Tests

Coverage:

- Sticky Note + Store interactions
- Trash Zone + Store interactions
- Persistence flows
- Keyboard navigation
- Focus management

### End-to-End Tests

Tool:

- Playwright

Coverage:

- Create note
- Move note
- Resize note
- Delete note
- Persist note
- Accessibility workflows

---

## CI/CD Decision

### Continuous Integration

Platform:

- GitHub Actions

Pipeline:

```text
Install
↓
Lint
↓
Type Check
↓
Unit Tests
↓
Integration Tests
↓
Build
↓
Storybook Validation
```

### Continuous Delivery

Platform:

- Vercel

Deployment Flow:

```text
Feature Branch
↓
Pull Request
↓
Preview Deployment

Main Branch
↓
GitHub Actions
↓
Production Deployment
```

Benefits:

- Fast feedback
- Automated quality gates
- Consistent deployments

---

## Project Structure

```text
src
├── app
│   ├── providers
│   ├── routes
│   └── store
│
├── domain
│   ├── note
│   ├── accessibility
│   └── persistence
│
├── infrastructure
│   ├── repositories
│   ├── logger
│   └── analytics
│
├── components
│   ├── atoms
│   ├── molecules
│   ├── organisms
│   ├── templates
│   └── pages
│
├── hooks
├── utils
├── stories
├── tests
│   ├── unit
│   ├── integration
│   └── e2e
│
└── styles
```

---

## Consequences

### Positive

- Accessibility-first implementation
- Strong separation of concerns
- High testability
- Scalable architecture
- Strong TypeScript support
- Built-in observability
- Automated deployment pipeline
- Consistent design system

### Negative

- Additional complexity compared to a minimal solution
- More upfront setup effort
- Additional maintenance of Storybook and test suites

These trade-offs are acceptable because they align with production-grade engineering practices while remaining appropriate for the assignment scope.

---

## Future Evolution

The architecture supports future implementation of:

- Real REST APIs
- WebSockets
- Collaborative editing
- Offline-first capabilities
- Undo/Redo
- Audit logging
- Analytics dashboards
- Multi-user workspaces

No major architectural redesign is expected to support these capabilities.
