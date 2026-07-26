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

~~~html
<alert-box variant="success">
  Ready to ship.
</alert-box>
~~~

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
      description:
        'Markdown passed through the default slot; raw HTML is escaped',
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
        description:
          'Markdown text supplied via the default slot. Raw HTML and unsupported attributes are not rendered.',
      },
    },
    cssProperties: {
      '--markdown-code-shadow': {
        description:
          'Offset shadow passed to the shared surface frame used by fenced code blocks.',
        defaultValue: 'var(--box-model-shadow-offset-sm)',
      },
    },
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
