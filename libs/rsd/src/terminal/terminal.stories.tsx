import type { StoryObj, Meta } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Terminal, TerminalLine, type TerminalLineProps } from './terminal';

type StoryArgs = TerminalLineProps & { text: string };

const variants = ['prompt', 'success', 'info'] as const;

const meta: Docs<Meta<StoryArgs>> = {
  title: 'Components/Terminal',
  component: Terminal,
  argTypes: {
    text: {
      control: 'text',
      description: 'Line content',
    },
    variant: {
      control: 'select',
      options: variants,
      description: 'Line variant',
    },
    cursor: {
      control: 'boolean',
      description: 'Show blinking cursor',
    },
  },
  args: {
    text: 'npm install @box-model/rsd',
    variant: 'prompt',
    cursor: false,
  },
  docs: {
    className: 'Terminal',
    slots: {
      '': { description: 'Terminal line content.' },
    },
    attributes: {
      variant: {
        type: 'TerminalLineVariant',
        description: 'Visual variant of the line.',
        defaultValue: 'prompt',
        options: variants,
      },
      cursor: {
        type: 'boolean',
        description: 'Show blinking cursor.',
        defaultValue: 'false',
      },
    },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Canvas: Story = {
  render: ({ text, variant, cursor }) => (
    <Terminal>
      <TerminalLine variant={variant} cursor={cursor}>{text}</TerminalLine>
    </Terminal>
  ),
};

export const MultipleLines: Story = {
  render: () => (
    <Terminal>
      <TerminalLine variant="prompt">npm install @box-model/rsd</TerminalLine>
      <TerminalLine variant="info">Installing dependencies...</TerminalLine>
      <TerminalLine variant="success">Done in 2.3s</TerminalLine>
    </Terminal>
  ),
};
