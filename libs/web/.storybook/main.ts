import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import remarkGfm from 'remark-gfm';
import type { StorybookConfig } from '@storybook/web-components-vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
const config: StorybookConfig = {
  core: { disableTelemetry: true },
  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        transcludeMarkdown: true,
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm]
          }
        }
      }
    },
    '@storybook/addon-a11y',
    '@storybook/addon-themes'
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {
      builder: {
        viteConfigPath: path.join(__dirname, 'vite.storybook.ts')
      }
    }
  },
  docs: {
    defaultName: 'Overview'
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      server: {
        allowedHosts: true
      }
    });
  }
};

export default config;
