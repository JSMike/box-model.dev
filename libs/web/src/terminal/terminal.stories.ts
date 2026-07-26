import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/terminal';

const meta: Docs = {
  component: 'terminal-box',
  title: 'Components/Terminal box',
  argTypes: {},
  args: {},
  docs: [
    {
      selector: 'terminal-box',
      className: 'Terminal',
      slots: {
        '': {
          description:
            'Terminal line items, typically `<terminal-line-box>` elements.',
        },
      },
      cssProperties: {
        '--terminal-padding': {
          description: 'Padding inside the terminal surface.',
          defaultValue: 'var(--space-scale-200)',
        },
        '--terminal-gap': {
          description: 'Gap between terminal lines.',
          defaultValue: 'var(--space-scale-100)',
        },
        '--terminal-font-size': {
          description: 'Font size for terminal content.',
          defaultValue: 'var(--typography-roles-code-font-size)',
        },
        '--terminal-font-family': {
          description: 'Font family for terminal content.',
          defaultValue: 'var(--typography-roles-code-font-family)',
        },
        '--terminal-line-height': {
          description: 'Line height for terminal content.',
          defaultValue: 'var(--typography-line-height-normal)',
        },
        '--terminal-min-height': {
          description: 'Minimum height for the terminal surface.',
          defaultValue: '12.5rem',
        },
        '--terminal-surface': {
          description: 'Background color of the terminal.',
          defaultValue: 'var(--box-model-background-canvas)',
        },
        '--terminal-text': {
          description: 'Text color inside the terminal.',
          defaultValue: 'var(--box-model-text-primary)',
        },
        '--terminal-border': {
          description: 'Border color of the terminal.',
          defaultValue: 'var(--box-model-border-default)',
        },
        '--terminal-shadow': {
          description: 'Crisp offset shadow behind the terminal surface.',
          defaultValue: 'var(--box-model-shadow-offset-sm)',
        },
      },
      cssParts: {
        surface: {
          description: 'Container for terminal content.',
        },
      },
      dependencies: {
        'terminal-line-box': {
          description: 'Recommended child component for terminal lines.',
          included: true,
        },
      },
    },
    {
      selector: 'terminal-line-box',
      className: 'TerminalLine',
      attributes: {
        variant: {
          type: "'prompt' | 'success' | 'info'",
          description: 'Line intent determining prompt glyph and color.',
          defaultValue: 'prompt',
          options: ['prompt', 'success', 'info'],
        },
        cursor: {
          type: 'boolean',
          description: 'Displays a blinking cursor at the end of the line.',
          defaultValue: false,
          options: [true, false],
        },
      },
      slots: {
        '': {
          description: 'Line content shown after the prompt glyph.',
        },
      },
      cssProperties: {
        '--terminal-line-text': {
          description: 'Text color for terminal line content.',
          defaultValue: 'var(--box-model-text-primary)',
        },
        '--terminal-line-prompt': {
          description: 'Color for the prompt glyph.',
          defaultValue: 'var(--box-model-text-accent)',
        },
        '--terminal-line-success': {
          description: 'Text color when variant is success.',
          defaultValue: 'var(--box-model-text-success)',
        },
        '--terminal-line-info': {
          description: 'Text color when variant is info.',
          defaultValue: 'var(--box-model-text-accent)',
        },
      },
      cssParts: {
        prompt: {
          description: 'Prompt glyph preceding the content.',
        },
        content: {
          description: 'Container for the line content.',
        },
        cursor: {
          description: 'Blinking cursor shown when `cursor` is true.',
        },
      },
      dependencies: {},
    },
  ],
};

export default meta;

export const Canvas: Story = {
  render: () => html`
    <terminal-box>
      <terminal-line-box variant="prompt"
        >npm install @box-model/web</terminal-line-box
      >
      <terminal-line-box variant="info">Using box-model CLI</terminal-line-box>
      <terminal-line-box variant="success"
        >Packages installed</terminal-line-box
      >
      <terminal-line-box variant="prompt" cursor
        >npm run storybook</terminal-line-box
      >
    </terminal-box>
  `,
};
