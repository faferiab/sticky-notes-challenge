import type { Note } from '../domain/note'
import type { NotesRepository } from './repository'

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function randomDelay(): number {
  return 300 + Math.random() * 500
}

let mockStorage: Note[] = []

export class MockApiRepository implements NotesRepository {
  async load(): Promise<Note[]> {
    await delay(randomDelay())
    return mockStorage.map((n) => ({ ...n }))
  }

  async save(notes: Note[]): Promise<void> {
    await delay(randomDelay())
    mockStorage = notes.map((n) => ({ ...n }))
  }
}
