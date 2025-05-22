import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { GradientDirectionValues, MarginValues, OpacityValues, PaddingValues } from '../../../types';
import Flex from '../../layouts/Flex/Flex';
import Box from './Box';

const meta: Meta<typeof Box> = {
  component: Box,
  title: 'Box',
  tags: ['Primitives/Box', 'autodocs'],
  argTypes: {
    margin: {
      control: {
        type: 'select',
      },
      options: MarginValues,
      defaultValue: '4',
    },
    padding: {
      control: {
        type: 'select',
      },
      options: PaddingValues,
      defaultValue: '4',
    },
    opacity: {
      control: {
        type: 'select',
      },
      options: OpacityValues,
    },
    gradient: {
      control: 'object',
      description: 'Gradient configuration object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    children: 'Some text here...',
    padding: '4',
  },
  render: (args) => (
    <div>
      <Flex gap="4">
        <Box {...args} />
      </Flex>
    </div>
  ),
};

export const Gradients: Story = {
  args: {
    gradient: {
      direction: 'to-r',
      from: { color: 'surface.action.DEFAULT' },
      to: { color: 'surface.success.DEFAULT' },
    },
  },
  render: () => (
    <div>
      <Flex direction="col" gap="4">
        {/* Direction-based gradient */}
        <Box 
          padding="4" 
          gradient={{ 
            direction: 'to-r',
            from: { color: 'surface.action.DEFAULT' },
            to: { color: 'surface.success.DEFAULT' }
          }}
        >
          Left to right gradient
        </Box>
        
        {/* Gradient with color stop positions */}
        <Box 
          padding="4" 
          gradient={{ 
            direction: 'to-br',
            from: { color: 'surface.super.DEFAULT', position: '20%' },
            to: { color: 'surface.action.DEFAULT', position: '80%' }
          }}
        >
          Diagonal gradient with color stop positions
        </Box>
      </Flex>
    </div>
  ),
}; 