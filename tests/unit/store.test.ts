import { describe, it, expect, beforeEach } from 'vitest'
import { useNoteStore, getSortedNotes, getHighestZIndex } from '../../src/store'
import type { Note } from '../../src/domain/note'

beforeEach(() => {
  useNoteStore.setState({ notes: [], activeNoteId: null })
})

describe('store actions', () => {
  it('createNote adds a note with defaults', () => {
    useNoteStore.getState().createNote()
    const { notes } = useNoteStore.getState()
    expect(notes).toHaveLength(1)
    expect(notes[0].text).toBe('')
    expect(notes[0].color).toBe('yellow')
    expect(notes[0].width).toBe(200)
    expect(notes[0].height).toBe(200)
    expect(notes[0].zIndex).toBe(1)
    expect(notes[0].x).toBeGreaterThanOrEqual(0)
    expect(notes[0].y).toBeGreaterThanOrEqual(0)
  })

  it('createNote sets activeNoteId', () => {
    useNoteStore.getState().createNote()
    const { activeNoteId, notes } = useNoteStore.getState()
    expect(activeNoteId).toBe(notes[0].id)
  })

  it('createNote at specific position', () => {
    useNoteStore.getState().createNote(300, 400)
    const { notes } = useNoteStore.getState()
    expect(notes[0].x).toBe(300)
    expect(notes[0].y).toBe(400)
  })

  it('createNote with specific color', () => {
    useNoteStore.getState().createNote(undefined, undefined, 'blue')
    const { notes } = useNoteStore.getState()
    expect(notes[0].color).toBe('blue')
  })

  it('moveNote changes position', () => {
    useNoteStore.getState().createNote()
    const note = useNoteStore.getState().notes[0]
    useNoteStore.getState().moveNote(note.id, 150, 250)
    const updated = useNoteStore.getState().notes[0]
    expect(updated.x).toBe(150)
    expect(updated.y).toBe(250)
  })

  it('resizeNote changes dimensions', () => {
    useNoteStore.getState().createNote()
    const note = useNoteStore.getState().notes[0]
    useNoteStore.getState().resizeNote(note.id, 300, 150)
    const updated = useNoteStore.getState().notes[0]
    expect(updated.width).toBe(300)
    expect(updated.height).toBe(150)
  })

  it('resizeNote enforces minimum dimensions', () => {
    useNoteStore.getState().createNote()
    const note = useNoteStore.getState().notes[0]
    useNoteStore.getState().resizeNote(note.id, 10, 10)
    const updated = useNoteStore.getState().notes[0]
    expect(updated.width).toBe(100)
    expect(updated.height).toBe(80)
  })

  it('deleteNote removes a note', () => {
    useNoteStore.getState().createNote()
    const note = useNoteStore.getState().notes[0]
    useNoteStore.getState().deleteNote(note.id)
    expect(useNoteStore.getState().notes).toHaveLength(0)
  })

  it('deleteNote clears activeNoteId when deleting active', () => {
    useNoteStore.getState().createNote()
    const note = useNoteStore.getState().notes[0]
    expect(useNoteStore.getState().activeNoteId).toBe(note.id)
    useNoteStore.getState().deleteNote(note.id)
    expect(useNoteStore.getState().activeNoteId).toBeNull()
  })

  it('updateText changes note text', () => {
    useNoteStore.getState().createNote()
    const note = useNoteStore.getState().notes[0]
    useNoteStore.getState().updateText(note.id, 'Hello world')
    expect(useNoteStore.getState().notes[0].text).toBe('Hello world')
  })

  it('changeColor changes note color', () => {
    useNoteStore.getState().createNote()
    const note = useNoteStore.getState().notes[0]
    useNoteStore.getState().changeColor(note.id, 'blue')
    expect(useNoteStore.getState().notes[0].color).toBe('blue')
  })

  it('bringToFront increases zIndex above all others', () => {
    useNoteStore.getState().createNote()
    useNoteStore.getState().createNote()
    const notes = useNoteStore.getState().notes
    const first = notes[0]
    const second = notes[1]
    useNoteStore.getState().bringToFront(first.id)
    expect(useNoteStore.getState().notes.find((n) => n.id === first.id)!.zIndex).toBeGreaterThan(
      second.zIndex,
    )
  })

  it('loadNotes replaces all notes', () => {
    useNoteStore.getState().createNote()
    const newNotes: Note[] = [
      {
        id: 'test-1',
        x: 10,
        y: 20,
        width: 100,
        height: 100,
        text: 'loaded',
        color: 'green',
        zIndex: 5,
      },
    ]
    useNoteStore.getState().loadNotes(newNotes)
    expect(useNoteStore.getState().notes).toHaveLength(1)
    expect(useNoteStore.getState().notes[0].text).toBe('loaded')
    expect(useNoteStore.getState().notes[0].color).toBe('green')
  })

  it('saveNotes returns current notes', () => {
    useNoteStore.getState().createNote()
    const saved = useNoteStore.getState().saveNotes()
    expect(saved).toEqual(useNoteStore.getState().notes)
  })

  it('setActiveNote updates active note', () => {
    useNoteStore.getState().createNote()
    useNoteStore.getState().createNote()
    const second = useNoteStore.getState().notes[1]
    useNoteStore.getState().setActiveNote(second.id)
    expect(useNoteStore.getState().activeNoteId).toBe(second.id)
  })
})

describe('selectors', () => {
  it('getSortedNotes sorts by zIndex ascending', () => {
    const notes: Note[] = [
      { id: 'a', x: 0, y: 0, width: 100, height: 100, text: '', color: 'yellow', zIndex: 3 },
      { id: 'b', x: 0, y: 0, width: 100, height: 100, text: '', color: 'blue', zIndex: 1 },
      { id: 'c', x: 0, y: 0, width: 100, height: 100, text: '', color: 'green', zIndex: 2 },
    ]
    const sorted = getSortedNotes(notes)
    expect(sorted.map((n) => n.id)).toEqual(['b', 'c', 'a'])
  })

  it('getHighestZIndex returns max zIndex', () => {
    const notes: Note[] = [
      { id: 'a', x: 0, y: 0, width: 100, height: 100, text: '', color: 'yellow', zIndex: 3 },
      { id: 'b', x: 0, y: 0, width: 100, height: 100, text: '', color: 'blue', zIndex: 10 },
      { id: 'c', x: 0, y: 0, width: 100, height: 100, text: '', color: 'green', zIndex: 5 },
    ]
    expect(getHighestZIndex(notes)).toBe(10)
  })

  it('getHighestZIndex returns 0 for empty array', () => {
    expect(getHighestZIndex([])).toBe(0)
  })
})
