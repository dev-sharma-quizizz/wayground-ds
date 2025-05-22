import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import IconButton from './IconButton';
import NamespaceProvider from '../../providers/NamespaceProvider';
import Flex from '../../layouts/Flex/Flex';
import Text from '../../primitive/Text/Text';
import { ThemeProvider } from '../../../hooks/useTheme';

const meta: Meta<typeof IconButton> = {
  title: 'IconButton',
  component: IconButton,
  tags: ['ui/IconButton', 'autodocs'],
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
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary', 'tertiary', 'other', 'outline', 'danger', 'super', 'link-action', 'link-dark', 'link-light'],
      defaultValue: 'primary',
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    icon: {
      control: {
        type: 'text',
      },
      defaultValue: 'arrow-right',
    },
    iconType: {
      control: {
        type: 'select',
      },
      options: ['solid', 'regular', 'brand'],
      defaultValue: 'solid',
    },
    isSuper: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    loading: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    type: {
      control: {
        type: 'select',
      },
      options: ['button', 'submit', 'reset'],
      defaultValue: 'button',
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: 'arrow-right',
    variant: 'primary',
    size: 'md',
  },
  render: (args) => <IconButton {...args} />,
};

export const AdminIconButton: Story = {
  render: (args) => {
    return (
      <Flex direction="col" gap="4">
        <Text>
          <strong>Admin Theme - Desktop</strong>
        </Text>
        <NamespaceProvider theme="admin" device="desktop">
          <Flex gap="4">
            <IconButton {...args} />
          </Flex>
        </NamespaceProvider>

        <Text>
          <strong>Admin Theme - Mobile</strong>
        </Text>
        <NamespaceProvider theme="admin" device="mobile">
          <Flex gap="4">
            <IconButton {...args} />
          </Flex>
        </NamespaceProvider>
      </Flex>
    );
  },
};

export const ImmersiveIconButton: Story = {
  render: (args) => {
    return (
      <div className="bg-immersive-dark-500 p-4 rounded">
        <Flex direction="col" gap="4">
          <Text>
            <strong>Immersive Theme - Desktop</strong>
          </Text>
          <NamespaceProvider theme="immersive" device="desktop">
            <Flex gap="4" className="bg-immersive-dark-400-80 p-2 rounded">
              <IconButton {...args} />
            </Flex>
          </NamespaceProvider>

          <Text>
            <strong>Immersive Theme - Mobile</strong>
          </Text>
          <NamespaceProvider theme="immersive" device="mobile">
            <Flex gap="4">
              <IconButton {...args} />
            </Flex>
          </NamespaceProvider>
        </Flex>
      </div>
    );
  },
}; 