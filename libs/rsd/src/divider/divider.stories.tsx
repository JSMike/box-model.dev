import type { StoryObj, Meta } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Divider, type DividerProps } from './divider';

const orientations = ['horizontal', 'vertical'] as const;

const meta: Docs<Meta<DividerProps>> = {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    orientation: {
      control: 'select',
      options: orientations,
      description: 'Orientation of the divider',
    },
  },
  args: {
    orientation: 'horizontal',
  },
  docs: {
    className: 'Divider',
    attributes: {
      orientation: {
        type: 'DividerOrientation',
        description: 'Orientation of the divider.',
        defaultValue: 'horizontal',
        options: orientations,
      },
    },
  },
};

export default meta;
type Story = StoryObj<DividerProps>;

export const Canvas: Story = {
  render: (args) => (
    <div style={{ width: '200px' }}>
      <p>Content above</p>
      <Divider {...args} />
      <p>Content below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: '100px' }}>
      <span>Left</span>
      <Divider orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};
