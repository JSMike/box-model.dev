import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { List, type ListProps } from './list';

const meta: Docs = {
  title: 'Components/List',
  component: List,
  argTypes: {
    ordered: { control: 'boolean', description: 'Render ordered list when true.' },
  },
  args: {
    ordered: false,
  },
  docs: {
    className: 'List',
    attributes: {
      ordered: {
        type: 'boolean',
        description: 'Switch between ordered and unordered list rendering.',
        defaultValue: false,
        options: [true, false],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

const items = ['Enable monitoring', 'Review access controls', 'Schedule audit'];

export const Canvas: Story = {
  render: (args: ListProps) => <List {...args} items={items} />,
};
