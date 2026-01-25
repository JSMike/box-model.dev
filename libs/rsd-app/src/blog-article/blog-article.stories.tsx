import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { BlogArticleScreen } from './blog-article';

const meta: Docs = {
  title: 'App/Blog Article',
  component: BlogArticleScreen,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof BlogArticleScreen>;

export const Canvas: Story = {
  render: () => <BlogArticleScreen />,
};
