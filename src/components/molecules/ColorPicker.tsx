import { useRef } from 'react'
import type { NoteColor } from '../../domain/note'
import { NOTE_COLORS } from '../../domain/note'
import { ColorSwatch } from '../atoms/ColorSwatch'
import './ColorPicker.css'

interface ColorPickerProps {
  selectedColor: NoteColor
  onSelectColor: (color: NoteColor) => void
}

export function ColorPicker({ selectedColor, onSelectColor }: ColorPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="mol-color-picker" role="radiogroup" aria-label="Note color">
      {NOTE_COLORS.map((color) => (
        <ColorSwatch
          key={color}
          color={color}
          selected={color === selectedColor}
          onSelect={onSelectColor}
        />
      ))}
    </div>
  )
}
