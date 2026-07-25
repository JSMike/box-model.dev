import type { StoryObj as Story } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/dialog';
import type { Dialog } from '@box-model/web/dialog';
import '@box-model/web/close-control';
import '@box-model/web/button';

const meta: Docs = {
  component: 'dialog-box',
  title: 'Components/Dialog box',
  argTypes: {
    noBackdropClose: {
      control: 'boolean',
      description: 'Prevents backdrop clicks from closing the dialog when true.',
    },
    showCloseControl: {
      control: 'boolean',
      description: 'Adds a `<close-control-box>` via the `close-control` slot.',
    },
    heading: {
      control: 'text',
      description: 'Dialog heading content',
    },
    body: {
      control: 'text',
      description: 'Dialog body content',
    },
    primaryAction: {
      control: 'text',
      description: 'Primary action label',
    },
  },
  args: {
    noBackdropClose: false,
    showCloseControl: true,
    heading: 'Invite team member',
    body: 'Send an invite to collaborate on this workspace.',
    primaryAction: 'Send invite',
  },
  docs: [
    {
      selector: 'dialog-box',
      className: 'Dialog',
      attributes: {
        open: {
          type: 'boolean',
          description: 'Controls whether the dialog is shown.',
          defaultValue: false,
          options: [true, false],
        },
        'no-backdrop-close': {
          type: 'boolean',
          description: 'Prevents closing when the user clicks the backdrop or presses Escape.',
          defaultValue: false,
          options: [true, false],
        },
      },
      events: {
        close: {
          description: 'Emitted when the dialog closes (via close control or backdrop).',
          detail: 'void',
        },
      },
      slots: {
        header: {
          description: 'Heading content for the dialog.',
        },
        '': {
          description: 'Main dialog body content.',
        },
        footer: {
          description: 'Footer actions or metadata.',
        },
        'close-control': {
          description: 'Optional custom close control element.',
        },
      },
      cssProperties: {
        '--dialog-width': {
          description: 'Width of the dialog surface.',
          defaultValue: 'auto',
        },
        '--dialog-max-width': {
          description: 'Maximum width of the dialog surface.',
          defaultValue: '32rem',
        },
      },
      cssParts: {
        header: {
          description: 'Header region containing the header slot and close control.',
        },
        close: {
          description: 'Wrapper for the optional close control.',
        },
        body: {
          description: 'Body region for primary content.',
        },
        footer: {
          description: 'Footer region for actions.',
        },
      },
      dependencies: {
        'dialog-header-box': {
          description: 'Optional helper for header layout.',
          included: true,
        },
        'dialog-footer-box': {
          description: 'Optional helper for footer layout.',
          included: true,
        },
        'close-control-box': {
          description: 'Optional close control via the `close-control` slot.',
          included: false,
        },
      },
    },
    {
      selector: 'dialog-header-box',
      className: 'DialogHeader',
      slots: {
        '': {
          description: 'Header content rendered inside the dialog header region.',
        },
      },
    },
    {
      selector: 'dialog-footer-box',
      className: 'DialogFooter',
      slots: {
        '': {
          description: 'Footer content rendered inside the dialog footer region.',
        },
      },
    },
  ],
};

export default meta;

export const Canvas: Story = {
  render: ({ noBackdropClose, showCloseControl, heading, body, primaryAction }) => {
    const dialogRef = createRef<Dialog>();
    const openDialog = () => {
      if (dialogRef.value) {
        dialogRef.value.open = true;
      }
    };

    return html`
      <button-box>
        <button type="button" @click=${openDialog}>Open dialog</button>
      </button-box>
      <dialog-box ${ref(dialogRef)} ?no-backdrop-close=${noBackdropClose}>
        ${heading
          ? html`<dialog-header-box slot="header"><h2>${heading}</h2></dialog-header-box>`
          : nothing}
        <p>${body}</p>
        ${primaryAction
          ? html`<dialog-footer-box slot="footer">
              <button-box>
                <button type="button">${primaryAction}</button>
              </button-box>
            </dialog-footer-box>`
          : nothing}
        ${showCloseControl
          ? html`<close-control-box
              slot="close-control"
              label="Close dialog"
              style="--close-control-size: 1.25rem"
            ></close-control-box>`
          : nothing}
      </dialog-box>
    `;
  },
};
