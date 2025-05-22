import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
  MarginValues,
  PaddingValues,
  TextDecorations,
  TextTransformValues,
  textColors,
  textVariants,
  TextVariant,
  TextColor,
  MarginShorthand,
  PaddingShorthand,
  TextDecoration,
  TextTransform
} from '../../../types';
import Flex from '../../layouts/Flex/Flex';
import Text from './Text';

// This should match the props in the Text component
interface TextStoryProps {
  textVariant?: TextVariant;
  textColor?: TextColor;
  textDecoration?: TextDecoration;
  groupHoverTextDecoration?: TextDecoration;
  textTransform?: TextTransform;
  margin?: MarginShorthand;
  padding?: PaddingShorthand;
  children?: React.ReactNode;
}

const meta: Meta<TextStoryProps> = {
  component: Text,
  title: 'Text',
  tags: ['Primitives/Text', 'autodocs'],
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
      defaultValue: 'content.base',
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
    groupHoverTextDecoration: {
      control: {
        type: 'select',
      },
      options: TextDecorations,
      defaultValue: 'none',
    },
    textTransform: {
      control: {
        type: 'select',
      },
      options: TextTransformValues,
    },
  },
};

export default meta;

const Template: StoryFn<TextStoryProps> = (args) => (
  <div>
    <Flex gap="4">
      <Text {...args as any}>
        {args.children || 'Some text here...'}
      </Text>
    </Flex>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  textVariant: 'content.base',
  textColor: 'dark.primary'
}; 