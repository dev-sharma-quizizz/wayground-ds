import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Pill from './Pill';
import { ThemeProvider } from '../../../hooks/useTheme';

const meta: Meta<typeof Pill> = {
  component: Pill,
  title: 'Pill',
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
type Story = StoryObj<typeof Pill>;

export const Default: Story = {
  args: {
    title: 'Sample Pill',
    type: 'primary',
    variant: 'action',
    size: 'md',
    disabled: false,
    icon: 'star',
  },
  render: (args) => <Pill {...args} />,
}; 