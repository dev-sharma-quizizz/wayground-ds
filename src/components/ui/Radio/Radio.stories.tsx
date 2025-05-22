import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Radio from './Radio';
import { ThemeProvider } from '../../../hooks/useTheme';

const meta: Meta<typeof Radio> = {
  component: Radio,
  title: 'Radio',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    )
  ],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    name: 'demo-radio',
    value: 'option1',
    title: 'Option 1',
    size: 'md',
    checked: true,
    disabled: false,
  },
  render: (args) => <Radio {...args} />,
}; 