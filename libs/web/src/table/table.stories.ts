import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/table';

type ZebraControl = 'none' | 'surface' | 'border' | 'padding' | 'content' | 'margin';

type Story = StoryObj<{ zebra: ZebraControl }>;

const zebraOptions: ZebraControl[] = ['none', 'surface', 'border', 'padding', 'content', 'margin'];

const meta: Docs = {
  component: 'table-box',
  title: 'Components/Table box',
  argTypes: {
    zebra: {
      options: zebraOptions,
      control: { type: 'select' },
      description: 'Semantic zebra background; set to "none" to disable striping.',
      table: {
        category: 'Attributes',
      },
    },
  },
  docs: {
    selector: 'table-box',
    className: 'Table',
    attributes: {
      zebra: {
        type: "'surface' | 'border' | 'padding' | 'content' | 'margin'",
        description: 'Applies zebra striping to table rows using different layout layers.',
        defaultValue: undefined,
        options: zebraOptions.filter((option) => option !== 'none'),
      },
    },
    slots: {
      '': {
        description: 'Holds a native `<table>`; the component adds styling via the `data-table-box` attribute.',
      },
    },
    cssProperties: {
      '--table-background': {
        description: 'Background color for the table wrapper.',
        defaultValue: 'var(--box-model-background-surface)',
      },
      '--table-header-background': {
        description: 'Background color for table headers.',
        defaultValue: 'var(--table-section-background)',
      },
      '--table-footer-background': {
        description: 'Background color for table footers.',
        defaultValue: 'var(--table-section-background)',
      },
      '--table-header-text': {
        description: 'Text color for table headers.',
        defaultValue: 'var(--box-model-text-primary)',
      },
      '--table-body-text': {
        description: 'Text color for table body rows.',
        defaultValue: 'var(--box-model-text-primary)',
      },
      '--table-row-border': {
        description: 'Border color used between rows.',
        defaultValue: 'var(--box-model-border-subtle)',
      },
      '--table-row-hover': {
        description: 'Background color applied when hovering rows.',
        defaultValue: 'var(--box-model-background-content)',
      },
      '--table-cell-padding': {
        description: 'Padding applied to header and data cells.',
        defaultValue: 'var(--component-table-cell-padding)',
      },
      '--table-border-width': {
        description: 'Border width used for the table outline and row separators.',
        defaultValue: 'var(--component-table-border-width)',
      },
      '--table-row-base': {
        description: 'Base background color for rows.',
        defaultValue: 'var(--box-model-background-canvas)',
      },
      '--table-row-zebra': {
        description: 'Alternate background color applied when zebra striping is enabled.',
        defaultValue: 'transparent',
      },
    },
    cssParts: {},
    dependencies: {},
  },
};

export default meta;

export const Canvas: Story = {
  args: {
    zebra: 'none',
  },
  render: ({ zebra }) => html`
    <table-box zebra=${ifDefined(zebra === 'none' ? undefined : zebra)}>
      <table>
        <colgroup>
          <col style="width: 50%" />
          <col style="width: 25%" />
          <col style="width: 25%" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Uptime</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Instance A</td>
            <td>Running</td>
            <td>4 days</td>
          </tr>
          <tr>
            <td>Instance B</td>
            <td>Degraded</td>
            <td>2 days</td>
          </tr>
          <tr>
            <td>Instance C</td>
            <td>Stopped</td>
            <td>3 hrs</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">3 instances total</td>
          </tr>
        </tfoot>
      </table>
    </table-box>
  `,
};
