import type { Meta, StoryObj } from '@storybook/react';
import { OpacityValues, SpacingValues } from '../../../types';
import commonStoryProps from '../../../utils/commonStoryProps';
import FixedSize from './FixedSize';

const meta: Meta<typeof FixedSize> = {
  component: FixedSize,
  title: 'FixedSize',
  tags: ['Layouts/FixedSize', 'autodocs'],
  argTypes: {
    width: {
      control: {
        type: 'select',
      },
      options: SpacingValues,
      defaultValue: 'auto',
    },
    height: {
      control: {
        type: 'select',
      },
      options: SpacingValues,
      defaultValue: 'auto',
    },
    size: {
      control: {
        type: 'select',
      },
      options: SpacingValues,
    },
    opacity: {
      control: {
        type: 'select',
      },
      options: OpacityValues,
    },
    ...commonStoryProps,
  },
};

export default meta;
type Story = StoryObj<typeof FixedSize>;

export const Default: Story = {
  args: {
    width: '40',
    height: '20',
    bgColor: 'surface.action.DEFAULT',
    padding: '4',
  },
  render: (args) => {
    return (
      <FixedSize {...args}>
        Fixed size div
      </FixedSize>
    );
  },
};

export const SquareWithSize: Story = {
  args: {
    size: '20',
    bgColor: 'surface.info.DEFAULT',
    padding: '4',
  },
  render: (args) => {
    return (
      <FixedSize {...args}>
        Square div using size prop
      </FixedSize>
    );
  },
};

export const DifferentTag: Story = {
  args: {
    width: '40',
    height: '10',
    bgColor: 'surface.success.DEFAULT',
    padding: '4',
    as: 'section',
  },
  render: (args) => {
    return (
      <FixedSize {...args}>
        This is a section element
      </FixedSize>
    );
  },
}; 