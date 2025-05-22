import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import { ThemeProvider } from '../../../hooks/useTheme';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: 'Tooltip',
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
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    text: 'This is a tooltip that shows helpful information',
    position: 'top',
    variant: 'primary',
    delay: 0.5,
    disabled: false,
  },
  render: (args) => (
    <Tooltip {...args}>
      <div style={{
        padding: '1rem',
        backgroundColor: '#E6DEFF',
        borderRadius: '0.25rem',
        cursor: 'pointer',
      }}>
        Hover me
      </div>
    </Tooltip>
  ),
}; 