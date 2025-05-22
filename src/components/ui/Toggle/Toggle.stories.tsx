import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Toggle from './Toggle';
import { ThemeProvider } from '../../../hooks/useTheme';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  title: 'UI/Toggle',
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
type Story = StoryObj<typeof Toggle>;

// Use a wrapper to handle state
const ToggleWithState = (args: any) => {
  const [active, setActive] = useState(args.active || false);
  
  return (
    <Toggle 
      {...args} 
      active={active} 
      onChange={(_, newActive) => setActive(newActive)} 
    />
  );
};

export const Default: Story = {
  args: {
    name: 'default-toggle',
    ariaLabel: 'Default toggle',
    label: 'Toggle me',
    active: false,
  },
  render: (args) => <ToggleWithState {...args} />,
}; 