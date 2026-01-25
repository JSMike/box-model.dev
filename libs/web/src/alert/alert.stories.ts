import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/alert';
import '../close-control';

const variants = ['info', 'success', 'warning', 'danger'] as const;

const meta: Docs = {
  component: 'alert-box',
  title: 'Components/Alert box',
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      description: 'Alert intent determines color and icon.',
    },
    heading: {
      control: 'text',
      description: 'Optional bolded preface inside the paragraph',
    },
    body: {
      control: 'text',
      description: 'Alert body copy rendered in a paragraph',
    },
    showCloseControl: {
      control: 'boolean',
      description: 'Adds a `<close-control-box>` via the `close-control` slot.',
    },
  },
  args: {
    variant: 'info',
    heading: 'Heads up! ',
    body: 'Alert messages draw attention to important system feedback.',
    showCloseControl: true,
  },
  docs: {
    selector: 'alert-box',
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
        description: 'Emitted when a slotted close control is activated.',
        detail: 'void',
      },
    },
    slots: {
      '': {
        description: 'Main alert message content (e.g., paragraph text).',
      },
      'close-control': {
        description: 'Optional slot for a custom close control element.',
      },
    },
    cssProperties: {
      '--alert-background': {
        description: 'Background color of the alert surface.',
        defaultValue: 'var(--component-alert-info-background)',
      },
      '--alert-border-color': {
        description: 'Border color of the alert surface.',
        defaultValue: 'var(--component-alert-info-border)',
      },
      '--alert-text-color': {
        description: 'Text color within the alert.',
        defaultValue: 'var(--component-alert-info-text)',
      },
      '--alert-radius': {
        description: 'Corner radius of the alert container (square by design).',
        defaultValue: 'var(--component-alert-radius)',
      },
      '--alert-padding': {
        description: 'Padding inside the alert container.',
        defaultValue: 'var(--component-alert-padding)',
      },
      '--alert-gap': {
        description: 'Gap between inline items inside the alert.',
        defaultValue: 'var(--component-alert-gap)',
      },
      '--alert-border-width': {
        description: 'Width of the alert border.',
        defaultValue: 'var(--size-border-width-hairline)',
      },
      '--alert-font-family': {
        description: 'Font family for alert text.',
        defaultValue: 'var(--typography-roles-body-font-family)',
      },
      '--alert-font-size': {
        description: 'Font size for alert text.',
        defaultValue: 'var(--typography-roles-body-font-size)',
      },
      '--alert-font-weight': {
        description: 'Font weight for alert text.',
        defaultValue: 'var(--typography-roles-body-font-weight)',
      },
      '--alert-line-height': {
        description: 'Line height for alert text.',
        defaultValue: 'var(--typography-roles-body-line-height)',
      },
    },
    cssParts: {},
    dependencies: {
      'close-control-box': {
        description: 'Optional dependency for dismissing the alert via the `close-control` slot.',
        included: false,
      },
      'status-icon-box': {
        description: 'Prepended intent glyph displayed by the component.',
        included: true,
      },
    },
  },
};

export default meta;

export const Canvas: Story = {
  render: ({ variant, heading, body, showCloseControl }) => html`
    <alert-box variant="${variant}">
      <p>${heading ? html`<strong>${heading}</strong>` : ''}${body}</p>
      ${showCloseControl
        ? html`<close-control-box slot="close-control" label="Dismiss alert"></close-control-box>`
        : null}
    </alert-box>
  `,
};
