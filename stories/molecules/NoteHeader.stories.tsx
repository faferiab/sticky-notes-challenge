import type { Meta, StoryObj } from '@storybook/react'
import { NoteHeader } from '../../src/components/molecules/NoteHeader'

const meta: Meta<typeof NoteHeader> = {
  title: 'Molecules/NoteHeader',
  component: NoteHeader,
  parameters: {
    a11y: {
      element: '#storybook-root',
    },
  },
  argTypes: {
    onPointerDown: { action: 'pointerDown' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 200, background: '#FFF9C4', borderRadius: '8px 8px 0 0' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof NoteHeader>

export const Yellow: Story = {
  args: {
    color: 'yellow',
  },
}

export const Blue: Story = {
  args: {
    color: 'blue',
  },
}

export const Green: Story = {
  args: {
    color: 'green',
  },
}

export const Pink: Story = {
  args: {
    color: 'pink',
  },
}

export const Orange: Story = {
  args: {
    color: 'orange',
  },
}
