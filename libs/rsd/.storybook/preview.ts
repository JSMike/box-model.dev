import type { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-themes';

// Import RSD directive (required by react-strict-dom)
import '../src/strict.css';
// Import Storybook-specific styles (tokens, theme classes)
import './storybook.css';

export const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'rsd-theme-light',
        dark: 'rsd-theme-dark',
      },
      defaultTheme: 'light',
      parentSelector: 'body'
    }),
  ],
  parameters: {
    options: {
      storySort: 'alphabetical-by-kind',
    },
    controls: { expanded: true },
    docs: {
      inlineStories: true,
      iframeHeight: '200px',
      source: {
        excludeDecorators: true
      }
    },
    tags: ['autodocs'],
    backgrounds: { disable: true },
  }
};

export default preview;
