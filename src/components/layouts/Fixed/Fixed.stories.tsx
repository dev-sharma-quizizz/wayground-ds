import type { Meta, StoryObj } from '@storybook/react';
import { SpacingValues } from '../../../types';
import commonStoryProps from '../../../utils/commonStoryProps';
import Fixed from './Fixed';

const meta: Meta<typeof Fixed> = {
  component: Fixed,
  title: 'Fixed',
  tags: ['Layouts/Fixed', 'autodocs'],
  argTypes: {
    top: {
      control: {
        type: 'select',
      },
      options: SpacingValues,
    },
    right: {
      control: {
        type: 'select',
      },
      options: SpacingValues,
    },
    bottom: {
      control: {
        type: 'select',
      },
      options: SpacingValues,
    },
    left: {
      control: {
        type: 'select',
      },
      options: SpacingValues,
    },
    zIndex: {
      control: {
        type: 'number',
      },
      defaultValue: 10,
    },
    ...commonStoryProps,
  },
};

export default meta;
type Story = StoryObj<typeof Fixed>;

export const Default: Story = {
  args: {
    top: '10',
    left: '10',
    bgColor: 'surface.action.DEFAULT',
    padding: '4',
  },
  render: (args) => {
    return (
      <div className="relative w-full h-96 bg-ds-light-300">
        <Fixed {...args}>
          <div className="text-ds-light-500 p-3">Fixed Position Element</div>
        </Fixed>
      </div>
    );
  },
};

export const BottomRight: Story = {
  args: {
    bottom: '10',
    right: '10',
    bgColor: 'surface.info.DEFAULT',
    padding: '4',
  },
  render: (args) => {
    return (
      <div className="relative w-full h-96 bg-ds-light-300">
        <Fixed {...args}>
          <div className="text-ds-light-500 p-3">Bottom Right Fixed Element</div>
        </Fixed>
      </div>
    );
  },
}; 