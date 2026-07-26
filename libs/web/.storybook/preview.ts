import { html } from 'lit';
import type { Preview } from '@storybook/web-components';
import { withThemeByClassName } from '@storybook/addon-themes';
import '../src/styles/box-model.scss';

const withThemeBackground = (Story: () => void) => {
  return html`<div class="box-model-theme-surface" style="padding: 1rem;">
    ${Story()}
  </div>`;
};

export const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'box-model-theme-light',
        dark: 'box-model-theme-dark',
      },
      defaultTheme: 'light',
      parentSelector: 'body',
    }),
    withThemeBackground,
  ],
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical-by-kind',
        order: [
          'Introduction',
          'Changelog',
          'Framework typings',
          'Test setup',
          '*',
        ],
      },
    },
    controls: { expanded: true },
    docs: {
      inlineStories: true,
      iframeHeight: '200px',
      source: {
        excludeDecorators: true,
      },
    },
    tags: ['autodocs'],
    backgrounds: { disable: true },
  },
};

export default preview;
