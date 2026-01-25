import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { RadioGroup, type RadioGroupProps } from './radio';

const meta: Docs = {
  title: 'Components/Radio Group',
  component: RadioGroup,
  argTypes: {
    legend: { control: 'text', description: 'Legend describing the group.' },
    value: { control: 'text', description: 'Selected value.' },
  },
  args: {
    legend: 'Billing frequency',
    value: 'monthly',
  },
  docs: {
    className: 'RadioGroup',
    attributes: {
      legend: {
        type: 'string',
        description: 'Optional legend text.',
        defaultValue: '',
      },
      value: {
        type: 'string',
        description: 'Currently selected value.',
      },
    },
    events: {
      onChange: { description: 'Called when selection changes.', detail: '(value: string) => void' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const options = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Annual', value: 'annual' },
];

export const Canvas: Story = {
  render: (args: RadioGroupProps) => <RadioGroup {...args} options={options} />,
};
