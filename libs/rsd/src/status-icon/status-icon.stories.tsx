import type { StoryObj, Meta } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { StatusIcon, type StatusIconProps } from './status-icon';

const variants = ['info', 'success', 'warning', 'danger', 'custom'] as const;

const meta: Docs<Meta<StatusIconProps>> = {
  title: 'Components/StatusIcon',
  component: StatusIcon,
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      description: 'Visual variant',
    },
    label: {
      control: 'text',
      description: 'Accessible label',
    },
  },
  args: {
    variant: 'info',
    label: '',
  },
  docs: {
    className: 'StatusIcon',
    attributes: {
      variant: {
        type: 'StatusIconVariant',
        description: 'Visual variant of the status icon.',
        defaultValue: 'info',
        options: variants,
      },
      label: {
        type: 'string',
        description: 'Accessible label for the icon.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<StatusIconProps>;

export const Canvas: Story = {
  render: (args) => <StatusIcon {...args} />,
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <StatusIcon variant="info" />
      <StatusIcon variant="success" />
      <StatusIcon variant="warning" />
      <StatusIcon variant="danger" />
    </div>
  ),
};
