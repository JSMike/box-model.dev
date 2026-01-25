import type { StoryObj, Meta } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Markdown, type MarkdownProps } from './markdown';

type StoryArgs = MarkdownProps & { content: string };

const meta: Docs<Meta<StoryArgs>> = {
  title: 'Components/Markdown',
  component: Markdown,
  argTypes: {
    content: {
      control: 'text',
      description: 'Text content to display',
    },
  },
  args: {
    content: 'This is a **markdown** container for rich text content.',
  },
  docs: {
    className: 'Markdown',
    slots: {
      '': { description: 'Markdown or pre-rendered content.' },
    },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Canvas: Story = {
  render: ({ content }) => (
    <Markdown>
      <p>{content}</p>
    </Markdown>
  ),
};

export const RichContent: Story = {
  render: () => (
    <Markdown>
      <h1>Heading 1</h1>
      <p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
      <h2>Heading 2</h2>
      <ul>
        <li>List item one</li>
        <li>List item two</li>
        <li>List item three</li>
      </ul>
      <p>A <a href="#">link</a> to somewhere.</p>
    </Markdown>
  ),
};
