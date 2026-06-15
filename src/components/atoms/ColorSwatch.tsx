import type { NoteColor } from '../../domain/note'
import { COLOR_PALETTE } from '../../domain/note'
import './ColorSwatch.css'

interface ColorSwatchProps {
  color: NoteColor
  selected?: boolean
  onSelect: (color: NoteColor) => void
}

export function ColorSwatch({ color, selected, onSelect }: ColorSwatchProps) {
  const palette = COLOR_PALETTE[color]

  return (
    <button
      type="button"
      className="atom-swatch"
      aria-label={palette.label}
      data-selected={selected}
      onClick={() => onSelect(color)}
    >
      <span className="atom-swatch-color" style={{ backgroundColor: palette.background }} />
      <span className="atom-swatch-label">{palette.label}</span>
    </button>
  )
}
