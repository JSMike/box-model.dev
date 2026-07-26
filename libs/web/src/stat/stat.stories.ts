import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/stat';

const trends = ['neutral', 'up', 'down'] as const;

const meta: Docs = {
  component: 'stat-box',
  title: 'Components/Stat box',
  argTypes: {
    value: {
      control: 'text',
      description: 'Primary stat value',
    },
    delta: {
      control: 'text',
      description: 'Optional delta or trend description',
    },
    trend: {
      control: 'select',
      options: trends,
      description: 'Controls the delta color',
    },
    showTrendIndicator: {
      control: 'boolean',
      description: 'Toggle the directional trend icon',
    },
    title: {
      control: 'text',
      description: 'Stat label rendered in the title slot',
    },
    description: {
      control: 'text',
      description: 'Optional supporting text rendered in the default slot',
    },
  },
  args: {
    value: '1,024',
    delta: '+12% vs last week',
    trend: 'up',
    showTrendIndicator: true,
    title: 'Active users',
    description: 'Real-time active sessions in the last 5 minutes.',
  },
  docs: {
    selector: 'stat-box',
    className: 'Stat',
    attributes: {
      value: {
        type: 'string',
        description: 'Primary value displayed by the stat.',
        defaultValue: '',
      },
      delta: {
        type: 'string',
        description: 'Optional delta value shown beneath the primary value.',
        defaultValue: undefined,
      },
      trend: {
        type: 'StatTrend',
        description:
          'Controls the delta styling and optional indicator direction.',
        defaultValue: 'neutral',
        options: trends,
      },
      'show-trend-indicator': {
        type: 'boolean',
        description: 'Displays a directional icon next to the delta.',
        defaultValue: false,
        options: [true, false],
      },
    },
    slots: {
      title: {
        description: 'Stat label content.',
      },
      '': {
        description: 'Optional supporting text rendered below the delta.',
      },
    },
    cssProperties: {
      '--stat-shadow': {
        description: 'Crisp offset shadow behind the stat surface.',
        defaultValue: 'var(--box-model-shadow-offset-sm)',
      },
      '--stat-gap': {
        description: 'Vertical spacing between stat sections.',
        defaultValue: 'var(--component-stat-gap)',
      },
      '--stat-value-color': {
        description: 'Color applied to the primary value.',
        defaultValue: 'var(--component-stat-value)',
      },
      '--stat-title-color': {
        description: 'Color applied to the title.',
        defaultValue: 'var(--component-stat-title)',
      },
      '--stat-delta-color': {
        description: 'Color applied to the delta text.',
        defaultValue: 'var(--component-stat-delta)',
      },
      '--stat-font-family': {
        description: 'Font family for the stat.',
        defaultValue: 'var(--typography-roles-body-font-family)',
      },
    },
    cssParts: {
      label: {
        description: 'Title region for the stat.',
      },
      value: {
        description: 'Primary value display.',
      },
      delta: {
        description: 'Container for the delta content.',
      },
      'delta-text': {
        description: 'Span wrapping the delta string.',
      },
      'trend-icon': {
        description:
          'Directional icon shown when `show-trend-indicator` is true.',
      },
    },
    dependencies: {},
  },
};

export default meta;

export const Canvas: Story = {
  render: ({
    value,
    delta,
    trend,
    title,
    description,
    showTrendIndicator,
  }) => html`
    <stat-box
      value=${value}
      trend="${trend}"
      delta=${delta}
      ?show-trend-indicator=${showTrendIndicator}
    >
      <span slot="title">${title}</span>
      ${description ? html`<p>${description}</p>` : ''}
    </stat-box>
  `,
};
