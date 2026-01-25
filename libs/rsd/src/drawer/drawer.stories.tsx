import React from 'react';
import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Button } from '../button';
import { Drawer, type DrawerPlacement, type DrawerProps } from './drawer';

const placements: DrawerPlacement[] = ['right', 'left', 'top', 'bottom'];

const meta: Docs = {
  title: 'Components/Drawer',
  component: Drawer,
  argTypes: {
    open: { control: 'boolean', description: 'Controls visibility.' },
    placement: { control: 'select', options: placements, description: 'Drawer anchor edge.' },
    noBackdropClose: {
      control: 'boolean',
      description: 'Disable closing when the backdrop is pressed.',
    },
    showCloseControl: {
      control: 'boolean',
      description: 'Toggle the close control visibility.',
    },
    title: { control: 'text', description: 'Drawer heading.' },
    body: { control: 'text', description: 'Drawer body content.' },
  },
  args: {
    open: false,
    placement: 'right',
    noBackdropClose: false,
    showCloseControl: true,
    title: 'Filters',
    body: 'Adjust filters and hit apply to refine the results.',
    primaryActionLabel: 'Apply',
  },
  docs: {
    className: 'Drawer',
    attributes: {
      open: {
        type: 'boolean',
        description: 'Controls whether the drawer is shown.',
        defaultValue: false,
        options: [true, false],
      },
      placement: {
        type: 'DrawerPlacement',
        description: 'Which edge of the viewport the drawer anchors to.',
        defaultValue: 'right',
        options: placements,
      },
      noBackdropClose: {
        type: 'boolean',
        description: 'Disable closing when pressing the backdrop.',
        defaultValue: false,
        options: [true, false],
      },
    },
    events: {
      onClose: { description: 'Called when the drawer requests close.', detail: '() => void' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Canvas: Story = {
  render: (args: DrawerProps) => {
    const [open, setOpen] = React.useState(args.open);
    const handleClose = () => {
      setOpen(false);
      args.onClose?.();
    };

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer
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
