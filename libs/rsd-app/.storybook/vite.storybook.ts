import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const webOnlyExtensions = ['.web.js', '.web.jsx', '.web.ts', '.web.tsx'];

const babelConfigPath = path.join(__dirname, '..', 'babel.config.js');

export default defineConfig(() => {
  return {
    base: './',
    root: path.join(__dirname, '..'),
    assetsInclude: ['/sb-preview/runtime.js'],
    build: {
      assetsInlineLimit: 10 * 1024, // 10kb
    },
    cacheDir: path.join(__dirname, '../../node_modules/.cache/storybook/rsd-app'),
    css: {
      postcss: path.join(__dirname, '..'),
    },
    optimizeDeps: {
      include: ['@storybook/react'],
      exclude: ['react-strict-dom'],
    },
    plugins: [
      react({
        babel: {
          configFile: babelConfigPath,
        },
        exclude: [/\/node_modules\/(?!react-strict-dom)/],
      }),
    ],
    resolve: {
      extensions: [
        ...webOnlyExtensions,
        '.mjs',
        '.js',
        '.mts',
        '.ts',
        '.jsx',
        '.tsx',
        '.json',
      ],
      alias: [
        {
          find: /^@react-navigation\/native$/,
          replacement: path.resolve(
            __dirname,
            '../../../libs/rsd-app/src/storybook/navigation-mock.ts'
          ),
        },
        {
          find: /^react-native$/,
          replacement: 'react-native-web',
        },
        {
          find: /^react-native-svg$/,
          replacement: 'react-native-svg-web',
        },
        {
          find: /^@react-native\/assets-registry\/registry$/,
          replacement: 'react-native-web/dist/modules/AssetRegistry/index',
        },
        {
          find: /^@box-model\/rsd-app$/,
          replacement: path.resolve(__dirname, '../../../libs/rsd-app/src/index.ts'),
        },
        {
          find: /^@box-model\/rsd-app\/(.*)/,
          replacement: path.resolve(__dirname, '../../../libs/rsd-app/src/$1'),
        },
        {
          find: /@box-model\/rsd\/styles\/([^/]+)/,
          replacement: path.join(__dirname, '../../../libs/rsd/src/styles/$1'),
        },
        {
          find: /@box-model\/rsd\/([^/]+)/,
          replacement: path.join(__dirname, '../../../libs/rsd/src/$1/index.ts'),
        },
        {
          // StyleX tokens file for RSD (must come before other token aliases)
          find: /^@box-model\/tokens\/tokens\.stylex$/,
          replacement: path.resolve(
            __dirname,
            '../../../dist/libs/tokens/tokens.stylex.ts'
          ),
        },
        {
          find: /^@box-model\/tokens\/tokens\.js$/,
          replacement: path.resolve(__dirname, '../../../dist/libs/tokens/tokens.js'),
        },
        {
          find: /^@box-model\/tokens\/tokens$/,
          replacement: path.resolve(__dirname, '../../../dist/libs/tokens/tokens.scss'),
        },
        {
          find: /^@box-model\/tokens$/,
          replacement: path.resolve(__dirname, '../../../dist/libs/tokens/tokens.js'),
        },
        {
          find: /^@box-model\/storybook-utils$/,
          replacement: path.resolve(__dirname, '../../../libs/storybook-utils/src/index.ts'),
        },
        {
          find: /^@box-model\/web\/styles\/(.*)/,
          replacement: path.resolve(
            __dirname,
            '../../../dist/libs/web/styles/_$1.scss'
          ),
        },
        {
          find: /^@box-model\/web\/(.*)/,
          replacement: path.resolve(__dirname, '../../../dist/libs/web/$1.js'),
        },
        {
          find: /^@box-model\/web$/,
          replacement: path.resolve(__dirname, '../../../dist/libs/web/index.js'),
        },
      ],
    },
  };
});
