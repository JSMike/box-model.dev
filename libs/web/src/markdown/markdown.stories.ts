import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/markdown';

const defaultContent = `# Markdown box

Render markdown inside the design system.

[Primary link](https://example.com){variant="primary" size="md"}

[CTA button link](https://example.com/cta){type="button" variant="secondary" size="large"}

:::alert variant="success"
This _alert_ container attempts to use \`alert-box\`.
:::

:::card
Cards can wrap arbitrary markdown content.
:::

:::divider
:::

::::columns gap="md" min-width="15rem"
:::card
First card in a grid.
:::
:::card
Second card in a grid.
:::
:::card
Third card in a grid.
:::
::::
`;

const meta: Docs = {
  component: 'markdown-box',
  title: 'Components/Markdown box',
  argTypes: {
    content: {
      control: 'text',
      description: 'Raw markdown passed through the default slot',
    },
  },
  args: {
    content: defaultContent,
  },
  docs: {
    selector: 'markdown-box',
    className: 'Markdown',
    attributes: {
      linkify: {
        type: 'boolean',
        description: 'Automatically turn plain URLs into links.',
        defaultValue: true,
        options: [true, false],
      },
    },
    slots: {
      '': {
        description: 'Raw markdown text supplied via the default slot.',
      },
    },
    cssProperties: {},
    cssParts: {
      content: {
        description: 'Rendered markdown container.',
      },
    },
    dependencies: {
      'alert-box': {
        description: 'Registers the alert container via `:::alert`.',
        included: true,
      },
      'banner-box': {
        description: 'Registers the banner container via `:::banner`.',
        included: true,
      },
      'button-box': {
        description: 'Wraps links when `type="button"` is provided.',
        included: true,
      },
      'card-box': {
        description: 'Registers the card container via `:::card`.',
        included: true,
      },
      'columns-box': {
        description: 'Registers the columns container via `::::columns`.',
        included: true,
      },
      'divider-box': {
        description: 'Registers the divider container via `:::divider`.',
        included: true,
      },
      'link-box': {
        description: 'Wraps markdown links by default.',
        included: true,
      },
      'stat-box': {
        description: 'Registers the stat container via `:::stat`.',
        included: true,
      },
      'tooltip-box': {
        description: 'Registers the tooltip container via `:::tooltip`.',
        included: true,
      },
    },
  },
};

export default meta;

export const Canvas: Story = {
  render: ({ content }) => html`<markdown-box>${content}</markdown-box>`,
};
