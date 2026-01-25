import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/loading';

const meta: Docs = {
  component: 'loading-box',
  title: 'Components/Loading box',
  parameters: {
    docs: {
      description: {
        component:
          'Animated box character (⬚) that pulses around the perimeter to indicate a loading state. Labels stay accessible even when visually hidden.',
      },
    },
  },
  argTypes: {
    labelVisible: {
      control: 'boolean',
      description: 'Show the label next to the indicator.',
    },
    label: {
      control: 'text',
      description: 'Slot content used as the status message.',
    },
  },
  args: {
    labelVisible: false,
    label: 'Loading',
  },
  docs: {
    selector: 'loading-box',
    className: 'Loading',
    attributes: {
      'label-visible': {
        type: 'boolean',
        description: 'Controls whether the status label is visually displayed.',
        defaultValue: false,
        options: [true, false],
      },
    },
    slots: {
      '': {
        description: 'Status label content. Hidden visually by default but announced for accessibility.',
      },
    },
    cssProperties: {
      '--loading-size': {
        description: 'Overall width and height of the loading grid.',
        defaultValue: 'var(--size-control-height-sm)',
      },
      '--loading-gap': {
        description: 'Gap between cells in the loading grid.',
        defaultValue: 'var(--space-scale-025)',
      },
      '--loading-speed': {
        description: 'Duration of one full loading animation cycle.',
        defaultValue: 'var(--motion-duration-slower)',
      },
      '--loading-delay-step': {
        description: 'Stagger delay between successive cells.',
        defaultValue: 'calc(var(--motion-duration-slower) / 8)',
      },
      '--loading-opacity': {
        description: 'Base opacity for inactive loading cells.',
        defaultValue: 'var(--color-alpha-20)',
      },
      '--loading-color': {
        description: 'Color applied to the loading indicator strokes and fills.',
        defaultValue: 'var(--box-model-text-primary)',
      },
    },
    cssParts: {
      grid: {
        description: 'Wrapper around the animated 3x3 loading cells.',
      },
      label: {
        description: 'Label element announcing the loading state.',
      },
    },
    dependencies: {},
  },
};

export default meta;

type LoadingStory = Story<typeof meta>;

export const Canvas: LoadingStory = {
  render: ({ labelVisible, label }) => html`
    <loading-box ?label-visible=${labelVisible}>${label}</loading-box>
  `,
};
