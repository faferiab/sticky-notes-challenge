import type { Meta, StoryObj } from '@storybook/react'
import { NotesCanvas } from '../../src/components/organisms/NotesCanvas'
import { useNoteStore } from '../../src/store'
import type { Note } from '../../src/domain/note'

function createNotes(): Note[] {
  return [
    {
      id: 'note-1',
      x: 50,
      y: 50,
      width: 200,
      height: 200,
      text: 'Note 1',
      color: 'yellow',
      zIndex: 1,
    },
    {
      id: 'note-2',
      x: 180,
      y: 120,
      width: 200,
      height: 200,
      text: 'Note 2',
      color: 'blue',
      zIndex: 2,
    },
    {
      id: 'note-3',
      x: 100,
      y: 250,
      width: 200,
      height: 200,
      text: 'Note 3',
      color: 'green',
      zIndex: 3,
    },
  ]
}

const meta: Meta<typeof NotesCanvas> = {
  title: 'Organisms/NotesCanvas',
  component: NotesCanvas,
  parameters: {
    a11y: {
      element: '#storybook-root',
    },
  },
  decorators: [
    (Story) => {
      useNoteStore.setState({ notes: createNotes(), activeNoteId: null })
      return (
        <div style={{ width: 500, height: 500, border: '1px solid #ccc' }}>
          <Story />
        </div>
      )
    },
  ],
}

export default meta
type Story = StoryObj<typeof NotesCanvas>

export const WithMultipleNotes: Story = {
  args: {
    onHeaderPointerDown: () => () => {},
    onResizePointerDown: () => () => {},
  },
}

export const EmptyCanvas: Story = {
  args: {
    onHeaderPointerDown: () => () => {},
    onResizePointerDown: () => () => {},
  },
  decorators: [
    (Story) => {
      useNoteStore.setState({ notes: [], activeNoteId: null })
      return (
        <div style={{ width: 500, height: 500, border: '1px solid #ccc' }}>
          <Story />
        </div>
      )
    },
  ],
}
