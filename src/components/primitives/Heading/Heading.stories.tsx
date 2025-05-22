import type { Meta, StoryObj } from '@storybook/react';
import { MarginValues, PaddingValues, TextDecorations, textColors, textVariants } from '../../../types';
import NamespaceProvider from '../../providers/NamespaceProvider';
import Flex from '../../layouts/Flex/Flex';
import Heading from './Heading';

const meta: Meta<typeof Heading> = {
  component: Heading,
  title: 'Heading',
  tags: ['Primitives/Heading', 'autodocs'],
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
    textVariant: {
      control: {
        type: 'select',
      },
      options: textVariants.map(variant => variant.path),
      defaultValue: 'heading.base',
    },
    textColor: {
      control: {
        type: 'select',
      },
      options: textColors.map(color => color.path),
      defaultValue: 'dark.primary',
    },
    textDecoration: {
      control: {
        type: 'select',
      },
      options: TextDecorations,
      defaultValue: 'none',
    },
    as: {
      control: {
        type: 'select',
      },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'],
      defaultValue: 'h2',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    children: 'Some text here...',
    textVariant: 'heading.base',
    as: 'h2',
    textColor: 'dark.primary',
  },
  render: (args) => {
    return (
      <NamespaceProvider theme="admin" device="desktop">
        <Flex gap="4">
          <Heading {...args} />
        </Flex>
      </NamespaceProvider>
    );
  },
};

export const HeadingLevels: Story = {
  render: () => {
    return (
      <NamespaceProvider theme="admin" device="desktop">
        <Flex direction="col" gap="4">
          <Heading as="h1" textVariant="display.stat">Display Stat (H1)</Heading>
          <Heading as="h1" textVariant="display.text">Display Text (H1)</Heading>
          <Heading as="h2" textVariant="heading.large">Heading Large (H2)</Heading>
          <Heading as="h3" textVariant="heading.base">Heading Base (H3)</Heading>
          <Heading as="span" textVariant="heading.base">Heading as span</Heading>
        </Flex>
      </NamespaceProvider>
    );
  },
};

export const ColoredHeadings: Story = {
  render: () => {
    return (
      <NamespaceProvider theme="admin" device="desktop">
        <Flex direction="col" gap="4">
          <Heading textColor="dark.primary">Dark Primary</Heading>
          <Heading textColor="action">Action Color</Heading>
          <Heading textColor="info">Info Color</Heading>
          <Heading textColor="success">Success Color</Heading>
          <Heading textColor="warn">Warning Color</Heading>
          <Heading textColor="fail">Fail Color</Heading>
        </Flex>
      </NamespaceProvider>
    );
  },
};

export const ImmersiveTheme: Story = {
  render: () => {
    return (
      <NamespaceProvider theme="immersive" device="desktop">
        <div className="bg-immersive-dark-500 p-4">
          <Flex direction="col" gap="4">
            <Heading textColor="immersive.primary" textVariant="heading.large">Immersive Heading</Heading>
            <Heading textColor="immersive.secondary" textVariant="heading.base">Immersive Subheading</Heading>
          </Flex>
        </div>
      </NamespaceProvider>
    );
  },
}; 