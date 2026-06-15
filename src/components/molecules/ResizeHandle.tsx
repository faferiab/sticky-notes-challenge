import type { PointerEventHandler } from 'react'
import './ResizeHandle.css'

interface ResizeHandleProps {
  onPointerDown: PointerEventHandler
}

export function ResizeHandle({ onPointerDown }: ResizeHandleProps) {
  return (
    <button
      type="button"
      className="mol-resize-handle"
      aria-label="Resize note"
      onPointerDown={onPointerDown}
    />
  )
}
