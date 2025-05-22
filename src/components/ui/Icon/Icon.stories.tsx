import type { Meta, StoryObj } from '@storybook/react';
import { OpacityValues, textColors } from '../../../types';
import NamespaceProvider from '../../providers/NamespaceProvider';
import Flex from '../../layouts/Flex/Flex';
import Icon, { IconType } from './Icon';

const iconTypes: IconType[] = ['solid', 'regular', 'brand'];
const iconSizes = ['3', '4', '5', '6', '8', '10', '12', '14'];

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: 'Icon',
  tags: ['UI/Icon', 'autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: iconTypes,
      defaultValue: 'solid',
    },
    name: {
      control: {
        type: 'text',
      },
      defaultValue: 'arrow-right',
    },
    size: {
      control: {
        type: 'select',
      },
      options: iconSizes,
      defaultValue: '8',
    },
    color: {
      control: {
        type: 'select',
      },
      options: textColors.map(color => color.path),
      defaultValue: 'dark.primary',
    },
    fixedWidth: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    visibility: {
      control: {
        type: 'select',
      },
      options: ['visible', 'invisible', 'collapse'],
    },
    animate: {
      control: {
        type: 'select',
      },
      options: ['spin'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'arrow-right',
    type: 'solid',
    size: '8',
    color: 'dark.primary',
    fixedWidth: true,
  },
  render: (args) => {
    return (
      <>
        <NamespaceProvider theme="admin" device="desktop">
          <Flex gap="4">
            <Icon {...args} />
          </Flex>
        </NamespaceProvider>

        <div className="my-3"></div>

        <NamespaceProvider theme="admin" device="mobile">
          <Flex gap="4">
            <Icon {...args} />
          </Flex>
        </NamespaceProvider>
      </>
    );
  },
};

export const IconSizes: Story = {
  render: () => {
    return (
      <NamespaceProvider theme="admin" device="desktop">
        <Flex gap="4" align="center">
          {iconSizes.map(size => (
            <Icon key={size} name="star" size={size as any} />
          ))}
        </Flex>
      </NamespaceProvider>
    );
  },
};

export const IconTypes: Story = {
  render: () => {
    return (
      <NamespaceProvider theme="admin" device="desktop">
        <Flex gap="4">
          <Icon name="star" type="solid" />
          <Icon name="star" type="regular" />
          <Icon name="github" type="brand" />
        </Flex>
      </NamespaceProvider>
    );
  },
};

export const IconColors: Story = {
  render: () => {
    return (
      <NamespaceProvider theme="admin" device="desktop">
        <Flex gap="4">
          <Icon name="circle" color="dark.primary" />
          <Icon name="circle" color="action" />
          <Icon name="circle" color="info" />
          <Icon name="circle" color="success" />
          <Icon name="circle" color="warn" />
          <Icon name="circle" color="fail" />
        </Flex>
      </NamespaceProvider>
    );
  },
};

export const Animate: Story = {
  args: {
    name: 'sync',
    animate: 'spin',
    size: '8',
  },
  render: (args) => {
    return (
      <NamespaceProvider theme="admin" device="desktop">
        <Flex gap="4">
          <Icon {...args} />
        </Flex>
      </NamespaceProvider>
    );
  },
}; 