import type { Meta, StoryObj } from '@storybook/react'
import { TrashZone } from '../../src/components/organisms/TrashZone'

const meta: Meta<typeof TrashZone> = {
  title: 'Organisms/TrashZone',
  component: TrashZone,
  parameters: {
    a11y: {
      element: '#storybook-root',
    },
  },
}

export default meta
type Story = StoryObj<typeof TrashZone>

export const Inactive: Story = {
  args: {
    active: false,
  },
}

export const Active: Story = {
  args: {
    active: true,
  },
}
