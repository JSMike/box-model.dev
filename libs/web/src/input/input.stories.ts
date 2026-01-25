import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/input';

const meta: Docs = {
  component: 'input-box',
  title: 'Components/Input box',
  argTypes: {
    fullwidth: {
      control: 'boolean',
      description: 'Stretch the input to fill its container width',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    value: {
      control: 'text',
      description: 'Initial value for the input element',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input element',
    },
    readonly: {
      control: 'boolean',
      description: 'Render input as read-only',
    },
  },
  args: {
    fullwidth: false,
    placeholder: 'Enter text',
    value: '',
    disabled: false,
    readonly: false,
  },
  docs: {
    selector: 'input-box',
    className: 'Input',
    attributes: {
      fullwidth: {
        type: 'boolean',
        description: 'Expands the component to the full width of its container.',
        defaultValue: false,
        options: [true, false],
      },
    },
    slots: {
      '': {
        description: 'Form control element (input/textarea/select) to be styled.',
      },
    },
    cssProperties: {
      '--input-font-family': {
        description: 'Font family applied to the slotted control.',
        defaultValue: 'var(--typography-roles-body-font-family)',
      },
      '--input-font-size': {
        description: 'Font size applied to the control.',
        defaultValue: 'var(--typography-roles-body-font-size)',
      },
      '--input-font-weight': {
        description: 'Font weight applied to the control.',
        defaultValue: 'var(--typography-roles-body-font-weight)',
      },
      '--input-line-height': {
        description: 'Line height applied to the control.',
        defaultValue: 'var(--typography-roles-body-line-height)',
      },
      '--input-letter-spacing': {
        description: 'Letter spacing applied to the control.',
        defaultValue: 'var(--typography-roles-body-letter-spacing)',
      },
      '--input-background': {
        description: 'Background color of the control.',
        defaultValue: 'var(--box-model-background-elevated)',
      },
      '--input-background-read-only': {
        description: 'Background color when the control is readonly.',
        defaultValue: 'var(--box-model-background-surface)',
      },
      '--input-border-radius': {
        description: 'Corner radius of the control (square by design).',
        defaultValue: 'var(--component-input-border-radius)',
      },
      '--input-border-width': {
        description: 'Border width for the control outline.',
        defaultValue: 'var(--component-input-border-width)',
      },
      '--input-border-color': {
        description: 'Border color at rest.',
        defaultValue: 'var(--box-model-border-default)',
      },
      '--input-border-color-hover': {
        description: 'Border color on hover.',
        defaultValue: 'var(--box-model-border-strong)',
      },
      '--input-border-color-focus': {
        description: 'Border color when focused.',
        defaultValue: 'var(--box-model-border-focus)',
      },
      '--input-padding-block': {
        description: 'Block padding inside the control.',
        defaultValue: 'var(--component-input-padding-block)',
      },
      '--input-padding-inline': {
        description: 'Inline padding inside the control.',
        defaultValue: 'var(--component-input-padding-inline)',
      },
      '--input-min-height': {
        description: 'Minimum height of the control.',
        defaultValue: 'var(--component-input-min-height)',
      },
      '--input-text-color': {
        description: 'Text color for input content.',
        defaultValue: 'var(--box-model-text-primary)',
      },
      '--input-placeholder-color': {
        description: 'Color of placeholder text.',
        defaultValue: 'var(--box-model-text-tertiary)',
      },
      '--input-icon-color': {
        description: 'Color for any inline icons within the control.',
        defaultValue: 'var(--component-input-icon)',
      },
      '--input-focus-shadow': {
        description: 'Shadow applied when the control is focused.',
        defaultValue: 'var(--component-input-focus-shadow)',
      },
      '--input-disabled-background': {
        description: 'Background color when disabled.',
        defaultValue: 'var(--component-input-disabled-background)',
      },
      '--input-disabled-text': {
        description: 'Text color when disabled.',
        defaultValue: 'var(--component-input-disabled-text)',
      },
      '--input-disabled-border-color': {
        description: 'Border color when disabled.',
        defaultValue: 'var(--component-input-disabled-border-color)',
      },
      '--input-transition-duration': {
        description: 'Duration for interactive transitions.',
        defaultValue: 'var(--motion-duration-fast)',
      },
      '--input-transition-easing': {
        description: 'Easing curve for interactive transitions.',
        defaultValue: 'var(--motion-easing-standard)',
      },
    },
    cssParts: {},
    dependencies: {},
  },
};

export default meta;

export const Canvas: Story = {
  render: ({ fullwidth, placeholder, value, disabled, readonly }) => html`
    <input-box ?fullwidth="${fullwidth}">
      <input
        type="text"
        placeholder="${placeholder}"
        value="${value}"
        ?disabled="${disabled}"
        ?readonly="${readonly}"
      />
    </input-box>
  `,
};
