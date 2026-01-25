import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Wysiwyg, type WysiwygProps } from './wysiwyg';

const initialValue = `# Welcome to the Box Model editor

This editor helps you compose markdown with custom containers like banners, cards, and dividers.
`;

const meta: Docs = {
  title: 'Components/WYSIWYG',
  component: Wysiwyg,
  argTypes: {
    placeholder: { control: 'text', description: 'Placeholder text for the editor.' },
    value: { control: 'text', description: 'Current editor value.' },
    helperText: { control: 'text', description: 'Helper text below the editor.' },
  },
  args: {
    placeholder: 'Write something…',
    value: initialValue,
    helperText: 'Markdown supported in preview.',
  },
  docs: {
    className: 'Wysiwyg',
    attributes: {
      placeholder: { type: 'string', description: 'Placeholder text.' },
      helperText: { type: 'string', description: 'Helper copy shown below the editor.' },
    },
    events: {
      onChange: { description: 'Called when the editor value changes.', detail: '(value: string) => void' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Wysiwyg>;

export const Canvas: Story = {
  render: (args: WysiwygProps) => <Wysiwyg {...args} />,
};
