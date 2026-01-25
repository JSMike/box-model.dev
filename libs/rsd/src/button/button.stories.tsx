import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Button } from './button';

const meta: Docs = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    label: {
      control: 'text',
      description: 'Button text',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual style',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable interactions',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'medium',
    disabled: false,
  },
  docs: {
    className: 'Button',
    slots: {
      '': { description: 'Button label/content.' },
    },
    attributes: {
      variant: {
        type: 'ButtonVariant',
        description: 'Visual style.',
        defaultValue: 'primary',
        options: ['primary', 'secondary', 'ghost'],
      },
      size: {
        type: 'ButtonSize',
        description: 'Button size.',
        defaultValue: 'medium',
        options: ['small', 'medium', 'large'],
      },
      disabled: {
        type: 'boolean',
        description: 'Disable interactions.',
        defaultValue: false,
        options: [true, false],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Canvas: Story = {
  render: ({ label, ...args }) => <Button {...args}>{label}</Button>,
};
