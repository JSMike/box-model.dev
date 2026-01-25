import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/badge';

const meta: Docs = {
  component: 'badge-box',
  title: 'Components/Badge box',
  argTypes: {
    label: {
      control: 'text',
      description: 'Badge label text',
    },
  },
  args: {
    label: 'New',
  },
  docs: {
    selector: 'badge-box',
    className: 'Badge',
    attributes: {},
    slots: {
      '': {
        description: 'Badge label content.',
      },
    },
    cssProperties: {
      '--badge-background': {
        description: 'Background color of the badge surface.',
        defaultValue: 'var(--component-badge-background)',
      },
      '--badge-text-color': {
        description: 'Text color inside the badge.',
        defaultValue: 'var(--component-badge-text)',
      },
      '--badge-border-color': {
        description: 'Border color of the badge.',
        defaultValue: 'var(--component-badge-border)',
      },
      '--badge-border-width': {
        description: 'Border width of the badge.',
        defaultValue: 'var(--size-border-width-hairline)',
      },
      '--badge-radius': {
        description: 'Corner radius of the badge (kept square by design).',
        defaultValue: 'var(--component-badge-radius)',
      },
      '--badge-gap': {
        description: 'Space between slotted items inside the badge.',
        defaultValue: 'var(--component-badge-gap)',
      },
      '--badge-padding': {
        description: 'Inline and block padding for the badge surface.',
        defaultValue: 'var(--component-badge-padding)',
      },
      '--badge-font-family': {
        description: 'Font family for badge text.',
        defaultValue: 'var(--typography-roles-caption-font-family)',
      },
      '--badge-font-size': {
        description: 'Font size for badge text.',
        defaultValue: 'var(--typography-roles-caption-font-size)',
      },
      '--badge-font-weight': {
        description: 'Font weight for badge text.',
        defaultValue: 'var(--typography-roles-caption-font-weight)',
      },
      '--badge-line-height': {
        description: 'Line height for badge text.',
        defaultValue: 'var(--typography-roles-caption-line-height)',
      },
      '--badge-letter-spacing': {
        description: 'Letter spacing for badge text.',
        defaultValue: 'var(--typography-roles-caption-letter-spacing)',
      },
    },
    cssParts: {},
    dependencies: {},
  },
};

export default meta;

export const Canvas: Story = {
  render: ({ label }) => html`
    <badge-box>
      <span>${label}</span>
    </badge-box>
  `,
};
