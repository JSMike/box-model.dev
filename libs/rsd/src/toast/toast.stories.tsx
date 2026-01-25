import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Toast, type ToastProps, type ToastVariant } from './toast';

const variants: ToastVariant[] = ['default', 'success', 'warning', 'danger', 'info'];

const meta: Docs = {
  title: 'Components/Toast',
  component: Toast,
  argTypes: {
    variant: { control: 'select', options: variants, description: 'Visual variant.' },
    message: { control: 'text', description: 'Toast message content.' },
    showClose: { control: 'boolean', description: 'Show dismiss control.' },
  },
  args: {
    variant: 'default',
    message: 'Toast message content',
    showClose: true,
  },
  docs: {
    className: 'Toast',
    attributes: {
      variant: {
        type: 'ToastVariant',
        description: 'Visual variant for the toast.',
        defaultValue: 'default',
        options: variants,
      },
      showClose: {
        type: 'boolean',
        description: 'Toggle dismiss control.',
        defaultValue: true,
        options: [true, false],
      },
    },
    events: {
      onClose: { description: 'Called when the toast is dismissed.', detail: '() => void' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Canvas: Story = {
  render: (args: ToastProps) => <Toast {...args} />,
};
