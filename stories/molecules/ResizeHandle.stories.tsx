import type { Meta, StoryObj } from '@storybook/react'
import { ResizeHandle } from '../../src/components/molecules/ResizeHandle'

const meta: Meta<typeof ResizeHandle> = {
  title: 'Molecules/ResizeHandle',
  component: ResizeHandle,
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
      <div style={{ position: 'relative', width: 200, height: 200, background: '#f0f0f0' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ResizeHandle>

export const Default: Story = {
  args: {},
}
