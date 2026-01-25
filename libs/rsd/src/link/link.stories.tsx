import type { StoryObj } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Link, type LinkElement, type LinkProps, type LinkSize, type LinkVariant } from './link';

const variants: LinkVariant[] = ['primary', 'secondary', 'tertiary'];
const sizes: LinkSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const elements: LinkElement[] = ['a', 'button'];

const meta: Docs = {
  title: 'Components/Link',
  component: Link,
  argTypes: {
    variant: { control: 'select', options: variants, description: 'Visual emphasis.' },
    size: { control: 'select', options: sizes, description: 'Font size scale.' },
    element: { control: 'select', options: elements, description: 'Rendered element type.' },
    label: { control: 'text', description: 'Visible link label.' },
    href: { control: 'text', description: 'Destination URL when using anchor.' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    element: 'a',
    label: 'Learn more',
    href: 'https://example.com',
  },
  docs: {
    className: 'Link',
    attributes: {
      variant: {
        type: 'LinkVariant',
        description: 'Visual emphasis of the link.',
        defaultValue: 'primary',
        options: variants,
      },
      size: {
        type: 'LinkSize',
        description: 'Font size scale.',
        defaultValue: 'md',
        options: sizes,
      },
      element: {
        type: 'LinkElement',
        description: 'Element type to render.',
        defaultValue: 'a',
        options: elements,
      },
    },
    events: {
      onClick: { description: 'Click handler.', detail: '() => void' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Canvas: Story = {
  render: (args: LinkProps & { label: string; element: LinkElement; href: string }) => (
    <Link {...args} href={args.href} element={args.element}>
      {args.label}
    </Link>
  ),
};
