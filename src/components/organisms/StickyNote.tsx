import { useEffect, useRef } from 'react'
import type { PointerEventHandler } from 'react'
import type { Note } from '../../domain/note'
import { COLOR_PALETTE } from '../../domain/note'
import { useNoteStore } from '../../store'
import { TextArea } from '../atoms/TextArea'
import { NoteHeader } from '../molecules/NoteHeader'
import { ResizeHandle } from '../molecules/ResizeHandle'
import './StickyNote.css'

interface StickyNoteProps {
  note: Note
  onHeaderPointerDown: PointerEventHandler
  onResizePointerDown: PointerEventHandler
}

export function StickyNote({ note, onHeaderPointerDown, onResizePointerDown }: StickyNoteProps) {
  const updateText = useNoteStore((s) => s.updateText)
  const bringToFront = useNoteStore((s) => s.bringToFront)
  const setActiveNote = useNoteStore((s) => s.setActiveNote)
  const activeNoteId = useNoteStore((s) => s.activeNoteId)
  const palette = COLOR_PALETTE[note.color]
  const noteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (note.id === activeNoteId && noteRef.current) {
      const isTextareaFocused = document.activeElement?.tagName === 'TEXTAREA'
      if (!isTextareaFocused) {
        noteRef.current.focus()
      }
    }
  }, [note.id, activeNoteId])

  function handleClick() {
    bringToFront(note.id)
    setActiveNote(note.id)
  }

  function handleNoteKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      const target = e.target as HTMLElement
      if (target.tagName === 'TEXTAREA') return
      e.preventDefault()
      bringToFront(note.id)
    }
  }

  function handleTextAreaFocus() {
    setActiveNote(note.id)
  }

  return (
    <div
      id={`sticky-note-${note.id}`}
      ref={noteRef}
      className="org-sticky-note"
      style={{
        left: note.x,
        top: note.y,
        width: note.width,
        height: note.height,
        backgroundColor: palette.background,
        color: palette.text,
        zIndex: note.zIndex,
      }}
      onClick={handleClick}
      onKeyDown={handleNoteKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Sticky note, ${palette.label}`}
    >
      <NoteHeader color={note.color} onPointerDown={onHeaderPointerDown} />
      <TextArea
        value={note.text}
        onChange={(e) => updateText(note.id, e.target.value)}
        onFocus={handleTextAreaFocus}
        style={{ flex: 1 }}
      />
      <ResizeHandle onPointerDown={onResizePointerDown} />
    </div>
  )
}
