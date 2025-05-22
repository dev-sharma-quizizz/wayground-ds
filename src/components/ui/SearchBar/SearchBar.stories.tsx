import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from './SearchBar';
import { ThemeProvider } from '../../../hooks/useTheme';

const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
  title: 'UI/SearchBar',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ width: '400px' }}>
          <Story />
        </div>
      </ThemeProvider>
    )
  ],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

// Use a wrapper to handle state
const SearchBarWithState = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  
  const handleClear = () => {
    setValue('');
  };
  
  return (
    <SearchBar 
      {...args} 
      value={value} 
      onChange={(newValue) => setValue(newValue)}
      onClear={handleClear}
    />
  );
};

export const Default: Story = {
  args: {
    placeholder: 'Search...',
    size: 'default',
    variant: 'default',
    disabled: false,
    showClear: true,
  },
  render: (args) => <SearchBarWithState {...args} />,
}; 