import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import babelConfig from '../babel.config.js';

const webOnlyExtensions = ['.web.js', '.web.jsx', '.web.ts', '.web.tsx'];

export default defineConfig(() => {
  return {
    base: './',
    root: path.join(__dirname, '..'),
    assetsInclude: ['/sb-preview/runtime.js'],
    build: {
      assetsInlineLimit: 10 * 1024, // 10kb
    },
    cacheDir: path.join(__dirname, '../../node_modules/.cache/storybook/rsd'),
    css: {
      postcss: path.join(__dirname, '..'),
    },
    optimizeDeps: {
      include: ['@storybook/react'],
      exclude: ['react-strict-dom'],
    },
    plugins: [
      react(),
      babel({
        parserOpts: babelConfig.parserOpts,
        plugins: babelConfig.plugins,
        exclude: [
          /[\\/]node_modules[\\/](?!react-strict-dom[\\/])/,
          /\0rolldown[\\/]runtime\.js/,
        ],
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
          find: /@box-model\/rsd\/styles\/([^/]+)/,
          replacement: path.join(__dirname, '../../../libs/rsd/src/styles/$1'),
        },
        {
          find: /@box-model\/rsd\/([^/]+)/,
          replacement: path.join(
            __dirname,
            '../../../libs/rsd/src/$1/index.ts'
          ),
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
          replacement: path.resolve(
            __dirname,
            '../../../dist/libs/tokens/tokens.js'
          ),
        },
        {
          find: /^@box-model\/tokens\/tokens$/,
          replacement: path.resolve(
            __dirname,
            '../../../dist/libs/tokens/tokens.scss'
          ),
        },
        {
          find: /^@box-model\/tokens$/,
          replacement: path.resolve(
            __dirname,
            '../../../dist/libs/tokens/tokens.js'
          ),
        },
        {
          find: /^@box-model\/storybook-utils$/,
          replacement: path.resolve(
            __dirname,
            '../../../libs/storybook-utils/src/index.ts'
          ),
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
          replacement: path.resolve(
            __dirname,
            '../../../dist/libs/web/index.js'
          ),
        },
        {
          // Stub out react-native - not used, react-strict-dom handles everything
          find: /^react-native$/,
          replacement: path.resolve(__dirname, 'react-native-stub.js'),
        },
      ],
    },
  };
});
