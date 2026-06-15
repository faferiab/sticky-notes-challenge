import type { Note } from '../domain/note'
import type { NotesRepository } from './repository'

const STORAGE_KEY = 'sticky-notes'

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export class LocalStorageRepository implements NotesRepository {
  async load(): Promise<Note[]> {
    await delay(100)
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    try {
      return JSON.parse(raw) as Note[]
    } catch {
      return []
    }
  }

  async save(notes: Note[]): Promise<void> {
    await delay(50)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }
}
