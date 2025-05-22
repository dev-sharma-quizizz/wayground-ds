import type { Meta, StoryObj } from '@storybook/react';
import { FloatingPosition, SpacingValues } from '../../../types';
import commonStoryProps from '../../../utils/commonStoryProps';
import Floating from './Floating';

const positionOptions: FloatingPosition[] = [
  'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left', 'center',
  'inset top', 'inset top-right', 'inset right', 'inset bottom-right', 'inset bottom',
  'inset bottom-left', 'inset left', 'inset top-left'
];

const meta: Meta<typeof Floating> = {
  component: Floating,
  title: 'Floating',
  tags: ['Layouts/Floating', 'autodocs'],
  argTypes: {
    position: {
      control: {
        type: 'select',
      },
      options: positionOptions,
      defaultValue: 'top-right',
    },
    offset: {
      control: {
        type: 'select',
      },
      options: SpacingValues,
      defaultValue: '2',
    },
    ...commonStoryProps,
  },
};

export default meta;
type Story = StoryObj<typeof Floating>;

export const Default: Story = {
  args: {
    position: 'top-right',
    offset: '4',
    bgColor: 'surface.action.DEFAULT',
    padding: '4',
  },
  render: (args) => {
    return (
      <div className="relative w-full h-96 bg-ds-light-300 p-20 flex items-center justify-center">
        <div className="relative bg-ds-dark-200 w-40 h-40 flex items-center justify-center">
          Parent Element
          <Floating {...args}>
            <div className="text-ds-light-500 p-3 whitespace-nowrap">Floating Element</div>
          </Floating>
        </div>
      </div>
    );
  },
};

export const OutsideCorners: Story = {
  render: (args) => {
    return (
      <div className="relative w-full h-96 bg-ds-light-300 p-20 flex items-center justify-center">
        <div className="relative bg-ds-dark-200 w-60 h-60 flex items-center justify-center">
          Parent Element
          <Floating
            position="top-left"
            bgColor="surface.action.DEFAULT"
            padding="2"
          >
            <div className="text-ds-light-500">Top Left</div>
          </Floating>
          <Floating
            position="top-right"
            bgColor="surface.info.DEFAULT"
            padding="2"
          >
            <div className="text-ds-light-500">Top Right</div>
          </Floating>
          <Floating
            position="bottom-right"
            bgColor="surface.success.DEFAULT"
            padding="2"
          >
            <div className="text-ds-light-500">Bottom Right</div>
          </Floating>
          <Floating
            position="bottom-left"
            bgColor="surface.warn.DEFAULT"
            padding="2"
          >
            <div className="text-ds-light-500">Bottom Left</div>
          </Floating>
        </div>
      </div>
    );
  },
};

export const InsideCorners: Story = {
  render: (args) => {
    return (
      <div className="relative w-full h-96 bg-ds-light-300 p-20 flex items-center justify-center">
        <div className="relative bg-ds-dark-200 w-60 h-60 flex items-center justify-center">
          Parent Element
          <Floating
            position="inset top-left"
            bgColor="surface.action.DEFAULT"
            padding="2"
          >
            <div className="text-ds-light-500">Inset Top Left</div>
          </Floating>
          <Floating
            position="inset top-right"
            bgColor="surface.info.DEFAULT"
            padding="2"
          >
            <div className="text-ds-light-500">Inset Top Right</div>
          </Floating>
          <Floating
            position="inset bottom-right"
            bgColor="surface.success.DEFAULT"
            padding="2"
          >
            <div className="text-ds-light-500">Inset Bottom Right</div>
          </Floating>
          <Floating
            position="inset bottom-left"
            bgColor="surface.warn.DEFAULT"
            padding="2"
          >
            <div className="text-ds-light-500">Inset Bottom Left</div>
          </Floating>
        </div>
      </div>
    );
  },
};

export const Center: Story = {
  args: {
    position: 'center',
    bgColor: 'surface.action.DEFAULT',
    padding: '4',
    rounded: 'lg',
    shadow: 'md',
  },
  render: (args) => {
    return (
      <div className="relative w-full h-96 bg-ds-light-300 p-20 flex items-center justify-center">
        <div className="relative bg-ds-dark-200 w-60 h-60 flex items-center justify-center">
          Parent Element
          <Floating {...args}>
            <div className="text-ds-light-500 p-3">Centered</div>
          </Floating>
        </div>
      </div>
    );
  },
}; 