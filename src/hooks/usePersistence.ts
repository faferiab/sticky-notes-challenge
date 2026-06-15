import { useEffect, useRef } from 'react'
import { useNoteStore } from '../store'
import { LocalStorageRepository, MockApiRepository } from '../infrastructure'
import { debounce } from '../utils/debounce'

const SAVE_DEBOUNCE_MS = 300

const localStorageRepo = new LocalStorageRepository()
const mockApiRepo = new MockApiRepository()

export function usePersistence() {
  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current) return
    loaded.current = true

    localStorageRepo.load().then((localNotes) => {
      if (localNotes.length > 0) {
        useNoteStore.getState().loadNotes(localNotes)
      }
      mockApiRepo.load().then((apiNotes) => {
        if (localNotes.length === 0 && apiNotes.length > 0) {
          useNoteStore.getState().loadNotes(apiNotes)
        }
      })
    })
  }, [])

  useEffect(() => {
    const debouncedSave = debounce(async () => {
      const { notes } = useNoteStore.getState()
      await Promise.all([localStorageRepo.save(notes), mockApiRepo.save(notes)])
    }, SAVE_DEBOUNCE_MS)

    const unsub = useNoteStore.subscribe(() => {
      debouncedSave()
    })

    return () => {
      debouncedSave.cancel()
      unsub()
    }
  }, [])
}
