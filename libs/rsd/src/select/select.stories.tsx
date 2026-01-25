import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Select, type SelectOption, type SelectProps } from './select';

const meta: Docs = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    fullwidth: { control: 'boolean', description: 'Expand to full width.' },
    placeholder: { control: 'text', description: 'Placeholder option label.' },
    value: { control: 'text', description: 'Selected value.' },
  },
  args: {
    fullwidth: false,
    placeholder: 'Choose an option',
    value: '',
  },
  docs: {
    className: 'Select',
    attributes: {
      fullwidth: {
        type: 'boolean',
        description: 'Expands the control to fill its container.',
        defaultValue: false,
        options: [true, false],
      },
    },
    events: {
      onChange: { description: 'Called when selection changes.', detail: '(value: string) => void' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const options: SelectOption[] = [
  { label: 'Alpha', value: 'alpha' },
  { label: 'Beta', value: 'beta' },
  { label: 'Gamma', value: 'gamma' },
];

export const Canvas: Story = {
  render: (args: SelectProps) => <Select {...args} options={options} />,
};
