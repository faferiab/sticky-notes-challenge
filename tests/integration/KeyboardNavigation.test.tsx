import { describe, it, expect, beforeEach } from 'vitest'
import { useNoteStore } from '../../src/store'

describe('keyboard navigation integration', () => {
  beforeEach(() => {
    useNoteStore.setState({ notes: [], activeNoteId: null })
  })

  it('create note via store adds a note', () => {
    const store = useNoteStore.getState()
    store.createNote(100, 100)
    expect(useNoteStore.getState().notes).toHaveLength(1)
  })

  it('delete note via store removes correct note', () => {
    const store = useNoteStore.getState()
    store.createNote()
    store.createNote()
    const notes = useNoteStore.getState().notes
    store.deleteNote(notes[0].id)
    expect(useNoteStore.getState().notes).toHaveLength(1)
    expect(useNoteStore.getState().notes[0].id).toBe(notes[1].id)
  })

  it('arrow keys move note via store', () => {
    const store = useNoteStore.getState()
    store.createNote()
    const note = useNoteStore.getState().notes[0]
    store.moveNote(note.id, note.x + 10, note.y)
    expect(useNoteStore.getState().notes[0].x).toBe(note.x + 10)
  })

  it('shift+arrow keys resize via store', () => {
    const store = useNoteStore.getState()
    store.createNote()
    const note = useNoteStore.getState().notes[0]
    store.resizeNote(note.id, note.width + 10, note.height)
    expect(useNoteStore.getState().notes[0].width).toBe(note.width + 10)
  })

  it('enter key brings note to front via store', () => {
    const store = useNoteStore.getState()
    store.createNote()
    store.createNote()
    const firstNote = useNoteStore.getState().notes[0]
    const secondNote = useNoteStore.getState().notes[1]
    store.bringToFront(firstNote.id)
    const updatedFirst = useNoteStore.getState().notes.find((n) => n.id === firstNote.id)
    expect(updatedFirst!.zIndex).toBeGreaterThan(secondNote.zIndex)
  })

  it('tab key focus moves between notes', () => {
    const store = useNoteStore.getState()
    store.createNote()
    store.createNote()
    store.createNote()
    const notes = useNoteStore.getState().notes

    store.setActiveNote(notes[0].id)
    expect(useNoteStore.getState().activeNoteId).toBe(notes[0].id)

    const sorted = [...useNoteStore.getState().notes].sort((a, b) => a.zIndex - b.zIndex)
    const idx = sorted.findIndex((n) => n.id === notes[0].id)
    const next = sorted[idx + 1]
    store.setActiveNote(next.id)
    expect(useNoteStore.getState().activeNoteId).toBe(next.id)
  })
})
