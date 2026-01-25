import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/card';
import '../button';
import '../close-control';

const meta: Docs = {
  component: 'card-box',
  title: 'Components/Card box',
  argTypes: {
    interactive: {
      control: 'boolean',
      description: 'Toggle hover elevation effect',
    },
    heading: {
      control: 'text',
      description: 'Optional heading content',
    },
    body: {
      control: 'text',
      description: 'Body copy content',
    },
    footer: {
      control: 'text',
      description: 'Footer metadata or actions',
    },
    showCloseControl: {
      control: 'boolean',
      description: 'Adds a `<close-control-box>` via the `close-control` slot.',
    },
  },
  args: {
    interactive: false,
    heading: 'Card heading',
    body: 'Use cards to group related content and surface actions.',
    footer: 'Last updated just now',
    showCloseControl: false,
  },
  docs: {
    selector: 'card-box',
    className: 'Card',
    attributes: {
      interactive: {
        type: 'boolean',
        description: 'Enables hover elevation on the card surface.',
        defaultValue: false,
        options: [true, false],
      },
    },
    events: {
      close: {
        description: 'Emitted when a slotted close control is activated.',
        detail: 'void',
      },
    },
    slots: {
      header: {
        description: 'Header content, typically a heading element.',
      },
      '': {
        description: 'Main card body content.',
      },
      footer: {
        description: 'Footer content such as metadata.',
      },
      actions: {
        description: 'Action controls aligned after the footer.',
      },
      'close-control': {
        description: 'Optional custom close control element.',
      },
    },
    cssProperties: {
      '--card-background': {
        description: 'Background color of the card surface.',
        defaultValue: 'var(--box-model-background-surface)',
      },
      '--card-border-color': {
        description: 'Border color of the card surface.',
        defaultValue: 'var(--box-model-border-strong)',
      },
      '--card-border-width': {
        description: 'Border width of the card.',
        defaultValue: 'var(--component-card-border-width)',
      },
      '--card-border-radius': {
        description: 'Corner radius of the card (square by design).',
        defaultValue: 'var(--component-card-border-radius)',
      },
      '--card-padding': {
        description: 'Padding inside the card surface.',
        defaultValue: 'var(--component-card-padding)',
      },
      '--card-gap': {
        description: 'Gap between stacked sections.',
        defaultValue: 'var(--component-card-gap)',
      },
      '--card-shadow': {
        description: 'Shadow in the resting state.',
        defaultValue: 'var(--component-card-shadow-rest)',
      },
      '--card-shadow-hover': {
        description: 'Shadow on hover when interactive.',
        defaultValue: 'var(--component-card-shadow-hover)',
      },
      '--card-transition-duration': {
        description: 'Duration for hover transition.',
        defaultValue: 'var(--motion-duration-fast)',
      },
      '--card-transition-easing': {
        description: 'Easing for hover transition.',
        defaultValue: 'var(--motion-easing-standard)',
      },
      '--card-close-size': {
        description: 'Size applied to slotted close controls.',
        defaultValue: 'var(--component-close-control-size)',
      },
      '--card-text-color': {
        description: 'Text color applied within the card.',
        defaultValue: 'var(--box-model-text-primary)',
      },
    },
    cssParts: {
      surface: {
        description: 'Card container applying padding, border, and background.',
      },
      close: {
        description: 'Wrapper for the optional close control.',
      },
      header: {
        description: 'Header region when populated.',
      },
      body: {
        description: 'Body region for primary content.',
      },
      footer: {
        description: 'Footer region for metadata.',
      },
      actions: {
        description: 'Actions region aligned after the footer.',
      },
    },
    dependencies: {
      'close-control-box': {
        description: 'Optional dependency for dismissing the card via the `close-control` slot.',
        included: false,
      },
    },
  },
};

export default meta;

export const Canvas: Story = {
  render: ({ interactive, heading, body, footer, showCloseControl }) => html`
    <div style="max-width: 28rem;">
      <card-box ?interactive="${interactive}">
        <div slot="header">
          <h3 style="margin: 0;">${heading}</h3>
        </div>
        <p style="margin: 0;">${body}</p>
        <p slot="footer" style="margin: 0;">${footer}</p>
        <div slot="actions" style="display: flex; justify-content: flex-end;">
          <button-box>
            <button type="button">View details</button>
          </button-box>
        </div>
        ${showCloseControl
          ? html`<close-control-box
              slot="close-control"
              label="Dismiss card"
              style="--close-size: 1.25rem"
            ></close-control-box>`
          : null}
      </card-box>
    </div>
  `,
};
