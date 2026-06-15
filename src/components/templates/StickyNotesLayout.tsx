import { useState, useCallback, useEffect } from 'react'
import type { NoteColor } from '../../domain/note'
import { NOTE_COLORS } from '../../domain/note'
import { useNoteStore } from '../../store'
import { useDrag } from '../../hooks/useDrag'
import { useResize } from '../../hooks/useResize'
import { useDragToTrash } from '../../hooks/useDragToTrash'
import { usePersistence } from '../../hooks/usePersistence'
import { Toolbar } from '../organisms/Toolbar'
import { NotesCanvas } from '../organisms/NotesCanvas'
import { TrashZone } from '../organisms/TrashZone'
import './StickyNotesLayout.css'

export function StickyNotesLayout() {
  usePersistence()
  const [selectedColor, setSelectedColor] = useState<NoteColor>(NOTE_COLORS[0])
  const createNote = useNoteStore((s) => s.createNote)
  const deleteNote = useNoteStore((s) => s.deleteNote)
  const moveNote = useNoteStore((s) => s.moveNote)
  const resizeNote = useNoteStore((s) => s.resizeNote)
  const bringToFront = useNoteStore((s) => s.bringToFront)
  const notes = useNoteStore((s) => s.notes)
  const activeNoteId = useNoteStore((s) => s.activeNoteId)
  const setActiveNote = useNoteStore((s) => s.setActiveNote)

  const { isTrashActive, updateTrashCheck, endTrashCheck } = useDragToTrash()
  const [announcement, setAnnouncement] = useState('')

  const liveAnnounce = useCallback((message: string) => {
    setAnnouncement(message)
    setTimeout(() => setAnnouncement(''), 2000)
  }, [])

  const handleDrag = useCallback(
    (_clientX: number, clientY: number) => {
      updateTrashCheck(clientY)
    },
    [updateTrashCheck],
  )

  const handleDragEnd = useCallback(
    (noteId: string) => {
      if (isTrashActive) {
        deleteNote(noteId)
        liveAnnounce('Note deleted')
      }
      endTrashCheck()
    },
    [isTrashActive, deleteNote, liveAnnounce, endTrashCheck],
  )

  const getHeaderPointerDown = useDrag(handleDrag, handleDragEnd)
  const getResizePointerDown = useResize()

  const focusNextNote = useCallback(
    (currentId: string, direction: 1 | -1) => {
      const sorted = [...notes].sort((a, b) => a.zIndex - b.zIndex)
      const idx = sorted.findIndex((n) => n.id === currentId)
      const next = sorted[idx + direction]
      if (next) {
        setActiveNote(next.id)
        const el = document.getElementById(`sticky-note-${next.id}`)
        el?.focus()
      }
    },
    [notes, setActiveNote],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!activeNoteId) return
      const note = notes.find((n) => n.id === activeNoteId)
      if (!note) return

      const isInputFocused = document.activeElement?.tagName === 'TEXTAREA'
      if (isInputFocused && e.key !== 'Escape') return

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          if (e.shiftKey) {
            resizeNote(note.id, note.width, note.height - 1)
          } else {
            moveNote(note.id, note.x, note.y - 10)
          }
          break
        case 'ArrowDown':
          e.preventDefault()
          if (e.shiftKey) {
            resizeNote(note.id, note.width, note.height + 1)
          } else {
            moveNote(note.id, note.x, note.y + 10)
          }
          break
        case 'ArrowLeft':
          e.preventDefault()
          if (e.shiftKey) {
            resizeNote(note.id, note.width - 1, note.height)
          } else {
            moveNote(note.id, note.x - 10, note.y)
          }
          break
        case 'ArrowRight':
          e.preventDefault()
          if (e.shiftKey) {
            resizeNote(note.id, note.width + 1, note.height)
          } else {
            moveNote(note.id, note.x + 10, note.y)
          }
          break
        case 'Delete':
        case 'Backspace':
          e.preventDefault()
          deleteNote(note.id)
          liveAnnounce('Note deleted')
          focusNextNote(note.id, 1)
          break
        case 'Enter':
          e.preventDefault()
          bringToFront(note.id)
          break
        case 'n':
        case 'N':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault()
            createNote(undefined, undefined, selectedColor)
            liveAnnounce('New note created')
          }
          break
        case 'Tab':
          e.preventDefault()
          focusNextNote(note.id, e.shiftKey ? -1 : 1)
          break
      }
    },
    [
      activeNoteId,
      notes,
      moveNote,
      resizeNote,
      deleteNote,
      bringToFront,
      createNote,
      liveAnnounce,
      focusNextNote,
      selectedColor,
    ],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="tmp-sticky-notes-layout">
      <Toolbar selectedColor={selectedColor} onSelectColor={setSelectedColor} />
      <NotesCanvas
        onHeaderPointerDown={getHeaderPointerDown}
        onResizePointerDown={getResizePointerDown}
      />
      <TrashZone active={isTrashActive} />
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>
    </div>
  )
}
