import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/columns';
import '../card';

const meta: Docs = {
  component: 'columns-box',
  title: 'Components/Columns box',
  argTypes: {
    gap: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    minWidth: {
      control: 'text',
      name: 'min-width',
    },
  },
  args: {
    gap: 'md',
    minWidth: '15rem',
  },
  docs: {
    selector: 'columns-box',
    className: 'Columns',
    attributes: {
      gap: {
        type: 'ColumnsGap',
        description: 'Gap size between columns.',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
      },
      'min-width': {
        type: 'string',
        description: 'Minimum column width before wrapping.',
        defaultValue: '15rem',
      },
    },
    slots: {
      '': {
        description: 'Column content; each child becomes a column.',
      },
    },
    cssProperties: {
      '--columns-gap': {
        description: 'Gap between columns.',
        defaultValue: 'var(--space-scale-300)',
      },
      '--columns-min-width': {
        description: 'Minimum width for each column before wrapping.',
        defaultValue: '15rem',
      },
    },
    cssParts: {
      grid: {
        description: 'Grid container that lays out the columns.',
      },
    },
    dependencies: {},
  },
};

export default meta;

const templateCards = html`
  <card-box hoverable>
    <div slot="header"><h3>Card one</h3></div>
    <p>First card content.</p>
  </card-box>
  <card-box hoverable>
    <div slot="header"><h3>Card two</h3></div>
    <p>Second card content.</p>
  </card-box>
  <card-box hoverable>
    <div slot="header"><h3>Card three</h3></div>
    <p>Third card content.</p>
  </card-box>
`;

export const Canvas: Story = {
  render: ({ gap, minWidth }) =>
    html`<columns-box gap=${gap} min-width=${minWidth}>${templateCards}</columns-box>`,
};
