export type NoteColor = 'yellow' | 'green' | 'blue' | 'pink' | 'orange'

export interface Note {
  id: string
  x: number
  y: number
  width: number
  height: number
  text: string
  color: NoteColor
  zIndex: number
}
