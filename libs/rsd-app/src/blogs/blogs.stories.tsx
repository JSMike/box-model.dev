import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { BlogsScreen } from './blogs';

const meta: Docs = {
  title: 'App/Blogs',
  component: BlogsScreen,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof BlogsScreen>;

export const Canvas: Story = {
  render: () => <BlogsScreen />,
};
