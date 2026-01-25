import React from 'react';
import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Button } from '../button';
import { Dialog, type DialogProps } from './dialog';

const meta: Docs = {
  title: 'Components/Dialog',
  component: Dialog,
  argTypes: {
    open: { control: 'boolean', description: 'Controls whether the dialog is visible.' },
    noBackdropClose: {
      control: 'boolean',
      description: 'Prevents closing when the backdrop is clicked.',
    },
    showCloseControl: {
      control: 'boolean',
      description: 'Shows the close control in the header.',
    },
    title: { control: 'text', description: 'Dialog heading.' },
    body: { control: 'text', description: 'Dialog body content.' },
    primaryActionLabel: { control: 'text', description: 'Label for the primary action button.' },
  },
  args: {
    open: false,
    noBackdropClose: false,
    showCloseControl: true,
    title: 'Invite team member',
    body: 'Send an invite to collaborate on this workspace.',
    primaryActionLabel: 'Send invite',
  },
  docs: {
    className: 'Dialog',
    attributes: {
      open: {
        type: 'boolean',
        description: 'Controls visibility.',
        defaultValue: false,
        options: [true, false],
      },
      noBackdropClose: {
        type: 'boolean',
        description: 'Disable closing when clicking the backdrop.',
        defaultValue: false,
        options: [true, false],
      },
      showCloseControl: {
        type: 'boolean',
        description: 'Toggle the close control visibility.',
        defaultValue: true,
        options: [true, false],
      },
      title: {
        type: 'string',
        description: 'Heading text.',
      },
      primaryActionLabel: {
        type: 'string',
        description: 'Label for the primary button.',
      },
    },
    events: {
      onClose: { description: 'Called when the dialog requests to close.', detail: '() => void' },
      onPrimaryAction: {
        description: 'Called when the primary action is triggered.',
        detail: '() => void',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Canvas: Story = {
  render: (args: DialogProps) => {
    const [open, setOpen] = React.useState(args.open);

    const handleClose = () => {
      setOpen(false);
      args.onClose?.();
    };

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog
          {...args}
          open={open}
          onClose={handleClose}
          body={args.body}
          title={args.title}
        />
      </div>
    );
  },
};
