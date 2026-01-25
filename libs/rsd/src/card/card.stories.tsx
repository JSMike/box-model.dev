import type { StoryObj, Meta } from '@storybook/react';
import type { Docs } from '@box-model/storybook-utils';
import { Card, CardHeader, CardBody, CardFooter } from './card';
import { Button } from '../button';

type StoryArgs = {
  heading: string;
  body: string;
  footer: string;
  variant: 'elevated' | 'outlined' | 'filled';
  padded: boolean;
};

const meta: Docs<Meta<StoryArgs>> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    heading: {
      control: 'text',
      description: 'Heading content',
    },
    body: {
      control: 'text',
      description: 'Body copy',
    },
    footer: {
      control: 'text',
      description: 'Footer metadata',
    },
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: 'Visual treatment',
    },
    padded: {
      control: 'boolean',
      description: 'Apply internal padding',
    },
  },
  args: {
    variant: 'outlined',
    padded: true,
    heading: 'Card heading',
    body: 'Use cards to group related content and surface actions.',
    footer: 'Last updated just now',
  },
  docs: {
    className: 'Card',
    slots: {
      header: { description: 'Header content, typically a heading element.' },
      '': { description: 'Main card body content.' },
      footer: { description: 'Footer content such as metadata.' },
      actions: { description: 'Action controls aligned after the footer.' },
    },
    attributes: {
      variant: {
        type: 'CardVariant',
        description: 'Visual treatment.',
        defaultValue: 'outlined',
        options: ['elevated', 'outlined', 'filled'],
      },
      padded: {
        type: 'boolean',
        description: 'Apply internal padding.',
        defaultValue: true,
        options: [true, false],
      },
    },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Canvas: Story = {
  render: ({ heading, body, footer, ...args }: StoryArgs) => (
    <div style={{ maxWidth: '28rem' }}>
      <Card {...args}>
        <CardHeader>
          <h3 style={{ margin: 0 }}>{heading}</h3>
        </CardHeader>
        <CardBody>
          <p style={{ margin: 0 }}>{body}</p>
        </CardBody>
        <CardFooter>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Save</Button>
          </div>
          <p style={{ margin: '0.5rem 0 0' }}>{footer}</p>
        </CardFooter>
      </Card>
    </div>
  ),
};
