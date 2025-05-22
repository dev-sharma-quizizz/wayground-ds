import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';
import { ThemeProvider } from '../../../hooks/useTheme';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'UI/Checkbox',
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
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    name: 'default-checkbox',
    title: 'Accept terms and conditions',
    type: 'prefix',
    size: 'md',
    disabled: false,
  },
  render: (args) => <Checkbox {...args} />,
}; 