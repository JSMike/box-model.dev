import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/link';

const variants = ['primary', 'secondary', 'tertiary'] as const;
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const elements = ['a', 'button'] as const;

const meta: Docs = {
  component: 'link-box',
  title: 'Components/Link box',
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      description: 'Visual emphasis of the link',
    },
    size: {
      control: 'select',
      options: sizes,
      description: 'Font size scale applied to the link content',
    },
    element: {
      control: 'select',
      options: elements,
      description: 'Determines whether the slotted content is an anchor or button',
    },
    label: {
      control: 'text',
      description: 'Visible link label',
    },
    href: {
      control: 'text',
      description: 'Destination URL when rendering an anchor element',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    element: 'a',
    label: 'Learn more',
    href: 'https://example.com',
  },
  docs: {
    selector: 'link-box',
    className: 'Link',
    attributes: {
      variant: {
        type: 'LinkVariant',
        description: 'Visual emphasis of the link',
        defaultValue: 'primary',
        options: variants,
      },
      size: {
        type: 'LinkSize',
        description: 'Font size scale applied to the link content',
        defaultValue: 'md',
        options: sizes,
      },
    },
    slots: {
      '': {
        description: 'Link content, typically a text label.',
      },
    },
    cssProperties: {
      '--link-font-family': {
        description: 'Font family used for the link.',
        defaultValue: 'var(--typography-roles-body-font-family)',
      },
      '--link-font-weight': {
        description: 'Font weight used for the link.',
        defaultValue: 'var(--typography-roles-body-font-weight)',
      },
      '--link-letter-spacing': {
        description: 'Letter spacing for the link text.',
        defaultValue: 'var(--typography-roles-body-letter-spacing)',
      },
      '--link-line-height': {
        description: 'Line height for the link text.',
        defaultValue: 'var(--typography-roles-body-line-height)',
      },
      '--link-font-size': {
        description: 'Font size for the link.',
        defaultValue: 'var(--typography-font-size-md)',
      },
      '--link-gap': {
        description: 'Space between inline elements inside the link.',
        defaultValue: 'var(--space-scale-050)',
      },
      '--link-underline-offset': {
        description: 'Offset for the underline decoration.',
        defaultValue: 'var(--space-scale-025)',
      },
      '--link-decoration-thickness': {
        description: 'Underline thickness.',
        defaultValue: 'var(--size-border-width-hairline)',
      },
      '--link-transition-duration': {
        description: 'Duration for color transitions.',
        defaultValue: 'var(--motion-interaction-press-duration)',
      },
      '--link-transition-easing': {
        description: 'Easing function for color transitions.',
        defaultValue: 'var(--motion-interaction-press-easing)',
      },
      '--link-focus-ring-color': {
        description: 'Color of the focus outline.',
        defaultValue: 'var(--box-model-focus-ring)',
      },
      '--link-focus-ring-width': {
        description: 'Width of the focus outline.',
        defaultValue: 'var(--size-border-width-thick)',
      },
      '--link-focus-ring-offset': {
        description: 'Offset distance for the focus outline.',
        defaultValue: 'var(--component-button-focus-offset)',
      },
      '--link-focus-ring-shadow': {
        description: 'Shadow applied when the link is focus-visible.',
        defaultValue: 'var(--shadow-glow-focus)',
      },
      '--link-disabled-color': {
        description: 'Color for disabled/aria-disabled links.',
        defaultValue: 'var(--box-model-disabled-text)',
      },
      '--link-color': {
        description: 'Base link color.',
        defaultValue: 'var(--box-model-text-accent)',
      },
      '--link-hover-color': {
        description: 'Link color on hover.',
        defaultValue: 'var(--box-model-brand-primary-intense)',
      },
      '--link-active-color': {
        description: 'Link color when active/pressed.',
        defaultValue: 'var(--box-model-brand-primary-strong)',
      },
      '--link-visited-color': {
        description: 'Link color after being visited.',
        defaultValue: 'var(--box-model-brand-primary-strong)',
      },
    },
    cssParts: {},
    dependencies: {},
  },
};

export default meta;

export const Canvas: Story = {
  render: ({ variant, size, label, element, href }) => {
    const content =
      element === 'button'
        ? html`<button type="button">${label}</button>`
        : html`<a href="${href}">${label}</a>`;

    return html`
      <link-box variant="${variant}" size="${size}">
        ${content}
      </link-box>
    `;
  },
};
