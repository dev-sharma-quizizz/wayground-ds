import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TextInput from './TextInput';
import { ThemeProvider } from '../../../hooks/useTheme';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  title: 'UI/TextInput',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ width: '300px' }}>
          <Story />
        </div>
      </ThemeProvider>
    )
  ],
};

export default meta;
type Story = StoryObj<typeof TextInput>;

// Use a wrapper to handle state
const TextInputWithState = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  
  return (
    <TextInput 
      {...args} 
      value={value} 
      onChange={(newValue) => setValue(newValue)} 
    />
  );
};

export const Default: Story = {
  args: {
    placeholder: 'Enter text here',
    disabled: false,
    type: 'text',
    readOnly: false,
  },
  render: (args) => <TextInputWithState {...args} />,
}; 