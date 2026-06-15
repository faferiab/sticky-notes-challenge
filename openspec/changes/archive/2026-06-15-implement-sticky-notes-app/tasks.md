## 1. Project Scaffolding

- [x] 1.1 Create directory structure (domain/, infrastructure/, components/atoms/, components/molecules/, components/organisms/, components/templates/, components/pages/, hooks/, utils/, tests/unit/, tests/integration/, tests/e2e/, stories/)
- [x] 1.2 Install dependencies (zustand, storybook, vitest, @testing-library/react, playwright, eslint-plugin-jsx-a11y)
- [x] 1.3 Configure vitest with React Testing Library setup
- [x] 1.4 Configure Playwright for e2e tests
- [x] 1.5 Add GitHub Actions workflow (.github/workflows/ci.yml)
- [x] 1.6 Add vercel.json deployment configuration

## 2. Domain Model & Store

- [x] 2.1 Define Note type and NoteColor type in domain/note/model.ts
- [x] 2.2 Implement Zustand store with all actions (createNote, moveNote, resizeNote, deleteNote, updateText, changeColor, bringToFront, loadNotes, saveNotes)
- [x] 2.3 Implement selectors (sortedNotes, activeNote, highestZIndex)
- [x] 2.4 Define store-side constants (default note size, minimum note size, color palette)

## 3. Infrastructure Layer

- [x] 3.1 Implement Logger interface and ConsoleLogger
- [x] 3.2 Implement Analytics interface and NoopAnalytics
- [x] 3.3 Define NotesRepository interface (load/save)
- [x] 3.4 Implement LocalStorageRepository
- [x] 3.5 Implement MockApiRepository with async delays

## 4. Atom Components

- [x] 4.1 Button component (semantic `<button>` with accessible label support)
- [x] 4.2 IconButton component (icon-only button with aria-label)
- [x] 4.3 TextArea component (auto-resizing `<textarea>`)
- [x] 4.4 ColorSwatch component (color square with name label)
- [x] 4.5 FocusRing component (keyboard focus indicator wrapper)

## 5. Molecule Components

- [x] 5.1 ResizeHandle component (drag handle at bottom-right corner)
- [x] 5.2 ColorPicker component (grid of ColorSwatches with keyboard selection)
- [x] 5.3 NoteHeader component (color indicator + accessible drag handle area)

## 6. Organism Components

- [x] 6.1 StickyNote component (NoteHeader + TextArea + ResizeHandle, positioned absolutely)
- [x] 6.2 Toolbar component (Create button + ColorPicker)
- [x] 6.3 TrashZone component (drop target at bottom, visual highlight on drag-over)
- [x] 6.4 NotesCanvas component (absolute-positioned container for all StickyNote instances)

## 7. Templates & Pages

- [x] 7.1 StickyNotesLayout component (Toolbar + NotesCanvas + TrashZone layout)
- [x] 7.2 StickyNotesPage component (top-level page wrapping StickyNotesLayout)
- [x] 7.3 Wire up App.tsx with StickyNotesPage
- [x] 7.4 Add global styles (CSS reset, font, min-height: 768px)

## 8. Drag & Resize Interactions

- [x] 8.1 Implement useDrag hook (pointer events for moving notes)
- [x] 8.2 Implement useResize hook (pointer events for resizing notes)
- [x] 8.3 Implement useDragToTrash hook (trash zone detection on drag)
- [x] 8.4 Integrate hooks into StickyNote and NotesCanvas components
- [x] 8.5 Add pointer capture and multi-browser compatibility handling

## 9. Accessibility

- [x] 9.1 Implement keyboard navigation (arrow keys, Tab, Enter, Delete, N, Shift+Arrow)
- [x] 9.2 Implement focus management (auto-focus new notes, predictable focus on delete)
- [x] 9.3 Add ARIA labels and screen reader announcements (create/delete)
- [x] 9.4 Validate color palette meets WCAG AAA contrast ratios
- [x] 9.5 Add FocusRing to all interactive elements

## 10. Persistence Integration

- [x] 10.1 Wire LocalStorageRepository into store (auto-save on every state change)
- [x] 10.2 Wire MockApiRepository as secondary sync mechanism
- [x] 10.3 Implement loadNotes on app initialization (page load)
- [x] 10.4 Add debounced save (300ms) to prevent rapid sequential writes

## 11. Testing

- [x] 11.1 Write unit tests for store actions and selectors
- [x] 11.2 Write unit tests for repositories (LocalStorage, MockApi)
- [x] 11.3 Write unit tests for hooks (useDrag, useResize)
- [x] 11.4 Write integration tests for StickyNote + store interactions
- [x] 11.5 Write integration tests for TrashZone + store interactions
- [x] 11.6 Write integration tests for keyboard navigation and focus management
- [x] 11.7 Write e2e tests (create, move, resize, delete, persistence)
- [x] 11.8 Write e2e tests (accessibility workflows)

## 12. Storybook

- [x] 12.1 Configure Storybook with @storybook/addon-a11y
- [x] 12.2 Write stories and documentation for all Atom components
- [x] 12.3 Write stories and documentation for all Molecule components
- [x] 12.4 Write stories and documentation for all Organism components
- [x] 12.5 Add accessibility validation to each story

## 13. CI/CD & Polish

- [x] 13.1 Verify GitHub Actions CI pipeline passes (lint → typecheck → test → build)
- [x] 13.2 Add lint rules for accessibility (eslint-plugin-jsx-a11y)
- [x] 13.3 Verify build output is production-ready
- [x] 13.4 Add README with setup, dev, build, and test instructions
