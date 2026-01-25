import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { CloseControl } from './close-control';

const meta: Docs = {
  title: 'Components/Close control',
  component: CloseControl,
  argTypes: {
    label: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
  },
  args: {
    label: 'Close dialog',
  },
  docs: {
    className: 'CloseControl',
    attributes: {
      label: {
        type: 'string',
        description: 'Accessible label announced for the control.',
        defaultValue: 'Close',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CloseControl>;

export const Canvas: Story = {
  render: ({ label, ...args }) => <CloseControl label={label} {...args} />,
};
