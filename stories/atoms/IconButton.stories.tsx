import type { Meta, StoryObj } from '@storybook/react'
import { IconButton } from '../../src/components/atoms/IconButton'

const meta: Meta<typeof IconButton> = {
  title: 'Atoms/IconButton',
  component: IconButton,
  parameters: {
    a11y: {
      element: '#storybook-root',
    },
  },
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  args: {
    label: 'Add note',
    children: '+',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled action',
    children: '✕',
    disabled: true,
  },
}
