import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Arrow from './Arrow';
import { ThemeProvider } from '../../../hooks/useTheme';

const meta: Meta<typeof Arrow> = {
  component: Arrow,
  title: 'UI/Arrow',
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
type Story = StoryObj<typeof Arrow>;

export const Default: Story = {
  args: {
    direction: 'down',
  },
  render: (args) => (
    <div style={{ padding: '20px' }}>
      <Arrow {...args} />
    </div>
  ),
}; 