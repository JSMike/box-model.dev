import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/list';

const meta: Docs = {
  component: 'list-box',
  title: 'Components/List box',
  argTypes: {
    ordered: {
      control: 'boolean',
      description: 'Render an ordered list when true',
    },
  },
  args: {
    ordered: false,
  },
  docs: {
    selector: 'list-box',
    className: 'List',
    attributes: {
      ordered: {
        type: 'boolean',
        description: 'Switches the list between ordered `<ol>` and unordered `<ul>` rendering.',
        defaultValue: false,
        options: [true, false],
      },
    },
    slots: {
      '': {
        description: 'List items (`<li>` elements) rendered inside the list.',
      },
    },
    cssProperties: {},
    cssParts: {
      list: {
        description: 'The rendered list element (`<ol>` or `<ul>`).',
      },
    },
    dependencies: {},
  },
};

export default meta;

const items = ['Enable monitoring', 'Review access controls', 'Schedule audit'];

export const Canvas: Story = {
  render: ({ ordered }) => html`
    <list-box ?ordered="${ordered}">
      ${items.map((item) => html`<li>${item}</li>`)}
    </list-box>
  `,
};
