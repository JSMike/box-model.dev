/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import fs from 'node:fs';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const srcDir = path.resolve(__dirname, 'src');
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

const tokensDistPath = path.resolve(__dirname, '../../dist/libs/tokens');
const litChunkMatchers = [
  '/node_modules/lit',
  '/node_modules/lit-html',
  '/node_modules/@lit/reactive-element',
];

const isLitModule = (id: string) => {
  const normalizedId = id.replace(/\\/g, '/');
  return litChunkMatchers.some((match) => normalizedId.includes(match));
};

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/web',
  resolve: {
    alias: [
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
    nxViteTsPaths(),
    viteStaticCopy({
      targets: [
        {
          src: 'README.md',
          dest: '.',
        },
        {
          src: path.resolve(__dirname, '../../LICENSE'),
          dest: '.',
        },
        {
          src: 'src/types/**/*',
          dest: 'types',
        },
        {
          src: 'src/styles/**/*.scss',
          dest: 'styles',
        },
        {
          src: 'src/custom-elements.json',
          dest: '.',
        },
      ],
    }),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
      pathsToAliases: false,
    }),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: '../../dist/libs/web',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: entryPoints,
      name: 'web',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es' as const],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [],
      output: {
        manualChunks(id) {
          if (isLitModule(id)) {
            return 'lit';
          }

          return undefined;
        },
      },
      plugins: [
        generatePackageJson({
          inputFolder: __dirname,
          baseContents: (pkg) => ({
            ...pkg,
            // Element registration is a side effect of importing entry chunks.
            // Do not set sideEffects:false — bundlers would tree-shake @customElement.
            // Cover entry chunks and shared hashed runtime (e.g. lit-*.js).
            sideEffects: ['./*.js'],
            exports: Object.keys(entryPoints)
              .sort()
              .reduce<Record<string, { types?: string; default: string }>>(
                (acc, entry) => {
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
                  // Extensionless (package convention) + .js (CEM / Node resolvers)
                  acc[`./${entry}`] = exportEntry;
                  acc[`./${entry}.js`] = exportEntry;
                  return acc;
                },
                {
                  './package.json': {
                    default: './package.json',
                  },
                  './custom-elements.json': {
                    default: './custom-elements.json',
                  },
                  './styles/*': {
                    default: './styles/*',
                  },
                }
              ),
          }),
        }),
      ],
    },
  },
  test: {
    name: 'web',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: [
      '{src,tests,generators}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    setupFiles: ['./vitest.setup.ts'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/libs/web',
      provider: 'v8' as const,
    },
  },
}));
