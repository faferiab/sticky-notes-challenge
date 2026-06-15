import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StickyNote } from '../../src/components/organisms/StickyNote'
import { useNoteStore } from '../../src/store'
import type { Note } from '../../src/domain/note'

function createTestNote(overrides?: Partial<Note>): Note {
  return {
    id: 'test-1',
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    text: 'Test content',
    color: 'yellow',
    zIndex: 1,
    ...overrides,
  }
}

describe('StickyNote', () => {
  beforeEach(() => {
    useNoteStore.setState({ notes: [], activeNoteId: null })
  })

  it('renders note text', () => {
    const note = createTestNote()
    render(
      <StickyNote
        note={note}
        onHeaderPointerDown={() => {}}
        onResizePointerDown={() => {}}
      />,
    )
    expect(screen.getByDisplayValue('Test content')).toBeInTheDocument()
  })

  it('renders with correct position styles', () => {
    const note = createTestNote({ x: 300, y: 400, width: 250, height: 150 })
    const { container } = render(
      <StickyNote
        note={note}
        onHeaderPointerDown={() => {}}
        onResizePointerDown={() => {}}
      />,
    )
    const el = container.firstChild as HTMLElement
    expect(el.style.left).toBe('300px')
    expect(el.style.top).toBe('400px')
    expect(el.style.width).toBe('250px')
    expect(el.style.height).toBe('150px')
  })

  it('has accessible role and label', () => {
    const note = createTestNote()
    render(
      <StickyNote
        note={note}
        onHeaderPointerDown={() => {}}
        onResizePointerDown={() => {}}
      />,
    )
    expect(screen.getByRole('button', { name: /sticky note/i })).toBeInTheDocument()
  })

  it('calls updateText on store when text changes', () => {
    const note = createTestNote()
    useNoteStore.getState().loadNotes([note])
    useNoteStore.getState().setActiveNote(note.id)

    render(
      <StickyNote
        note={useNoteStore.getState().notes[0]}
        onHeaderPointerDown={() => {}}
        onResizePointerDown={() => {}}
      />,
    )

    const textarea = screen.getByDisplayValue('Test content')
    fireEvent.change(textarea, { target: { value: 'Updated content' } })

    const updatedNote = useNoteStore.getState().notes[0]
    expect(updatedNote.text).toBe('Updated content')
  })

  it('brings note to front on click', async () => {
    const user = userEvent.setup()
    useNoteStore.getState().createNote()
    useNoteStore.getState().createNote()
    const firstNote = useNoteStore.getState().notes[0]
    const secondNote = useNoteStore.getState().notes[1]

    render(
      <StickyNote
        note={firstNote}
        onHeaderPointerDown={() => {}}
        onResizePointerDown={() => {}}
      />,
    )

    const el = screen.getByRole('button', { name: /sticky note/i })
    await user.click(el)

    const updated = useNoteStore.getState().notes.find((n) => n.id === firstNote.id)
    expect(updated!.zIndex).toBeGreaterThan(secondNote.zIndex)
  })
})
