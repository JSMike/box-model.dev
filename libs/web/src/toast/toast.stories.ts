import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/toast';
import '../button';
import '../close-control';

const variants = ['default', 'info', 'success', 'warning', 'danger'] as const;

const meta: Docs = {
  component: 'toast-box',
  title: 'Components/Toast box',
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      description: 'Visual intent of the toast notification',
    },
    message: {
      control: 'text',
      description: 'Toast message content',
    },
    showCloseControl: {
      control: 'boolean',
      description: 'Adds a `<close-control-box>` via the `close-control` slot.',
    },
  },
  args: {
    variant: 'success',
    message: 'Your settings were saved.',
    showCloseControl: true,
  },
  docs: {
    selector: 'toast-box',
    className: 'Toast',
    attributes: {
      variant: {
        type: 'ToastVariant',
        description: 'Visual intent of the toast.',
        defaultValue: 'default',
        options: variants,
      },
    },
    events: {
      close: {
        description: 'Emitted when the close control is activated.',
        detail: 'void',
      },
    },
    slots: {
      '': {
        description: 'Main toast message content.',
      },
      'close-control': {
        description: 'Optional custom close control element.',
      },
    },
    cssProperties: {
      '--toast-padding': {
        description: 'Padding inside the toast.',
        defaultValue: 'var(--component-toast-padding)',
      },
      '--toast-gap': {
        description: 'Gap between icon, content, and close control.',
        defaultValue: 'var(--component-toast-gap)',
      },
      '--toast-border-width': {
        description: 'Border width around the toast.',
        defaultValue: 'var(--component-toast-border-width)',
      },
      '--toast-shadow': {
        description: 'Shadow applied to the toast surface.',
        defaultValue: 'var(--component-toast-shadow)',
      },
      '--toast-background': {
        description: 'Background color of the toast.',
        defaultValue: 'var(--component-toast-default-background)',
      },
      '--toast-border': {
        description: 'Border color of the toast.',
        defaultValue: 'var(--component-toast-default-border)',
      },
      '--toast-text': {
        description: 'Text color inside the toast.',
        defaultValue: 'var(--component-toast-default-text)',
      },
      '--toast-icon': {
        description: 'Icon color in the toast.',
        defaultValue: 'var(--component-toast-default-icon)',
      },
      '--toast-close-size': {
        description: 'Size applied to slotted close controls.',
        defaultValue: 'var(--component-close-control-size)',
      },
    },
    cssParts: {
      icon: {
        description: 'Intent glyph shown before the content.',
      },
    },
    dependencies: {
      'close-control-box': {
        description: 'Optional dependency for dismissing the toast via the `close-control` slot.',
        included: false,
      },
    },
  },
};

export default meta;

export const Canvas: Story = {
  render: ({ variant, message, showCloseControl }) => html`
    <toast-box variant="${variant}">
      <p>${message}</p>
      ${showCloseControl
        ? html`<close-control-box
            slot="close-control"
            label="Dismiss notification"
            style="--close-control-size: 1.25rem"
          ></close-control-box>`
        : null}
    </toast-box>
  `,
};
