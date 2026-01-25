import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { AboutScreen } from './about';

const meta: Docs = {
  title: 'App/About',
  component: AboutScreen,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof AboutScreen>;

export const Canvas: Story = {
  render: () => <AboutScreen />,
};
