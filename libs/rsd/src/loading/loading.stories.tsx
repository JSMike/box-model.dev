import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Loading } from './loading';

const meta: Docs = {
  title: 'Components/Loading',
  component: Loading,
  argTypes: {
    label: { control: 'text', description: 'Accessible loading label' },
  },
  args: {
    label: 'Loading…',
  },
  docs: {
    className: 'Loading',
    attributes: {
      label: { type: 'string', description: 'Visible/announced label', defaultValue: 'Loading' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Canvas: Story = {
  render: (args) => <Loading {...args} />,
};
