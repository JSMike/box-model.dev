import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Progress, type ProgressProps } from './progress';

const meta: Docs = {
  title: 'Components/Progress',
  component: Progress,
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 100 }, description: 'Current value.' },
    max: { control: { type: 'number', min: 1, max: 100 }, description: 'Maximum value.' },
    label: { control: 'text', description: 'Optional helper label.' },
  },
  args: {
    value: 60,
    max: 100,
    label: 'Uploading assets…',
  },
  docs: {
    className: 'Progress',
    attributes: {
      value: {
        type: 'number',
        description: 'Current progress value clamped to max.',
        defaultValue: 0,
      },
      max: {
        type: 'number',
        description: 'Maximum value.',
        defaultValue: 100,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Canvas: Story = {
  render: (args: ProgressProps) => <Progress {...args} />,
};
