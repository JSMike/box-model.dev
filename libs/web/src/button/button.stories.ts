import type { StoryObj as Story } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/button';

const meta: Docs = {
  component: 'button-box',
  title: 'Components/Button box',
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'The variant of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    label: { control: 'text', description: 'The label of the button' }
  },
  args: {
    variant: 'primary',
    size: 'medium',
    label: 'Button'
  },
  docs: {
    selector: 'button-box',
    className: 'Button',
    attributes: {
      variant: {
        type: 'ButtonVariant',
        description: 'The variant of the button',
        defaultValue: 'primary',
        options: ['primary', 'secondary', 'tertiary'],
      },
      size: {
        type: 'ButtonSize',
        description: 'The size of the button',
        defaultValue: 'medium',
        options: ['small', 'medium', 'large'],
      },
    },
    slots: {
      '': {
        description: 'Wraps the actionable element (e.g., `<button>` or `<a>`).',
      },
    },
    cssProperties: {
      '--button-padding': {
        description: 'Inline and block padding for the slotted button.',
        defaultValue: 'var(--component-button-padding-md)',
      },
      '--button-font-size': {
        description: 'Font size applied to the slotted button.',
        defaultValue: 'var(--component-button-font-size-md)',
      },
      '--button-font-family': {
        description: 'Font family applied to the slotted button.',
        defaultValue: 'var(--component-button-font-family)',
      },
      '--button-font-weight': {
        description: 'Font weight applied to the slotted button.',
        defaultValue: 'var(--component-button-font-weight)',
      },
      '--button-letter-spacing': {
        description: 'Letter spacing applied to the slotted button.',
        defaultValue: 'var(--component-button-letter-spacing)',
      },
      '--button-line-height': {
        description: 'Line height applied to the slotted button.',
        defaultValue: 'var(--component-button-line-height)',
      },
      '--button-border-radius': {
        description: 'Corner radius of the slotted button (square by default).',
        defaultValue: '0',
      },
      '--button-min-height': {
        description: 'Minimum height of the slotted button.',
        defaultValue: 'var(--component-button-min-height-md)',
      },
      '--button-gap': {
        description: 'Gap between inline contents of the slotted button.',
        defaultValue: 'var(--component-button-gap)',
      },
      '--button-bg-color': {
        description: 'Background color in the resting state.',
        defaultValue: 'var(--box-model-primary-rest)',
      },
      '--button-hover-bg-color': {
        description: 'Background color on hover.',
        defaultValue: 'var(--box-model-primary-hover)',
      },
      '--button-active-bg-color': {
        description: 'Background color on active/pressed state.',
        defaultValue: 'var(--box-model-primary-active)',
      },
      '--button-text-color': {
        description: 'Text color for the slotted button.',
        defaultValue: 'var(--box-model-primary-text)',
      },
      '--button-focus-ring-color': {
        description: 'Color of the focus outline.',
        defaultValue: 'var(--box-model-primary-focus-ring)',
      },
      '--button-focus-ring-width': {
        description: 'Width of the focus outline.',
        defaultValue: 'var(--component-button-focus-ring-width)',
      },
      '--button-focus-ring-offset': {
        description: 'Offset distance for the focus outline.',
        defaultValue: 'var(--component-button-focus-offset)',
      },
      '--button-focus-ring-shadow': {
        description: 'Shadow applied when the button is focus-visible.',
        defaultValue: 'var(--component-button-focus-ring-shadow)',
      },
      '--button-transition-duration': {
        description: 'Duration for color transitions.',
        defaultValue: 'var(--component-button-transition-duration)',
      },
      '--button-transition-easing': {
        description: 'Easing for color transitions.',
        defaultValue: 'var(--component-button-transition-easing)',
      },
      '--button-disabled-bg-color': {
        description: 'Background color for disabled state.',
        defaultValue: 'var(--box-model-disabled-background)',
      },
      '--button-disabled-text-color': {
        description: 'Text color for disabled state.',
        defaultValue: 'var(--box-model-disabled-text)',
      },
    },
    cssParts: {},
    dependencies: {},
  },
};

export default meta;

export const Canvas: Story = {
  render: (args) => {
    const { variant, size, label } = args;
    return html`
      <button-box 
        variant="${variant !== 'primary' ? variant : nothing}"
        size="${size !== 'medium' ? size : nothing}">
        <button type="button">${label}</button>
      </button-box>`;
  }
};
