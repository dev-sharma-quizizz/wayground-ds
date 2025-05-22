import type { Meta, StoryObj } from '@storybook/react';
import { GapValues, GridUnitValues } from '../../../types';
import commonStoryProps from '../../../utils/commonStoryProps';
import Grid from './Grid';

const meta: Meta<typeof Grid> = {
  component: Grid,
  title: 'Grid',
  tags: ['Layouts/Grid', 'autodocs'],
  argTypes: {
    numRows: {
      control: {
        type: 'select',
      },
      options: GridUnitValues,
      defaultValue: '2',
    },
    numCols: {
      control: {
        type: 'select',
      },
      options: GridUnitValues,
      defaultValue: '2',
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
    equalColSize: {
      control: {
        type: 'boolean',
      },
      defaultValue: true,
    },
    equalRowSize: {
      control: {
        type: 'boolean',
      },
      defaultValue: true,
    },
    ...commonStoryProps,
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  args: {
    numRows: '2',
    numCols: '3',
    gap: '4',
  },
  render: (args) => {
    return (
      <div className="w-full">
        <Grid {...args}>
          <div className="bg-ds-fail-500 text-ds-light-500 p-3">Option 1</div>
          <div className="bg-ds-info-500 text-ds-light-500 p-3">Option 2</div>
          <div className="bg-ds-success-500 text-ds-light-500 p-3">Option 3</div>
          <div className="bg-ds-lilac-500 text-ds-light-500 p-3">Option 4</div>
          <div className="bg-ds-warn-500 text-ds-light-500 p-3">Option 5</div>
          <div className="bg-ds-super-500 text-ds-light-500 p-3">Option 6</div>
        </Grid>
      </div>
    );
  },
}; 