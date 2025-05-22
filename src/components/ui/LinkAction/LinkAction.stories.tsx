import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import LinkAction from './LinkAction';
import { ThemeProvider } from '../../../hooks/useTheme';

const meta: Meta<typeof LinkAction> = {
  component: LinkAction,
  title: 'LinkAction',
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
type Story = StoryObj<typeof LinkAction>;

export const Default: Story = {
  args: {
    text: 'Click me',
    type: 'action',
    size: 'default',
  },
  render: (args) => <LinkAction {...args} />,
}; 