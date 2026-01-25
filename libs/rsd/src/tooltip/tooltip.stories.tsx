import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Button } from '../button';
import { Tooltip, type TooltipProps } from './tooltip';

const meta: Docs = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    label: { control: 'text', description: 'Tooltip text.' },
  },
  args: {
    label: 'Tooltip content',
  },
  docs: {
    className: 'Tooltip',
    attributes: {
      label: { type: 'string', description: 'Tooltip text content.' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Canvas: Story = {
  render: (args: TooltipProps) => (
    <Tooltip {...args}>
      <Button size="small" variant="ghost">
        Hover me
      </Button>
    </Tooltip>
  ),
};
