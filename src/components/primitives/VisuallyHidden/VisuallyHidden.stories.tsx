import type { Meta, StoryObj } from '@storybook/react';
import VisuallyHidden from './VisuallyHidden';

const meta: Meta<typeof VisuallyHidden> = {
  component: VisuallyHidden,
  title: 'Primitives/VisuallyHidden',
  tags: ['Primitives/VisuallyHidden', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A component that visually hides content while keeping it accessible to screen readers.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

export const Default: Story = {
  args: {
    children: 'This text is only visible to screen readers',
  },
  render: (args) => {
    return (
      <div>
        <p>The text below is visually hidden but accessible to screen readers:</p>
        <VisuallyHidden {...args} />
        <p>You won't see any content between these paragraphs, but screen readers will announce it.</p>
      </div>
    );
  },
};

export const WithDifferentTag: Story = {
  args: {
    children: 'This text is only visible to screen readers',
    as: 'span',
  },
  render: (args) => {
    return (
      <div>
        <p>This example uses a span instead of a div:</p>
        <VisuallyHidden {...args} />
      </div>
    );
  },
};

export const WithinInteractiveElement: Story = {
  render: () => {
    return (
      <button className="bg-ds-lilac-500 text-ds-light-500 p-3 rounded">
        <span aria-hidden="true">🔍</span>
        <VisuallyHidden>Search</VisuallyHidden>
      </button>
    );
  },
}; 