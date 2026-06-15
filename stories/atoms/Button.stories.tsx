import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../src/components/atoms/Button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    a11y: {
      element: '#storybook-root',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Click me',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
}

export const CustomClass: Story = {
  args: {
    children: 'Custom',
    className: 'org-toolbar-create',
  },
}
