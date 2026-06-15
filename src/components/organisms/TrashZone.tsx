import './TrashZone.css'

interface TrashZoneProps {
  active: boolean
}

export function TrashZone({ active }: TrashZoneProps) {
  return (
    <div
      className={`org-trash-zone${active ? ' org-trash-zone--active' : ''}`}
      role="region"
      aria-label="Trash zone — drop notes here to delete"
    >
      {active ? 'Drop to delete' : 'Drag notes here to delete'}
    </div>
  )
}
