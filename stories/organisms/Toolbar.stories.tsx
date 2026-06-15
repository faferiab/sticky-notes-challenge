import type { Meta, StoryObj } from '@storybook/react'
import { Toolbar } from '../../src/components/organisms/Toolbar'

const meta: Meta<typeof Toolbar> = {
  title: 'Organisms/Toolbar',
  component: Toolbar,
  parameters: {
    a11y: {
      element: '#storybook-root',
    },
  },
  argTypes: {
    onSelectColor: { action: 'selected' },
  },
}

export default meta
type Story = StoryObj<typeof Toolbar>

export const YellowSelected: Story = {
  args: {
    selectedColor: 'yellow',
  },
}

export const BlueSelected: Story = {
  args: {
    selectedColor: 'blue',
  },
}

export const PinkSelected: Story = {
  args: {
    selectedColor: 'pink',
  },
}
