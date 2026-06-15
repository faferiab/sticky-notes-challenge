import type { NoteColor } from './model'

export const DEFAULT_NOTE_WIDTH = 200
export const DEFAULT_NOTE_HEIGHT = 200
export const MIN_NOTE_WIDTH = 100
export const MIN_NOTE_HEIGHT = 80

export const NOTE_COLORS: NoteColor[] = ['yellow', 'green', 'blue', 'pink', 'orange']

export const COLOR_PALETTE: Record<NoteColor, { background: string; text: string; label: string }> =
  {
    yellow: { background: '#FFF9C4', text: '#1a1a1a', label: 'Yellow' },
    green: { background: '#C8E6C9', text: '#1a1a1a', label: 'Green' },
    blue: { background: '#BBDEFB', text: '#1a1a1a', label: 'Blue' },
    pink: { background: '#F8BBD0', text: '#1a1a1a', label: 'Pink' },
    orange: { background: '#FFE0B2', text: '#1a1a1a', label: 'Orange' },
  }
