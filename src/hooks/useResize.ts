import { useRef } from 'react'
import { useNoteStore } from '../store'

export function useResize() {
  const resizeNote = useNoteStore((s) => s.resizeNote)
  const resizeState = useRef<{
    noteId: string
    startX: number
    startY: number
    noteStartWidth: number
    noteStartHeight: number
  } | null>(null)

  function handlePointerMove(e: PointerEvent) {
    if (!resizeState.current) return
    const { noteId, startX, startY, noteStartWidth, noteStartHeight } = resizeState.current
    const dx = e.clientX - startX
    const dy = e.clientY - startY
    resizeNote(noteId, noteStartWidth + dx, noteStartHeight + dy)
  }

  function handlePointerUp(e: PointerEvent) {
    if (!resizeState.current) return
    ;(e.target as Element)?.releasePointerCapture(e.pointerId)
    resizeState.current = null
    document.removeEventListener('pointermove', handlePointerMove)
    document.removeEventListener('pointerup', handlePointerUp)
  }

  function getResizePointerDown(noteId: string) {
    return (e: React.PointerEvent) => {
      const note = useNoteStore.getState().notes.find((n) => n.id === noteId)
      if (!note) return
      e.preventDefault()
      e.stopPropagation()
      e.currentTarget.setPointerCapture(e.pointerId)
      resizeState.current = {
        noteId,
        startX: e.clientX,
        startY: e.clientY,
        noteStartWidth: note.width,
        noteStartHeight: note.height,
      }
      document.addEventListener('pointermove', handlePointerMove)
      document.addEventListener('pointerup', handlePointerUp)
    }
  }

  return getResizePointerDown
}
