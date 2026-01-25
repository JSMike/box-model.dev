import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/toolbar';

const meta: Docs = {
  component: 'toolbar-box',
  title: 'Components/Toolbar box',
  argTypes: {},
  args: {},
  docs: {
    selector: 'toolbar-box',
    className: 'Toolbar',
    slots: {
      '': {
        description: 'Toolbar contents (buttons, inputs, etc.).',
      },
    },
    cssProperties: {
      '--toolbar-background': {
        description: 'Background color of the toolbar.',
        defaultValue: 'var(--box-model-background-elevated)',
      },
      '--toolbar-border-color': {
        description: 'Border color of the toolbar.',
        defaultValue: 'var(--box-model-border-strong)',
      },
      '--toolbar-text-color': {
        description: 'Text color applied within the toolbar.',
        defaultValue: 'var(--box-model-text-primary)',
      },
    },
    cssParts: {
      surface: {
        description: 'Flex container for toolbar content.',
      },
    },
    dependencies: {},
  },
};

export default meta;

export const Canvas: Story = {
  render: () => html`
    <toolbar-box>
      <button type="button" aria-label="Bold"><strong>B</strong></button>
      <button type="button" aria-label="Italic"><em>I</em></button>
      <button type="button" aria-label="Heading">H2</button>
    </toolbar-box>
  `,
};
