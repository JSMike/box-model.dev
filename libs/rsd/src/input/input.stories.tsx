import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Input, type InputProps } from './input';

const meta: Docs = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    fullwidth: { control: 'boolean', description: 'Stretch input to container width.' },
    placeholder: { control: 'text', description: 'Placeholder text.' },
    value: { control: 'text', description: 'Input value.' },
    disabled: { control: 'boolean', description: 'Disable the input.' },
    readOnly: { control: 'boolean', description: 'Render as read-only.' },
  },
  args: {
    fullwidth: false,
    placeholder: 'Enter text',
    value: '',
    disabled: false,
    readOnly: false,
  },
  docs: {
    className: 'Input',
    attributes: {
      fullwidth: {
        type: 'boolean',
        description: 'Expands to fill the parent width.',
        defaultValue: false,
        options: [true, false],
      },
      disabled: {
        type: 'boolean',
        description: 'Disables the control.',
        defaultValue: false,
        options: [true, false],
      },
      readOnly: {
        type: 'boolean',
        description: 'Renders the control as read-only.',
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
type Story = StoryObj<typeof Input>;

export const Canvas: Story = {
  render: (args: InputProps) => <Input {...args} />,
};
