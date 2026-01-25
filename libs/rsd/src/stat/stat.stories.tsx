import type { StoryObj, Meta } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Stat, type StatProps } from './stat';

const trends = ['neutral', 'up', 'down'] as const;

const meta: Docs<Meta<StatProps>> = {
  title: 'Components/Stat',
  component: Stat,
  argTypes: {
    value: {
      control: 'text',
      description: 'Main statistic value',
    },
    title: {
      control: 'text',
      description: 'Title/label for the stat',
    },
    delta: {
      control: 'text',
      description: 'Delta/change value',
    },
    trend: {
      control: 'select',
      options: trends,
      description: 'Trend direction',
    },
    showTrendIndicator: {
      control: 'boolean',
      description: 'Show trend indicator icon',
    },
  },
  args: {
    value: '42',
    title: 'Components',
    delta: '+5',
    trend: 'up',
    showTrendIndicator: true,
  },
  docs: {
    className: 'Stat',
    attributes: {
      value: {
        type: 'string',
        description: 'Main statistic value.',
      },
      title: {
        type: 'string',
        description: 'Title/label for the stat.',
      },
      delta: {
        type: 'string',
        description: 'Delta/change value.',
      },
      trend: {
        type: 'StatTrend',
        description: 'Trend direction.',
        defaultValue: 'neutral',
        options: trends,
      },
      showTrendIndicator: {
        type: 'boolean',
        description: 'Show trend indicator icon.',
        defaultValue: 'false',
      },
    },
  },
};

export default meta;
type Story = StoryObj<StatProps>;

export const Canvas: Story = {
  render: (args) => <Stat {...args} />,
};
