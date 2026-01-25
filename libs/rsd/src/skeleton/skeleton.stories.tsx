import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import {
  Skeleton,
  type SkeletonHeight,
  type SkeletonProps,
  type SkeletonWidth,
} from './skeleton';

const widths: SkeletonWidth[] = ['full', 'sm', 'md', 'lg'];
const heights: SkeletonHeight[] = ['sm', 'md', 'lg'];

const meta: Docs = {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    width: { control: 'select', options: widths, description: 'Width of the placeholder.' },
    height: { control: 'select', options: heights, description: 'Height of the placeholder.' },
  },
  args: {
    width: 'full',
    height: 'md',
  },
  docs: {
    className: 'Skeleton',
    attributes: {
      width: { type: 'SkeletonWidth', description: 'Width value.', defaultValue: 'full', options: widths },
      height: { type: 'SkeletonHeight', description: 'Height value.', defaultValue: 'md', options: heights },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Canvas: Story = {
  render: (args: SkeletonProps) => <Skeleton {...args} />,
};
