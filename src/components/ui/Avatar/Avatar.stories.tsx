import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';
import { ThemeProvider } from '../../../hooks/useTheme';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Avatar',
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
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    alt: 'User avatar',
    size: '10',
    objectFit: 'cover',
    interactive: false,
  },
  render: (args) => <Avatar {...args} />,
}; 