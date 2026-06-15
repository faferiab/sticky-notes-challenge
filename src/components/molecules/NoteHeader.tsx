import type { PointerEventHandler } from 'react'
import type { NoteColor } from '../../domain/note'
import { COLOR_PALETTE } from '../../domain/note'
import './NoteHeader.css'

interface NoteHeaderProps {
  color: NoteColor
  onPointerDown: PointerEventHandler
}

export function NoteHeader({ color, onPointerDown }: NoteHeaderProps) {
  const palette = COLOR_PALETTE[color]

  return (
    <div
      className="mol-note-header"
      onPointerDown={onPointerDown}
      role="toolbar"
      aria-label="Note header"
    >
      <span className="mol-note-header-color" style={{ backgroundColor: palette.background }} />
      <span className="mol-note-header-handle">drag</span>
    </div>
  )
}
