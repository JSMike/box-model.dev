import type { StoryObj, Meta } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Badge, type BadgeProps } from './badge';

type StoryArgs = BadgeProps & { label: string };

const meta: Docs<Meta<StoryArgs>> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    label: {
      control: 'text',
      description: 'Badge label content',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Visual intent of the badge',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Badge size',
    },
  },
  args: {
    label: 'New',
    variant: 'default',
    size: 'medium',
  },
  docs: {
    className: 'Badge',
    slots: {
      '': { description: 'Badge label content.' },
    },
    attributes: {
      variant: {
        type: 'BadgeVariant',
        description: 'Visual intent of the badge.',
        defaultValue: 'default',
        options: ['default', 'success', 'warning', 'error', 'info'],
      },
      size: {
        type: 'BadgeSize',
        description: 'Badge size.',
        defaultValue: 'medium',
        options: ['small', 'medium'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Canvas: Story = {
  render: ({ label, ...args }: StoryArgs) => <Badge {...args}>{label}</Badge>,
};
