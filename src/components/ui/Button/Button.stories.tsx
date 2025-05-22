import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { ThemeProvider } from '../../../hooks/useTheme';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
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
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    title: 'Button',
    variant: 'primary',
  },
  render: (args) => <Button {...args} />,
}; 