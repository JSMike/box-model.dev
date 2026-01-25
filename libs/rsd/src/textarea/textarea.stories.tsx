import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Textarea, type TextareaProps } from './textarea';

const meta: Docs = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    fullwidth: { control: 'boolean', description: 'Expand to full width.' },
    placeholder: { control: 'text', description: 'Placeholder text.' },
    value: { control: 'text', description: 'Textarea value.' },
    disabled: { control: 'boolean', description: 'Disable the textarea.' },
    readOnly: { control: 'boolean', description: 'Render as read-only.' },
  },
  args: {
    fullwidth: true,
    placeholder: 'Write something...',
    value: '',
    disabled: false,
    readOnly: false,
  },
  docs: {
    className: 'Textarea',
    attributes: {
      fullwidth: {
        type: 'boolean',
        description: 'Expands to fill its container.',
        defaultValue: false,
        options: [true, false],
      },
    },
    events: {
      onChange: { description: 'Called when the value changes.', detail: '(value: string) => void' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Canvas: Story = {
  render: (args: TextareaProps) => <Textarea {...args} />,
};
