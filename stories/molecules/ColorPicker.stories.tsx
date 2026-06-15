import type { Meta, StoryObj } from '@storybook/react'
import { ColorPicker } from '../../src/components/molecules/ColorPicker'

const meta: Meta<typeof ColorPicker> = {
  title: 'Molecules/ColorPicker',
  component: ColorPicker,
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
type Story = StoryObj<typeof ColorPicker>

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
