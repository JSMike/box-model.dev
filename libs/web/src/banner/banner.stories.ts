import type { StoryObj as Story } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/banner';
import '../button';
import '../close-control';

const variants = ['default', 'info', 'success', 'warning', 'danger'] as const;

const meta: Docs = {
  component: 'banner-box',
  title: 'Components/Banner box',
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      description: 'Visual intent of the banner',
    },
    message: {
      control: 'text',
      description: 'Main message content',
    },
    actionLabel: {
      control: 'text',
      description: 'Optional action label',
    },
    showCloseControl: {
      control: 'boolean',
      description: 'Adds a `<close-control-box>` via the named slot.',
    },
    details: {
      control: 'text',
      description: 'Optional collapsible details rendered below the message',
    },
  },
  args: {
    variant: 'info',
    message: 'System maintenance is scheduled for tonight at 11pm UTC.',
    actionLabel: 'Details',
    showCloseControl: false,
    details: 'Maintenance starts at 23:00 UTC and ends at 02:00 UTC.',
  },
  docs: {
    selector: 'banner-box',
    className: 'Banner',
    attributes: {
      variant: {
        type: 'BannerVariant',
        description: 'Defines the visual intent of the banner box.',
        defaultValue: 'default',
        options: variants,
      },
    },
    events: {
      close: {
        description: 'Fired when the close control is activated.',
        detail: 'void',
      },
    },
    slots: {
      '': {
        description: 'Main message content of the banner box.',
      },
      details: {
        description: 'Optional slot for additional details, typically rendered in a `<details>` element.',
      },
      actions: {
        description: 'Optional slot for action controls, such as buttons.',
      },
      'close-control': {
        description: 'Optional slot for a close control element, such as a `<close-control-box>`.',
      },
    },
    cssProperties: {
      '--banner-box-padding': {
        description: 'Padding inside the banner box.',
        defaultValue: '1rem',
      },
      '--banner-box-gap': {
        description: 'Gap between elements inside the banner box.',
        defaultValue: '0.5rem',
      },
      '--banner-box-border-radius': {
        description: 'Border radius of the banner box.',
        defaultValue: '0',
      },
      '--banner-box-background': {
        description: 'Background color of the banner box.',
        defaultValue: 'var(--color-background-secondary)',
      },
      '--banner-box-border': {
        description: 'Border of the banner box.',
        defaultValue: '1px solid var(--color-border-primary)',
      },
      '--banner-box-text': {
        description: 'Text color of the banner box.',
        defaultValue: 'var(--color-text-primary)',
      },
      '--banner-box-close-size': {
        description: 'Size of the close control.',
        defaultValue: '1rem',
      },
    },
    cssParts: {
      surface: {
        description: 'The main surface of the banner box.',
      },
      content: {
        description: 'The content area of the banner box.',
      },
      details: {
        description: 'The details area of the banner box.',
      },
      actions: {
        description: 'The actions area of the banner box.',
      },
      close: {
        description: 'The close control area of the banner box.',
      },
    },
    dependencies: {
      'close-control-box': {
        description: 'Used for the close control slot.',
        included: false,
      },
      'button-box': {
        description: 'Used for action buttons.',
        included: false,
      },
      'status-icon-box': {
        description: 'Used to display the status icon based on the variant.',
        included: true,
      },
    },
  },
};

export default meta;

export const Canvas: Story = {
  render: ({ variant, message, actionLabel, showCloseControl, details }) => html`
    <banner-box variant="${variant}">
      <p>${message}</p>
      ${details
        ? html`<details slot="details">
            <summary>More information</summary>
            <p>${details}</p>
          </details>`
        : nothing}
      ${actionLabel
        ? html`<div slot="actions">
            <button-box>
              <button type="button">${actionLabel}</button>
            </button-box>
          </div>`
        : nothing}
      ${showCloseControl
        ? html`<close-control-box
            slot="close-control"
            label="Dismiss banner"
            style="--close-size: 1.25rem"
          ></close-control-box>`
        : nothing}
    </banner-box>
  `,
};
