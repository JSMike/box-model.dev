import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { HomeScreen } from './home';

const meta: Docs = {
  title: 'App/Home',
  component: HomeScreen,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof HomeScreen>;

export const Canvas: Story = {
  render: () => <HomeScreen />,
};
