import type { Meta, StoryObj } from '@storybook/react';
import { AlignItemsValues, FlexDirectionValues, FlexWrapValues, GapValues, JustifyContentValues, OpacityValues } from '../../../types';
import commonStoryProps from '../../../utils/commonStoryProps';
import Flex from './Flex';

const meta: Meta<typeof Flex> = {
  component: Flex,
  title: 'Flex',
  tags: ['Layouts/Flex', 'autodocs'],
  argTypes: {
    direction: {
      control: {
        type: 'select',
      },
      options: FlexDirectionValues,
      defaultValue: 'row',
    },
    align: {
      control: {
        type: 'select',
      },
      options: AlignItemsValues,
      defaultValue: 'start',
    },
    justify: {
      control: {
        type: 'select',
      },
      options: JustifyContentValues,
      defaultValue: 'start',
    },
    wrap: {
      control: {
        type: 'select',
      },
      options: FlexWrapValues,
      defaultValue: 'no-wrap',
    },
    gap: {
      control: {
        type: 'select',
      },
      options: GapValues,
      defaultValue: '0',
    },
    rowGap: {
      control: {
        type: 'select',
      },
      options: GapValues,
      defaultValue: '0',
    },
    columnGap: {
      control: {
        type: 'select',
      },
      options: GapValues,
      defaultValue: '0',
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
type Story = StoryObj<typeof Flex>;

export const Default: Story = {
  args: {
    direction: 'row',
    gap: '4',
  },
  render: (args) => {
    return (
      <Flex {...args}>
        <div className="w-16 h-16 bg-ds-lilac-500"></div>
        <div className="w-16 h-16 bg-ds-fail-500"></div>
        <div className="w-16 h-16 bg-ds-warn-500"></div>
      </Flex>
    );
  },
};
