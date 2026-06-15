import type { Meta, StoryObj } from '@storybook/react'
import { StickyNote } from '../../src/components/organisms/StickyNote'
import { useNoteStore } from '../../src/store'
import type { Note } from '../../src/domain/note'

function createNote(overrides?: Partial<Note>): Note {
  return {
    id: 'story-note-1',
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    text: 'This is a sticky note. Edit me!',
    color: 'yellow',
    zIndex: 1,
    ...overrides,
  }
}

const meta: Meta<typeof StickyNote> = {
  title: 'Organisms/StickyNote',
  component: StickyNote,
  parameters: {
    a11y: {
      element: '#storybook-root',
    },
  },
  decorators: [
    (Story) => {
      useNoteStore.setState({ notes: [createNote()], activeNoteId: null })
      return (
        <div style={{ position: 'relative', width: 400, height: 400 }}>
          <Story />
        </div>
      )
    },
  ],
}

export default meta
type Story = StoryObj<typeof StickyNote>

export const Yellow: Story = {
  args: {
    note: createNote({ color: 'yellow', text: 'Yellow note' }),
    onHeaderPointerDown: () => {},
    onResizePointerDown: () => {},
  },
}

export const Blue: Story = {
  args: {
    note: createNote({ color: 'blue', text: 'Blue note' }),
    onHeaderPointerDown: () => {},
    onResizePointerDown: () => {},
  },
}

export const Green: Story = {
  args: {
    note: createNote({ color: 'green', text: 'Green note' }),
    onHeaderPointerDown: () => {},
    onResizePointerDown: () => {},
  },
}

export const Pink: Story = {
  args: {
    note: createNote({ color: 'pink', text: 'Pink note' }),
    onHeaderPointerDown: () => {},
    onResizePointerDown: () => {},
  },
}

export const Orange: Story = {
  args: {
    note: createNote({ color: 'orange', text: 'Orange note' }),
    onHeaderPointerDown: () => {},
    onResizePointerDown: () => {},
  },
}

export const WithLongText: Story = {
  args: {
    note: createNote({
      text: 'This is a note with a very long text that should wrap and demonstrate how the textarea auto-resizes to fit the content.',
    }),
    onHeaderPointerDown: () => {},
    onResizePointerDown: () => {},
  },
}
