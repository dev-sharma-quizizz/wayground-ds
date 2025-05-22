import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Divider from './Divider';
import { ThemeProvider } from '../../../hooks/useTheme';
import Box from '../../primitive/Box/Box';

const meta: Meta<typeof Divider> = {
  component: Divider,
  title: 'Divider',
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
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'dark.low-contrast',
  },
  render: (args) => (
    <div style={{ width: '300px', padding: '16px' }}>
      <Divider {...args} />
    </div>
  ),
}; 