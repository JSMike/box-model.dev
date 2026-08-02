/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import fs from 'node:fs';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import babelConfig from './babel.config.js';

const webOnlyExtensions = ['.web.js', '.web.jsx', '.web.ts', '.web.tsx'];

const srcDir = path.resolve(import.meta.dirname, 'src');
const entryDirectories = fs
  .readdirSync(srcDir, { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() &&
      fs.existsSync(path.join(srcDir, entry.name, 'index.ts'))
  )
  .map((entry) => entry.name);

const entryPoints: Record<string, string> = {};
const rootEntryPath = path.join(srcDir, 'index.ts');

if (fs.existsSync(rootEntryPath)) {
  entryPoints.index = rootEntryPath;
}

for (const directory of entryDirectories) {
  entryPoints[directory] = path.join(srcDir, directory, 'index.ts');
}

const tokensDistPath = path.resolve(
  import.meta.dirname,
  '../../dist/libs/tokens'
);
const reactChunkMatchers = [
  '/node_modules/react',
  '/node_modules/react-dom',
  '/node_modules/react-strict-dom',
];

const isReactModule = (id: string) => {
  const normalizedId = id.replace(/\\/g, '/');
  return reactChunkMatchers.some((match) => normalizedId.includes(match));
};

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/libs/rsd',
  css: {
    postcss: import.meta.dirname,
  },
  resolve: {
    tsconfigPaths: true,
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
        find: /^@box-model\/tokens\/tokens$/,
        replacement: path.join(tokensDistPath, '_tokens.scss'),
      },
      {
        find: /^@box-model\/tokens$/,
        replacement: path.join(tokensDistPath, 'tokens.js'),
      },
      {
        find: /^@box-model\/storybook-utils$/,
        replacement: path.resolve(
          import.meta.dirname,
          '../../libs/storybook-utils/src/index.ts'
        ),
      },
      {
        find: /^@box-model\/web\/styles\/(.*)/,
        replacement: path.resolve(
          import.meta.dirname,
          '../../dist/libs/web/styles/_$1.scss'
        ),
      },
      {
        find: /^@box-model\/web\/(.*)/,
        replacement: path.resolve(
          import.meta.dirname,
          '../../dist/libs/web/$1.js'
        ),
      },
      {
        find: /^@box-model\/web$/,
        replacement: path.resolve(
          import.meta.dirname,
          '../../dist/libs/web/index.js'
        ),
      },
    ],
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
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(import.meta.dirname, 'tsconfig.lib.json'),
      pathsToAliases: false,
    }),
  ],
  ssr: {
    noExternal: ['react-strict-dom'],
  },
  build: {
    outDir: '../../dist/libs/rsd',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: entryPoints,
      name: 'rsd',
      formats: ['es' as const],
      cssFileName: 'styles',
    },
    rolldownOptions: {
      // External packages that should not be bundled
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react-strict-dom',
        'react-native',
      ],
      output: {
        manualChunks(id) {
          if (isReactModule(id)) {
            return 'react';
          }
          return undefined;
        },
      },
      plugins: [
        generatePackageJson({
          inputFolder: import.meta.dirname,
          baseContents: (pkg: any) => ({
            ...pkg,
            sideEffects: ['./styles.css'],
            exports: Object.keys(entryPoints).reduce(
              (acc: any, entry: string) => {
                const exportEntry = {
                  types: `./${entry}/index.d.ts`,
                  default: `./${entry}.js`,
                };
                if (entry === 'index') {
                  acc['.'] = {
                    types: './index.d.ts',
                    default: './index.js',
                  };
                  return acc;
                }
                if (entry === 'styles') {
                  return acc;
                }
                acc[`./${entry}`] = exportEntry;
                acc[`./${entry}.js`] = exportEntry;
                return acc;
              },
              {
                './styles': {
                  types: './styles/index.d.ts',
                  default: './styles.css',
                },
                './styles.css': {
                  types: './styles/index.d.ts',
                  default: './styles.css',
                },
                './package.json': {
                  default: './package.json',
                },
              }
            ),
          }),
        }),
      ],
    },
  },
  test: {
    name: 'rsd',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/libs/rsd',
      provider: 'v8' as const,
    },
    alias: {
      'react-native': 'react-native-web',
      // Use mock for react-strict-dom in tests (avoids babel compilation requirement)
      'react-strict-dom/runtime': path.join(
        import.meta.dirname,
        '__mocks__/react-strict-dom-runtime.ts'
      ),
      'react-strict-dom': path.join(
        import.meta.dirname,
        '__mocks__/react-strict-dom.ts'
      ),
    },
  },
}));
