import { describe, it, expect, beforeEach } from 'vitest'
import { LocalStorageRepository } from '../../src/infrastructure/localStorageRepository'
import { MockApiRepository } from '../../src/infrastructure/mockApiRepository'
import type { Note } from '../../src/domain/note'

const sampleNotes: Note[] = [
  {
    id: 'note-1',
    x: 100,
    y: 200,
    width: 200,
    height: 200,
    text: 'test',
    color: 'yellow',
    zIndex: 1,
  },
  {
    id: 'note-2',
    x: 300,
    y: 400,
    width: 150,
    height: 120,
    text: 'hello',
    color: 'blue',
    zIndex: 2,
  },
]

describe('LocalStorageRepository', () => {
  let repo: LocalStorageRepository

  beforeEach(() => {
    localStorage.clear()
    repo = new LocalStorageRepository()
  })

  it('load returns empty array when no data', async () => {
    const notes = await repo.load()
    expect(notes).toEqual([])
  })

  it('save then load returns saved notes', async () => {
    await repo.save(sampleNotes)
    const loaded = await repo.load()
    expect(loaded).toEqual(sampleNotes)
  })

  it('load returns empty array on corrupt data', async () => {
    localStorage.setItem('sticky-notes', 'not-json')
    const notes = await repo.load()
    expect(notes).toEqual([])
  })

  it('overwrites existing data on save', async () => {
    await repo.save(sampleNotes)
    const single: Note[] = [sampleNotes[0]]
    await repo.save(single)
    const loaded = await repo.load()
    expect(loaded).toHaveLength(1)
  })
})

describe('MockApiRepository', () => {
  let repo: MockApiRepository

  beforeEach(() => {
    repo = new MockApiRepository()
  })

  it('load returns empty array initially', async () => {
    const notes = await repo.load()
    expect(notes).toEqual([])
  })

  it('save then load returns saved notes', async () => {
    await repo.save(sampleNotes)
    const loaded = await repo.load()
    expect(loaded).toEqual(sampleNotes)
  })

  it('returns copies of notes', async () => {
    await repo.save(sampleNotes)
    const loaded = await repo.load()
    loaded[0].text = 'mutated'
    const loadedAgain = await repo.load()
    expect(loadedAgain[0].text).toBe('test')
  })
})
