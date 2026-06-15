import type { Meta, StoryObj } from '@storybook/react'
import { TextArea } from '../../src/components/atoms/TextArea'

const meta: Meta<typeof TextArea> = {
  title: 'Atoms/TextArea',
  component: TextArea,
  parameters: {
    a11y: {
      element: '#storybook-root',
    },
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
}

export default meta
type Story = StoryObj<typeof TextArea>

export const Empty: Story = {
  args: {
    value: '',
    placeholder: 'Type here...',
  },
}

export const WithText: Story = {
  args: {
    value: 'This is a note with some content.',
    placeholder: 'Type here...',
  },
}

export const MultiLine: Story = {
  args: {
    value: 'Line 1\nLine 2\nLine 3\nLine 4',
    placeholder: 'Type here...',
  },
}
