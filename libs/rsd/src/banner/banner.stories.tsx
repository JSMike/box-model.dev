import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Banner, type BannerVariant } from './banner';
import { Button } from '../button';

const variants: BannerVariant[] = ['default', 'info', 'success', 'warning', 'danger'];

const meta: Docs = {
  title: 'Components/Banner',
  component: Banner,
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      description: 'Banner intent determines color and icon.',
    },
    body: {
      control: 'text',
      description: 'Banner body content.',
    },
    details: {
      control: 'text',
      description: 'Optional secondary detail text.',
    },
    showActions: {
      control: 'boolean',
      description: 'Show sample actions row.',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show a close control.',
    },
  },
  args: {
    variant: 'default',
    body: 'System maintenance scheduled for 02:00 UTC.',
    details: 'Expect up to 5 minutes of read-only mode.',
    showActions: true,
    dismissible: true,
  },
  docs: {
    className: 'Banner',
    attributes: {
      variant: {
        type: 'BannerVariant',
        description: 'Visual intent of the banner.',
        defaultValue: 'default',
        options: variants,
      },
    },
    slots: {
      '': { description: 'Primary banner body content.' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Canvas: Story = {
  render: ({ body, details, showActions, dismissible, ...args }) => (
    <Banner
      {...args}
      details={details ? <html.div>{details}</html.div> : undefined}
      actions={
        showActions ? (
          <html.div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button size="small">Learn more</Button>
            <Button size="small" variant="secondary">
              Dismiss
            </Button>
          </html.div>
        ) : undefined
      }
      onClose={
        dismissible
          ? () => {
              /* consumer handles */
            }
          : undefined
      }
    >
      {body}
    </Banner>
  ),
};
