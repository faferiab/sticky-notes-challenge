import type { PointerEventHandler } from 'react'
import { useNoteStore } from '../../store'
import { StickyNote } from './StickyNote'
import './NotesCanvas.css'

interface NotesCanvasProps {
  onHeaderPointerDown: (noteId: string) => PointerEventHandler
  onResizePointerDown: (noteId: string) => PointerEventHandler
}

export function NotesCanvas({ onHeaderPointerDown, onResizePointerDown }: NotesCanvasProps) {
  const notes = useNoteStore((s) => s.notes)

  return (
    <div className="org-notes-canvas" role="region" aria-label="Notes canvas">
      {notes.map((note) => (
        <StickyNote
          key={note.id}
          note={note}
          onHeaderPointerDown={onHeaderPointerDown(note.id)}
          onResizePointerDown={onResizePointerDown(note.id)}
        />
      ))}
    </div>
  )
}
