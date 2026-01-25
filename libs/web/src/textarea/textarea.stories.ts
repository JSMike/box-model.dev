import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/textarea';

const meta: Docs = {
  component: 'textarea-box',
  title: 'Components/Textarea box',
  argTypes: {
    fullwidth: { control: 'boolean' },
    value: { control: 'text', table: { disable: true } },
  },
  args: {
    fullwidth: true,
  },
  docs: {
    selector: 'textarea-box',
    className: 'Textarea',
    attributes: {
      fullwidth: {
        type: 'boolean',
        description: 'Expands the textarea to fill its container width.',
        defaultValue: false,
        options: [true, false],
      },
    },
    slots: {
      '': {
        description: 'Native `<textarea>` element to be styled.',
      },
    },
    cssProperties: {
      '--textarea-font-family': {
        description: 'Font family applied to the textarea.',
        defaultValue: 'var(--typography-roles-body-font-family)',
      },
      '--textarea-font-size': {
        description: 'Font size applied to the textarea.',
        defaultValue: 'var(--typography-roles-body-font-size)',
      },
      '--textarea-font-weight': {
        description: 'Font weight applied to the textarea.',
        defaultValue: 'var(--typography-roles-body-font-weight)',
      },
      '--textarea-line-height': {
        description: 'Line height applied to the textarea.',
        defaultValue: 'var(--typography-roles-body-line-height)',
      },
      '--textarea-letter-spacing': {
        description: 'Letter spacing applied to the textarea.',
        defaultValue: 'var(--typography-roles-body-letter-spacing)',
      },
      '--textarea-text-color': {
        description: 'Text color for textarea content.',
        defaultValue: 'var(--box-model-text-primary)',
      },
      '--textarea-background': {
        description: 'Background color of the textarea.',
        defaultValue: 'var(--box-model-background-elevated)',
      },
      '--textarea-border-color': {
        description: 'Border color at rest.',
        defaultValue: 'var(--box-model-border-default)',
      },
      '--textarea-border-color-hover': {
        description: 'Border color on hover.',
        defaultValue: 'var(--box-model-border-strong)',
      },
      '--textarea-border-color-focus': {
        description: 'Border color on focus.',
        defaultValue: 'var(--box-model-border-focus)',
      },
      '--textarea-border-radius': {
        description: 'Corner radius of the textarea (square by design).',
        defaultValue: '0',
      },
      '--textarea-border-width': {
        description: 'Border width for the textarea outline.',
        defaultValue: '1px',
      },
      '--textarea-padding-block': {
        description: 'Block padding inside the textarea.',
        defaultValue: 'var(--space-scale-125)',
      },
      '--textarea-padding-inline': {
        description: 'Inline padding inside the textarea.',
        defaultValue: 'var(--space-scale-150)',
      },
      '--textarea-min-height': {
        description: 'Minimum height of the textarea.',
        defaultValue: '6rem',
      },
      '--textarea-transition-duration': {
        description: 'Duration for interactive transitions.',
        defaultValue: 'var(--motion-interaction-press-duration)',
      },
      '--textarea-transition-easing': {
        description: 'Easing for interactive transitions.',
        defaultValue: 'var(--motion-interaction-press-easing)',
      },
      '--textarea-focus-shadow': {
        description: 'Shadow applied when the textarea is focused.',
        defaultValue: 'var(--shadow-glow-focus)',
      },
      '--textarea-placeholder-color': {
        description: 'Color of placeholder text.',
        defaultValue: 'var(--box-model-text-tertiary)',
      },
    },
    cssParts: {},
    dependencies: {},
  },
};

export default meta;

export const Canvas: Story = {
  args: {
    fullwidth: true,
  },
  render: ({ fullwidth }) => html`
    <textarea-box ?fullwidth=${fullwidth}>
      <textarea placeholder="Write something..."></textarea>
    </textarea-box>
  `,
};
