import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GapValues } from '../../../types';
import Columns from './Columns';
import Column from './Column';

// Mock Box component for the story
const Box = ({ children, bgColor, padding }: { children: React.ReactNode, bgColor?: string, padding?: string }) => (
  <div className={`${bgColor || ''} ${padding ? `p-${padding}` : ''}`}>
    {children}
  </div>
);

// Mock NamespaceProvider for the story
const NamespaceProvider = ({ 
  theme, 
  device, 
  children 
}: { 
  theme: string, 
  device: string, 
  children: React.ReactNode 
}) => (
  <div data-theme={theme} data-device={device}>
    {children}
  </div>
);

const meta: Meta<typeof Columns> = {
  component: Columns,
  title: 'Columns',
  tags: ['Layouts/Columns', 'autodocs'],
  argTypes: {
    count: {
      description: 'The number of columns.',
      control: {
        type: 'select',
      },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      defaultValue: 12,
    },
    gap: {
      description: 'The gap between columns.',
      control: {
        type: 'select',
      },
      options: GapValues,
      defaultValue: '4',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Columns is a layout component that allows you to create a grid of columns. The direct descendants of Columns must be Column components. Adding any other component or div as a direct descendant to Columns will result in an error.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Columns>;

export const Default: Story = {
  render: (args) => (
    <div>
      <NamespaceProvider theme="admin" device="desktop">
        <Columns {...args}>
          <Column start={5} span={4}>
            <Box bgColor="bg-surface-action-faded" padding="4">Centered column</Box>
          </Column>
        </Columns>
      </NamespaceProvider>
    </div>
  ),
  args: {
    count: 12,
    gap: '4',
  },
}; 