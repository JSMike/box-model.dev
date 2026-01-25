import type { StoryObj as Story } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/drawer';
import type { Drawer } from '@box-model/web/drawer';
import '@box-model/web/button';
import '@box-model/web/close-control';

const placements = ['right', 'left', 'top', 'bottom'] as const;

const meta: Docs = {
  component: 'drawer-box',
  title: 'Components/Drawer box',
  argTypes: {
    placement: {
      control: 'select',
      options: placements,
      description: 'Edge of the viewport the drawer should anchor to.',
    },
    noBackdropClose: {
      control: 'boolean',
      description: 'Prevents backdrop clicks from closing the drawer when true.',
    },
    heading: {
      control: 'text',
      description: 'Optional heading',
    },
    body: {
      control: 'text',
      description: 'Drawer body content',
    },
    showCloseControl: {
      control: 'boolean',
      description: 'Adds a `<close-control-box>` via the header slot.',
    },
  },
  args: {
    placement: 'right',
    noBackdropClose: false,
    heading: 'Filters',
    body: 'Adjust filters and hit apply to refine the results.',
    showCloseControl: true,
  },
  docs: [
    {
      selector: 'drawer-box',
      className: 'Drawer',
      attributes: {
        open: {
          type: 'boolean',
          description: 'Controls whether the drawer is shown.',
          defaultValue: false,
          options: [true, false],
        },
        'no-backdrop-close': {
          type: 'boolean',
          description: 'Prevents closing when the user clicks the backdrop or presses Escape.',
          defaultValue: false,
          options: [true, false],
        },
        placement: {
          type: 'DrawerPlacement',
          description: 'Edge of the viewport the drawer anchors to.',
          defaultValue: 'right',
          options: placements,
        },
      },
      events: {
        close: {
          description: 'Emitted when the drawer closes (via close control or backdrop).',
          detail: 'void',
        },
      },
      slots: {
        heading: {
          description: 'Heading content for the drawer.',
        },
        '': {
          description: 'Main drawer body content.',
        },
        actions: {
          description: 'Footer actions aligned at the bottom.',
        },
        'close-control': {
          description: 'Optional custom close control element.',
        },
      },
      cssProperties: {
        '--drawer-size': {
          description: 'Width or height of the drawer, depending on placement.',
          defaultValue: '20rem',
        },
      },
      cssParts: {
        header: {
          description: 'Header region containing the heading slot and close control.',
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
        panel: {
          description: 'Outer panel element inside the dialog.',
        },
      },
      dependencies: {
        'drawer-header-box': {
          description: 'Optional helper for header layout.',
          included: true,
        },
        'close-control-box': {
          description: 'Optional close control via the `close-control` slot.',
          included: false,
        },
      },
    },
    {
      selector: 'drawer-header-box',
      className: 'DrawerHeader',
      slots: {
        '': {
          description: 'Header content rendered inside the drawer header region.',
        },
      },
    },
  ],
};

export default meta;

export const Canvas: Story = {
  render: ({ placement, noBackdropClose, heading, body, showCloseControl }) => {
    const drawerRef = createRef<Drawer>();
    const openDrawer = () => {
      if (drawerRef.value) {
        drawerRef.value.open = true;
      }
    };

    return html`
      <button-box>
        <button type="button" @click=${openDrawer}>Open drawer</button>
      </button-box>
      <drawer-box
        ${ref(drawerRef)}
        placement=${placement}
        ?no-backdrop-close=${noBackdropClose}
      >
        ${heading
          ? html`<drawer-header-box slot="heading"><h2>${heading}</h2></drawer-header-box>`
          : nothing}
        <p>${body}</p>
        <div slot="actions">
          <button-box>
            <button type="button">Apply</button>
          </button-box>
        </div>
        ${showCloseControl
          ? html`<close-control-box
              slot="close-control"
              label="Close drawer"
              style="--close-size: 1.25rem"
            ></close-control-box>`
          : nothing}
      </drawer-box>
    `;
  },
};
