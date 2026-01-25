import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Toolbar, type ToolbarGap, type ToolbarProps } from './toolbar';
import { Button } from '../button';

const gaps: ToolbarGap[] = ['sm', 'md', 'lg'];

const meta: Docs = {
  title: 'Components/Toolbar',
  component: Toolbar,
  argTypes: {
    gap: { control: 'select', options: gaps, description: 'Gap between items.' },
  },
  args: {
    gap: 'sm',
  },
  docs: {
    className: 'Toolbar',
    attributes: {
      gap: { type: 'ToolbarGap', description: 'Gap between items.', defaultValue: 'sm', options: gaps },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Canvas: Story = {
  render: (args: ToolbarProps) => (
    <Toolbar {...args}>
      <Button size="small" variant="ghost">
        Bold
      </Button>
      <Button size="small" variant="ghost">
        Italic
      </Button>
      <Button size="small" variant="ghost">
        Heading
      </Button>
    </Toolbar>
  ),
};
