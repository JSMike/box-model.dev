import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { css, html } from 'react-strict-dom';
import { Columns, type ColumnsGap, type ColumnsMinWidth } from './columns';
import { Card } from '../card';

const gaps: ColumnsGap[] = ['sm', 'md', 'lg'];
const minWidths: ColumnsMinWidth[] = ['sm', 'md', 'lg'];

const cardStyles = css.create({
  title: {
    fontWeight: 600,
    marginBottom: '0.25rem',
  },
});

const meta: Docs = {
  title: 'Components/Columns',
  component: Columns,
  argTypes: {
    gap: { control: 'select', options: gaps, description: 'Gap between columns' },
    minWidth: { control: 'select', options: minWidths, description: 'Minimum column width before wrapping' },
  },
  args: {
    gap: 'md',
    minWidth: 'md',
  },
  docs: {
    className: 'Columns',
    attributes: {
      gap: { type: 'ColumnsGap', description: 'Gap size between columns', defaultValue: 'md', options: gaps },
      minWidth: { type: 'ColumnsMinWidth', description: 'Minimum column width', defaultValue: 'md', options: minWidths },
    },
    slots: { '': { description: 'Column content; each child becomes a column.' } },
  },
};

export default meta;
type Story = StoryObj<typeof Columns>;

const sampleCards = (
  <>
    <Card>
      <html.div style={cardStyles.title}>Card one</html.div>
      <html.div>First card content.</html.div>
    </Card>
    <Card>
      <html.div style={cardStyles.title}>Card two</html.div>
      <html.div>Second card content.</html.div>
    </Card>
    <Card>
      <html.div style={cardStyles.title}>Card three</html.div>
      <html.div>Third card content.</html.div>
    </Card>
  </>
);

export const Canvas: Story = {
  render: ({ gap, minWidth }) => (
    <Columns gap={gap} minWidth={minWidth}>
      {sampleCards}
    </Columns>
  ),
};
