import type { StoryObj as Story } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/status-icon';

const variants = ['info', 'success', 'warning', 'danger', 'custom'] as const;

const meta: Docs = {
  component: 'status-icon-box',
  title: 'Components/Status Icon',
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      description: 'Controls which preset colours and glyph are used.',
    },
    label: {
      control: 'text',
      description: 'Accessible label announced by assistive tech.',
    },
    icon: {
      control: 'text',
      description: 'Slot content shown when variant="custom".',
    },
    customStyle: {
      control: 'text',
      description:
        'CSS custom properties applied when variant="custom" (e.g. "--status-icon-color: rebeccapurple;").',
    },
  },
  args: {
    variant: 'info',
    label: 'Informational status',
    icon: '',
    customStyle: '',
  },
  docs: {
    selector: 'status-icon-box',
    className: 'StatusIcon',
    attributes: {
      variant: {
        type: 'StatusIconVariant',
        description: 'Preset styling for the glyph; set to "custom" to supply your own content.',
        defaultValue: 'info',
        options: variants,
      },
      label: {
        type: 'string',
        description: 'Accessible label applied to the glyph when using a preset variant.',
        defaultValue: '',
      },
    },
    slots: {
      '': {
        description: 'Custom glyph content used when `variant="custom"`.',
      },
    },
    cssProperties: {
      '--status-icon-color': {
        description: 'Foreground color of the glyph.',
        defaultValue: 'var(--box-model-feedback-info-icon)',
      },
      '--status-icon-background': {
        description: 'Background color of the icon surface.',
        defaultValue: 'var(--box-model-feedback-info-surface)',
      },
      '--status-icon-border-color': {
        description: 'Border color of the icon surface.',
        defaultValue: 'var(--box-model-feedback-info-border)',
      },
    },
    cssParts: {
      glyph: {
        description: 'The rendered glyph or slotted custom content container.',
      },
    },
    dependencies: {},
  },
};

export default meta;

export const Canvas: Story = {
  render: ({ variant, label, icon, customStyle }) => html`
    <status-icon-box
      variant="${variant}"
      label="${label}"
      style=${ifDefined(variant === 'custom' && customStyle ? customStyle : undefined)}
    >
      ${variant === 'custom' && icon ? html`${icon}` : nothing}
    </status-icon-box>
  `,
};
