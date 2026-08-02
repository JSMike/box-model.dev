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

const externalPackages = new Set([
  'react',
  'react-dom',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
  'react-strict-dom',
  'react-native',
  '@react-navigation/native',
  '@react-navigation/native-stack',
  '@box-model/rsd',
]);

const externalMatchers = [/^@box-model\/rsd\//, /^@react-navigation\//];

const isExternal = (id: string) => {
  if (externalPackages.has(id)) {
    return true;
  }
  return externalMatchers.some((match) => match.test(id));
};

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/libs/rsd-app',
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
        find: /^@box-model\/tokens\/tokens\.stylex$/,
        replacement: path.join(tokensDistPath, 'tokens.stylex.ts'),
      },
      {
        find: /^@box-model\/tokens\/tokens$/,
        replacement: path.join(tokensDistPath, '_tokens.scss'),
      },
      {
        find: /^@box-model\/tokens$/,
        replacement: path.join(tokensDistPath, 'tokens.js'),
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
    outDir: '../../dist/libs/rsd-app',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: entryPoints,
      name: 'rsd-app',
      formats: ['es' as const],
    },
    rolldownOptions: {
      external: (id) => isExternal(id),
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
            exports: Object.keys(entryPoints).reduce(
              (acc: any, entry: string) => {
                acc[`./${entry}`] = {
                  types: `./${entry}/index.d.ts`,
                  default: `./${entry}.js`,
                };
                return acc;
              },
              {
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
    name: 'rsd-app',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/libs/rsd-app',
      provider: 'v8' as const,
    },
  },
}));
