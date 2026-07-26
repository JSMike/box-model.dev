import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/select';

const meta: Docs = {
  component: 'select-box',
  title: 'Components/Select box',
  argTypes: {
    fullwidth: {
      control: 'boolean',
      description: 'Expands the select to fill its container width.',
    },
  },
  args: {
    fullwidth: false,
  },
  docs: {
    selector: 'select-box',
    className: 'Select',
    attributes: {
      fullwidth: {
        type: 'boolean',
        description: 'Expands the select to fill its container width.',
        defaultValue: false,
        options: [true, false],
      },
    },
    slots: {
      '': {
        description: 'Native `<select>` element to be styled.',
      },
    },
    cssProperties: {
      '--select-font-family': {
        description: 'Font family applied to the select control.',
        defaultValue: 'var(--typography-roles-body-font-family)',
      },
      '--select-font-size': {
        description: 'Font size applied to the select control.',
        defaultValue: 'var(--typography-roles-body-font-size)',
      },
      '--select-font-weight': {
        description: 'Font weight applied to the select control.',
        defaultValue: 'var(--typography-roles-body-font-weight)',
      },
      '--select-line-height': {
        description: 'Line height applied to the select control.',
        defaultValue: 'var(--typography-roles-body-line-height)',
      },
      '--select-letter-spacing': {
        description: 'Letter spacing applied to the select control.',
        defaultValue: 'var(--typography-roles-body-letter-spacing)',
      },
      '--select-background': {
        description: 'Background color of the select.',
        defaultValue: 'var(--box-model-background-elevated)',
      },
      '--select-border-radius': {
        description: 'Corner radius of the select (square by design).',
        defaultValue: 'var(--component-input-border-radius)',
      },
      '--select-border-width': {
        description: 'Border width for the select outline.',
        defaultValue: 'var(--component-input-border-width)',
      },
      '--select-border-color': {
        description: 'Border color at rest.',
        defaultValue: 'var(--box-model-border-default)',
      },
      '--select-border-color-hover': {
        description: 'Border color on hover.',
        defaultValue: 'var(--box-model-border-strong)',
      },
      '--select-border-color-focus': {
        description: 'Border color on focus.',
        defaultValue: 'var(--box-model-border-focus)',
      },
      '--select-padding-block': {
        description: 'Block padding inside the select.',
        defaultValue: 'var(--component-input-padding-block)',
      },
      '--select-padding-inline': {
        description: 'Inline padding before the caret.',
        defaultValue: 'var(--component-input-padding-inline)',
      },
      '--select-min-height': {
        description: 'Minimum height of the select control.',
        defaultValue: 'var(--component-input-min-height)',
      },
      '--select-text-color': {
        description: 'Text color for selected option.',
        defaultValue: 'var(--box-model-text-primary)',
      },
      '--select-icon-color': {
        description: 'Color of the dropdown caret.',
        defaultValue: 'var(--box-model-text-primary)',
      },
      '--select-icon-space': {
        description: 'Inline space reserved for the caret.',
        defaultValue: '1.5rem',
      },
      '--select-disabled-background': {
        description: 'Background color when disabled.',
        defaultValue: 'var(--component-input-disabled-background)',
      },
      '--select-disabled-text': {
        description: 'Text color when disabled.',
        defaultValue: 'var(--component-input-disabled-text)',
      },
      '--select-disabled-border-color': {
        description: 'Border color when disabled.',
        defaultValue: 'var(--component-input-disabled-border-color)',
      },
      '--select-transition-duration': {
        description: 'Duration for interactive transitions.',
        defaultValue: 'var(--motion-duration-fast)',
      },
      '--select-transition-easing': {
        description: 'Easing for interactive transitions.',
        defaultValue: 'var(--motion-easing-standard)',
      },
    },
    cssParts: {},
    dependencies: {},
  },
};

export default meta;

export const Canvas: Story = {
  render: ({ fullwidth }) => html`
    <label for="select-box-example">Choose an option</label>
    <select-box ?fullwidth=${fullwidth}>
      <select id="select-box-example">
        <option value="">Choose an option</option>
        <option value="alpha">Alpha</option>
        <option value="beta">Beta</option>
        <option value="gamma">Gamma</option>
      </select>
    </select-box>
  `,
};
