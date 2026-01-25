import type { StoryObj, Meta } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Tag, type TagProps } from './tag';

type StoryArgs = TagProps & { label: string };

const variants = ['neutral', 'info', 'success', 'warning', 'danger'] as const;

const meta: Docs<Meta<StoryArgs>> = {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    label: {
      control: 'text',
      description: 'Tag label content',
    },
    variant: {
      control: 'select',
      options: variants,
      description: 'Visual intent of the tag',
    },
  },
  args: {
    label: 'Label',
    variant: 'neutral',
  },
  docs: {
    className: 'Tag',
    slots: {
      '': { description: 'Tag label content.' },
    },
    attributes: {
      variant: {
        type: 'TagVariant',
        description: 'Visual intent of the tag.',
        defaultValue: 'neutral',
        options: variants,
      },
    },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Canvas: Story = {
  render: ({ label, ...args }: StoryArgs) => <Tag {...args}>{label}</Tag>,
};
