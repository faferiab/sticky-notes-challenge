import { useEffect, useRef } from 'react'
import { useNoteStore } from '../store'

export function useDrag(
  onDrag?: (clientX: number, clientY: number) => void,
  onDragEnd?: (noteId: string) => void,
) {
  const moveNote = useNoteStore((s) => s.moveNote)
  const dragState = useRef<{
    noteId: string
    startX: number
    startY: number
    noteStartX: number
    noteStartY: number
  } | null>(null)

  const onDragRef = useRef(onDrag)
  const onDragEndRef = useRef(onDragEnd)
  useEffect(() => {
    onDragRef.current = onDrag
    onDragEndRef.current = onDragEnd
  })

  function handlePointerMove(e: PointerEvent) {
    if (!dragState.current) return
    const { noteId, startX, startY, noteStartX, noteStartY } = dragState.current
    const dx = e.clientX - startX
    const dy = e.clientY - startY
    moveNote(noteId, noteStartX + dx, noteStartY + dy)
    onDragRef.current?.(e.clientX, e.clientY)
  }

  function handlePointerUp(e: PointerEvent) {
    if (!dragState.current) return
    const noteId = dragState.current.noteId
    ;(e.target as Element)?.releasePointerCapture(e.pointerId)
    dragState.current = null
    document.removeEventListener('pointermove', handlePointerMove)
    document.removeEventListener('pointerup', handlePointerUp)
    onDragEndRef.current?.(noteId)
  }

  function getHeaderPointerDown(noteId: string) {
    return (e: React.PointerEvent) => {
      const note = useNoteStore.getState().notes.find((n) => n.id === noteId)
      if (!note) return
      e.preventDefault()
      e.currentTarget.setPointerCapture(e.pointerId)
      dragState.current = {
        noteId,
        startX: e.clientX,
        startY: e.clientY,
        noteStartX: note.x,
        noteStartY: note.y,
      }
      document.addEventListener('pointermove', handlePointerMove)
      document.addEventListener('pointerup', handlePointerUp)
    }
  }

  return getHeaderPointerDown
}
