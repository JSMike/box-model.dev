import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/skeleton';

const meta: Docs = {
  component: 'skeleton-box',
  title: 'Components/Skeleton box',
  argTypes: {
    animated: {
      control: 'boolean',
      description: 'Toggles the shimmer animation',
    },
    width: {
      control: 'text',
      description: 'Custom width (e.g. 12rem or 60%)',
    },
    height: {
      control: 'text',
      description: 'Custom height for the skeleton',
    },
  },
  args: {
    animated: true,
    width: '14rem',
    height: '1.5rem',
  },
  docs: {
    selector: 'skeleton-box',
    className: 'Skeleton',
    attributes: {
      animated: {
        type: 'boolean',
        description: 'Enables the shimmer animation.',
        defaultValue: true,
        options: [true, false],
      },
      width: {
        type: 'string',
        description: 'Custom width for the skeleton surface.',
        defaultValue: '100%',
      },
      height: {
        type: 'string',
        description: 'Custom height for the skeleton surface.',
        defaultValue: 'var(--component-skeleton-height)',
      },
    },
    slots: {
      '': {
        description: 'Optional children; typically left empty for a solid shimmer block.',
      },
    },
    cssProperties: {
      '--skeleton-width': {
        description: 'Width of the skeleton surface.',
        defaultValue: '100%',
      },
      '--skeleton-height': {
        description: 'Height of the skeleton surface.',
        defaultValue: 'var(--component-skeleton-height)',
      },
      '--skeleton-base': {
        description: 'Base background color of the skeleton.',
        defaultValue: 'var(--box-model-background-sunken)',
      },
      '--skeleton-surface': {
        description: 'Surface color used when mixing shimmer tones.',
        defaultValue: 'var(--box-model-background-surface)',
      },
      '--skeleton-highlight': {
        description: 'Highlight color used for the shimmer pass.',
        defaultValue: 'var(--box-model-text-secondary)',
      },
      '--skeleton-base-color': {
        description: 'Computed base color used for the fill.',
        defaultValue: 'color-mix(var(--skeleton-base) 75%, #000 25%)',
      },
      '--skeleton-highlight-color': {
        description: 'Computed highlight color used in the shimmer gradient.',
        defaultValue: 'color-mix(var(--skeleton-surface) 55%, #fff 45%)',
      },
      '--skeleton-animation-duration': {
        description: 'Duration of the shimmer animation.',
        defaultValue: '2.8s',
      },
    },
    cssParts: {},
    dependencies: {},
  },
};

export default meta;

export const Canvas: Story = {
  render: ({ animated, width, height }) => html`
    <skeleton-box ?animated="${animated}" .width=${width} .height=${height}></skeleton-box>
  `,
};
