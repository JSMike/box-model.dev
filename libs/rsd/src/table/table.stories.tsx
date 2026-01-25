import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Table, type TableProps, type ZebraMode } from './table';

const zebraOptions: ZebraMode[] = ['none', 'surface', 'border', 'padding', 'content', 'margin'];

const meta: Docs = {
  title: 'Components/Table',
  component: Table,
  argTypes: {
    zebra: {
      options: zebraOptions,
      control: { type: 'select' },
      description: 'Enable zebra striping (any option except "none").',
    },
  },
  args: {
    zebra: 'none',
  },
  docs: {
    className: 'Table',
    attributes: {
      zebra: {
        type: "'surface' | 'border' | 'padding' | 'content' | 'margin'",
        description: 'Applies zebra striping to rows.',
        defaultValue: undefined,
        options: zebraOptions.filter((option) => option !== 'none'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const columns = ['Name', 'Status', 'Uptime'];
const rows: TableProps['rows'] = [
  ['Instance A', 'Running', '4 days'],
  ['Instance B', 'Degraded', '2 days'],
  ['Instance C', 'Stopped', '3 hrs'],
];

export const Canvas: Story = {
  render: (args: TableProps) => (
    <Table {...args} columns={columns} rows={rows} footer="3 instances total" />
  ),
};
