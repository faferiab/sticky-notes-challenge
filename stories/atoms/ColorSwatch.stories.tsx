import type { Meta, StoryObj } from '@storybook/react'
import { ColorSwatch } from '../../src/components/atoms/ColorSwatch'

const meta: Meta<typeof ColorSwatch> = {
  title: 'Atoms/ColorSwatch',
  component: ColorSwatch,
  parameters: {
    a11y: {
      element: '#storybook-root',
    },
  },
  argTypes: {
    onSelect: { action: 'selected' },
  },
}

export default meta
type Story = StoryObj<typeof ColorSwatch>

export const Yellow: Story = {
  args: {
    color: 'yellow',
    selected: false,
  },
}

export const Green: Story = {
  args: {
    color: 'green',
    selected: false,
  },
}

export const Blue: Story = {
  args: {
    color: 'blue',
    selected: false,
  },
}

export const Pink: Story = {
  args: {
    color: 'pink',
    selected: false,
  },
}

export const Orange: Story = {
  args: {
    color: 'orange',
    selected: false,
  },
}

export const Selected: Story = {
  args: {
    color: 'blue',
    selected: true,
  },
}
