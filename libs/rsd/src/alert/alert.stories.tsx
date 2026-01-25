import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Alert, type AlertVariant } from './alert';

const variants: AlertVariant[] = ['info', 'success', 'warning', 'danger'];

const meta: Docs = {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      description: 'Alert intent determines color and icon.',
    },
    heading: {
      control: 'text',
      description: 'Optional bolded preface inside the message.',
    },
    body: {
      control: 'text',
      description: 'Alert body copy.',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show a close control.',
    },
  },
  args: {
    variant: 'info',
    heading: 'Heads up!',
    body: 'Alert messages draw attention to important system feedback.',
    dismissible: true,
  },
  docs: {
    className: 'Alert',
    attributes: {
      variant: {
        type: 'AlertVariant',
        description: 'Visual intent of the alert.',
        defaultValue: 'info',
        options: variants,
      },
    },
    events: {
      close: {
        description: 'Invoked when the close control is clicked (via onClose).',
        detail: 'void',
      },
    },
    slots: {
      '': {
        description: 'Main alert message content.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Canvas: Story = {
  render: ({ heading, body, dismissible, ...args }) => (
    <Alert
      {...args}
      onClose={
        dismissible
          ? () => {
              /* handled by consumer */
            }
          : undefined
      }
    >
      <html.span style={{ fontWeight: 600 }}>{heading ? `${heading} ` : ''}</html.span>
      {body}
    </Alert>
  ),
};
