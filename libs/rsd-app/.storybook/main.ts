import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import remarkGfm from 'remark-gfm';
import type { StorybookConfig } from '@storybook/react-vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: path.join(__dirname, 'vite.storybook.ts')
      }
    }
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript'
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
