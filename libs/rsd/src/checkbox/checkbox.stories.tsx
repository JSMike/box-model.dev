import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Checkbox } from './checkbox';

const meta: Docs = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    label: { control: 'text', description: 'Label text' },
    checked: { control: 'boolean', description: 'Checked state' },
    disabled: { control: 'boolean', description: 'Disable control' },
  },
  args: {
    label: 'Remember me',
    checked: false,
    disabled: false,
  },
  docs: {
    className: 'Checkbox',
    attributes: {
      checked: { type: 'boolean', description: 'Checked state', defaultValue: false },
      disabled: { type: 'boolean', description: 'Disable control', defaultValue: false },
      label: { type: 'string', description: 'Visible label' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Canvas: Story = {
  render: (args) => <Checkbox {...args} onChange={() => {}} />,
};
