import type { Meta, StoryObj } from '@storybook/react'
import { FocusRing } from '../../src/components/atoms/FocusRing'

const meta: Meta<typeof FocusRing> = {
  title: 'Atoms/FocusRing',
  component: FocusRing,
  parameters: {
    a11y: {
      element: '#storybook-root',
    },
  },
}

export default meta
type Story = StoryObj<typeof FocusRing>

export const WithButton: Story = {
  args: {
    children: <button type="button">Focused Button</button>,
  },
}

export const WithInput: Story = {
  args: {
    children: <input type="text" placeholder="Focused input" />,
  },
}
