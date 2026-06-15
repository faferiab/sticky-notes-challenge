import { useState, useCallback, useRef } from 'react'

const TRASH_ZONE_HEIGHT = 80

export function useDragToTrash() {
  const [isTrashActive, setIsTrashActive] = useState(false)
  const noteIdRef = useRef<string | null>(null)

  const checkTrashZone = useCallback((clientY: number): boolean => {
    const viewportHeight = window.innerHeight
    return clientY >= viewportHeight - TRASH_ZONE_HEIGHT
  }, [])

  const startTrashCheck = useCallback((noteId: string) => {
    noteIdRef.current = noteId
    setIsTrashActive(false)
  }, [])

  const updateTrashCheck = useCallback(
    (clientY: number) => {
      const active = checkTrashZone(clientY)
      setIsTrashActive(active)
      return active
    },
    [checkTrashZone],
  )

  const endTrashCheck = useCallback(() => {
    noteIdRef.current = null
    setIsTrashActive(false)
  }, [])

  return {
    isTrashActive,
    startTrashCheck,
    updateTrashCheck,
    endTrashCheck,
    noteIdRef,
  }
}
