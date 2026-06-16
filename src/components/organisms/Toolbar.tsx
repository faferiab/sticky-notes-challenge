import type { NoteColor } from '../../domain/note'
import { useNoteStore } from '../../store'
import { Button } from '../atoms/Button'
import { ColorPicker } from '../molecules/ColorPicker'

interface ToolbarProps {
  selectedColor: NoteColor
  onSelectColor: (color: NoteColor) => void
}

export function Toolbar({ selectedColor, onSelectColor }: ToolbarProps) {
  const createNote = useNoteStore((s) => s.createNote)

  return (
    <div className="org-toolbar" role="toolbar" aria-label="Note toolbar">
      <Button
        className="org-toolbar-create"
        onClick={() => createNote(undefined, undefined, selectedColor)}
      >
        + Create Note
      </Button>
      <ColorPicker selectedColor={selectedColor} onSelectColor={onSelectColor} />
    </div>
  )
}
