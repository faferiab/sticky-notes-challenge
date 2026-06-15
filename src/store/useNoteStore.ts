import { create } from 'zustand'
import type { Note, NoteColor } from '../domain/note'
import {
  DEFAULT_NOTE_WIDTH,
  DEFAULT_NOTE_HEIGHT,
  MIN_NOTE_WIDTH,
  MIN_NOTE_HEIGHT,
} from '../domain/note'

let nextId = 1
function generateId(): string {
  return `note-${nextId++}-${Date.now()}`
}

interface NoteState {
  notes: Note[]
  activeNoteId: string | null
}

interface NoteActions {
  createNote: (x?: number, y?: number, color?: NoteColor) => void
  moveNote: (id: string, x: number, y: number) => void
  resizeNote: (id: string, width: number, height: number) => void
  deleteNote: (id: string) => void
  updateText: (id: string, text: string) => void
  changeColor: (id: string, color: NoteColor) => void
  bringToFront: (id: string) => void
  loadNotes: (notes: Note[]) => void
  saveNotes: () => Note[]
  setActiveNote: (id: string | null) => void
}

export type NoteStore = NoteState & NoteActions

export const useNoteStore = create<NoteStore>((set, get) => ({
  notes: [],
  activeNoteId: null,

  createNote: (x?: number, y?: number, color?: NoteColor) => {
    const { notes } = get()
    const highestZ = notes.reduce((max, n) => Math.max(max, n.zIndex), 0)
    const newNote: Note = {
      id: generateId(),
      x: x ?? 100 + (notes.length % 5) * 30,
      y: y ?? 100 + (notes.length % 5) * 30,
      width: DEFAULT_NOTE_WIDTH,
      height: DEFAULT_NOTE_HEIGHT,
      text: '',
      color: color ?? 'yellow',
      zIndex: highestZ + 1,
    }
    set({ notes: [...notes, newNote], activeNoteId: newNote.id })
  },

  moveNote: (id: string, x: number, y: number) => {
    set((state) => ({
      notes: state.notes.map((n) => (n.id === id ? { ...n, x, y } : n)),
    }))
  },

  resizeNote: (id: string, width: number, height: number) => {
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id
          ? {
              ...n,
              width: Math.max(MIN_NOTE_WIDTH, width),
              height: Math.max(MIN_NOTE_HEIGHT, height),
            }
          : n,
      ),
    }))
  },

  deleteNote: (id: string) => {
    set((state) => {
      const filtered = state.notes.filter((n) => n.id !== id)
      const nextActive = state.activeNoteId === id ? null : state.activeNoteId
      return { notes: filtered, activeNoteId: nextActive }
    })
  },

  updateText: (id: string, text: string) => {
    set((state) => ({
      notes: state.notes.map((n) => (n.id === id ? { ...n, text } : n)),
    }))
  },

  changeColor: (id: string, color: NoteColor) => {
    set((state) => ({
      notes: state.notes.map((n) => (n.id === id ? { ...n, color } : n)),
    }))
  },

  bringToFront: (id: string) => {
    const { notes } = get()
    const highestZ = notes.reduce((max, n) => Math.max(max, n.zIndex), 0)
    set({
      notes: notes.map((n) => (n.id === id ? { ...n, zIndex: highestZ + 1 } : n)),
    })
  },

  loadNotes: (notes: Note[]) => {
    set({ notes })
  },

  saveNotes: () => {
    return get().notes
  },

  setActiveNote: (id: string | null) => {
    set({ activeNoteId: id })
  },
}))

export function getSortedNotes(notes: Note[]): Note[] {
  return [...notes].sort((a, b) => a.zIndex - b.zIndex)
}

export function getHighestZIndex(notes: Note[]): number {
  return notes.reduce((max, n) => Math.max(max, n.zIndex), 0)
}
