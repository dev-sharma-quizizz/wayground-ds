import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Message from './Message';
import { ThemeProvider } from '../../../hooks/useTheme';
import Flex from '../../layouts/Flex/Flex';

const meta: Meta<typeof Message> = {
  component: Message,
  title: 'UI/Message',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ width: '300px' }}>
          <Story />
        </div>
      </ThemeProvider>
    )
  ],
};

export default meta;
type Story = StoryObj<typeof Message>;

export const Default: Story = {
  args: {
    text: 'This is a message',
    type: 'error',
    size: 'default',
  },
  render: (args) => <Message {...args} />,
};

export const AllTypes: Story = {
  render: () => (
    <Flex direction="col" gap="4">
      <Message text="Error message" type="error" />
      <Message text="Success message" type="success" />
      <Message text="Warning message" type="warn" />
      <Message text="Info message" type="info" />
      <Message text="Action message" type="action" />
    </Flex>
  ),
}; 