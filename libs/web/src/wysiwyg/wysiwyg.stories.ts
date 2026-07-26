import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/wysiwyg';
import '../markdown';

const initialValue = `# Welcome to the Box Model editor

This editor helps you compose markdown with custom containers like banners, cards, and dividers.
`;

const meta: Docs = {
  component: 'wysiwyg-box',
  title: 'Components/WYSIWYG box',
  argTypes: {},
  args: {},
  docs: {
    selector: 'wysiwyg-box',
    className: 'Wysiwyg',
    slots: {
      '': {
        description: 'Textarea used as the editing surface.',
      },
    },
    cssProperties: {
      '--wysiwyg-font-family': {
        description: 'Font family applied to the editing textarea.',
        defaultValue: 'var(--typography-roles-body-font-family)',
      },
      '--wysiwyg-font-size': {
        description: 'Font size applied to the editing textarea.',
        defaultValue: 'var(--typography-roles-body-font-size)',
      },
      '--wysiwyg-font-weight': {
        description: 'Font weight applied to the editing textarea.',
        defaultValue: 'var(--typography-roles-body-font-weight)',
      },
      '--wysiwyg-line-height': {
        description: 'Line height applied to the editing textarea.',
        defaultValue: 'var(--typography-roles-body-line-height)',
      },
      '--wysiwyg-letter-spacing': {
        description: 'Letter spacing applied to the editing textarea.',
        defaultValue: 'var(--typography-roles-body-letter-spacing)',
      },
      '--wysiwyg-text-color': {
        description: 'Text color for editor content.',
        defaultValue: 'var(--box-model-text-primary)',
      },
      '--wysiwyg-background': {
        description: 'Background color of the editor.',
        defaultValue: 'var(--box-model-background-surface)',
      },
      '--wysiwyg-border-color': {
        description: 'Border color at rest for the editor.',
        defaultValue: 'var(--box-model-border-default)',
      },
      '--wysiwyg-border-color-hover': {
        description: 'Border color on hover.',
        defaultValue: 'var(--box-model-border-strong)',
      },
      '--wysiwyg-border-color-focus': {
        description: 'Border color on focus.',
        defaultValue: 'var(--box-model-primary-focus-ring)',
      },
      '--wysiwyg-padding-block': {
        description: 'Block padding inside the editor.',
        defaultValue: 'var(--component-input-padding-block)',
      },
      '--wysiwyg-padding-inline': {
        description: 'Inline padding inside the editor.',
        defaultValue: 'var(--component-input-padding-inline)',
      },
      '--wysiwyg-min-height': {
        description: 'Minimum height of the editor textarea.',
        defaultValue: '6rem',
      },
      '--wysiwyg-focus-shadow': {
        description: 'Shadow applied when the editor is focused.',
        defaultValue: 'var(--shadow-glow-focus)',
      },
      '--wysiwyg-placeholder-color': {
        description: 'Color of placeholder text.',
        defaultValue: 'var(--box-model-text-secondary)',
      },
    },
    cssParts: {
      toolbar: {
        description: 'Toolbar containing action buttons.',
      },
      helper: {
        description: 'Helper text shown when the editor is empty.',
      },
    },
    dependencies: {
      'toolbar-box': {
        description: 'Used internally to layout toolbar actions.',
        included: true,
      },
      'textarea-box': {
        description: 'Wraps the editing textarea for consistent styling.',
        included: true,
      },
      'markdown-box': {
        description: 'Recommended companion for rendering the edited content.',
        included: false,
      },
    },
  },
};

export default meta;

export const Canvas: Story = {
  render: () => {
    const handleInput = (event: Event) => {
      const host = event.currentTarget as HTMLElement;
      const textarea = host.querySelector('textarea');
      const preview = host.parentElement?.querySelector('markdown-box');
      if (textarea && preview) {
        preview.textContent = textarea.value;
      }
    };

    return html`
      <div class="wysiwyg-story">
        <label for="wysiwyg-story-editor">Markdown content</label>
        <wysiwyg-box @input=${handleInput}>
          <textarea id="wysiwyg-story-editor" .value=${initialValue}></textarea>
        </wysiwyg-box>
        <markdown-box>${initialValue}</markdown-box>
      </div>
    `;
  },
};
