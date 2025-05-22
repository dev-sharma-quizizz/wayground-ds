import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tag from './Tag';
import { ThemeProvider } from '../../../hooks/useTheme';

const meta: Meta<typeof Tag> = {
  component: Tag,
  title: 'UI/Tag',
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
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    text: 'Sample Tag',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
  render: (args) => <Tag {...args} />,
}; 