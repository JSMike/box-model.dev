import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/tag';

const variants = ['neutral', 'info', 'success', 'warning', 'danger'] as const;

const meta: Docs = {
  component: 'tag-box',
  title: 'Components/Tag box',
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      description: 'Visual intent of the tag',
    },
    label: {
      control: 'text',
      description: 'Tag label text',
    },
  },
  args: {
    variant: 'neutral',
    label: 'Label',
  },
  docs: {
    selector: 'tag-box',
    className: 'Tag',
    attributes: {
      variant: {
        type: 'TagVariant',
        description: 'Visual intent of the tag.',
        defaultValue: 'neutral',
        options: variants,
      },
    },
    slots: {
      '': {
        description: 'Tag label content.',
      },
    },
    cssProperties: {
      '--tag-background': {
        description: 'Background color of the tag.',
        defaultValue: 'var(--component-tag-neutral-background)',
      },
      '--tag-text-color': {
        description: 'Text color inside the tag.',
        defaultValue: 'var(--component-tag-neutral-text)',
      },
      '--tag-border-color': {
        description: 'Border color of the tag.',
        defaultValue: 'var(--component-tag-neutral-border)',
      },
      '--tag-border-width': {
        description: 'Border width of the tag.',
        defaultValue: 'var(--size-border-width-hairline)',
      },
      '--tag-radius': {
        description: 'Corner radius of the tag (kept square).',
        defaultValue: 'var(--component-tag-radius)',
      },
      '--tag-gap': {
        description: 'Gap between slotted items inside the tag.',
        defaultValue: 'var(--component-tag-gap)',
      },
      '--tag-padding': {
        description: 'Inline and block padding for the tag surface.',
        defaultValue: 'var(--component-tag-padding)',
      },
      '--tag-font-family': {
        description: 'Font family for tag text.',
        defaultValue: 'var(--typography-roles-caption-font-family)',
      },
      '--tag-font-size': {
        description: 'Font size for tag text.',
        defaultValue: 'var(--typography-roles-caption-font-size)',
      },
      '--tag-font-weight': {
        description: 'Font weight for tag text.',
        defaultValue: 'var(--typography-roles-caption-font-weight)',
      },
      '--tag-line-height': {
        description: 'Line height for tag text.',
        defaultValue: 'var(--typography-roles-caption-line-height)',
      },
      '--tag-letter-spacing': {
        description: 'Letter spacing for tag text.',
        defaultValue: 'var(--typography-roles-caption-letter-spacing)',
      },
      '--tag-text-transform': {
        description:
          'Text transform applied to tag text. Authored casing is preserved by default.',
        defaultValue: 'none',
      },
    },
    cssParts: {},
    dependencies: {},
  },
};

export default meta;

export const Canvas: Story = {
  render: ({ variant, label }) => html`
    <tag-box variant="${variant}">
      <span>${label}</span>
    </tag-box>
  `,
};
