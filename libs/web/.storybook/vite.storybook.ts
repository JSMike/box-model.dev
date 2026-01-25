import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    root: path.join(__dirname, '..'),
    assetsInclude: ['/sb-preview/runtime.js'],
    build: {
      assetsInlineLimit: 10 * 1024, // 10kb
    },
    cacheDir: path.join(__dirname, '../../node_modules/.cache/storybook/web'),
    optimizeDeps: {
      include: ['@storybook/web-components'],
      exclude: [path.join(__dirname, '../../node_modules/.cache/storybook/web/deps/*')]
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          quietDeps: true
        }
      }
    },
    resolve: {
      alias: [
        {
          find: /@box-model\/web\/styles\/([^/]+)/,
          replacement: path.join(__dirname, '../../../libs/web/src/styles/$1')
        },
        {
          find: /@box-model\/web\/([^/]+)/,
          replacement: path.join(__dirname, '../../../libs/web/src/$1/index.ts')
        },
        { 
          find: '@box-model/storybook-utils', 
          replacement:  path.join(__dirname, '../../../libs/storybook-utils/src/index.ts') 
        },
              {
        find: /^@box-model\/tokens\/tokens$/,
          replacement: path.resolve(__dirname, '../../../dist/libs/tokens/tokens.scss'),
        },
        {
          find: /^@box-model\/tokens$/,
          replacement: path.resolve(__dirname, '../../../dist/libs/tokens/tokens.js'),
        },
      ]
    }
  };
});
