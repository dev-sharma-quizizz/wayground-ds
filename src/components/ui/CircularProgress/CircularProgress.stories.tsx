import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CircularProgress from './CircularProgress';
import { ThemeProvider } from '../../../hooks/useTheme';

const meta: Meta<typeof CircularProgress> = {
  component: CircularProgress,
  title: 'UI/CircularProgress',
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
type Story = StoryObj<typeof CircularProgress>;

export const Default: Story = {
  args: {
    loaderPercentage: 75,
    size: 'lg',
    showPercentWithProgress: true,
    strokeVariant: 'primary',
  },
  render: (args) => <CircularProgress {...args} />,
}; 