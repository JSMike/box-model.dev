/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import fs from 'node:fs';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import { isPublicLibraryEntryDirectory } from './generators/library-entrypoints.js';

const srcDir = path.resolve(__dirname, 'src');
const outputPath = path.resolve(__dirname, '../../dist/libs/web');
const entryDirectories = fs
  .readdirSync(srcDir, { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() &&
      isPublicLibraryEntryDirectory(entry.name) &&
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
const isLitImport = (id: string): boolean =>
  id === 'lit' ||
  id.startsWith('lit/') ||
  id === 'lit-html' ||
  id.startsWith('lit-html/') ||
  id === 'lit-element' ||
  id.startsWith('lit-element/') ||
  id.startsWith('@lit/');

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
          src: 'CHANGELOG.md',
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
          src: 'skills/box-model-web',
          dest: 'skills',
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
      beforeWriteFile: (filePath) => {
        const [topLevelDirectory] = path
          .relative(outputPath, filePath)
          .split(path.sep);
        if (!isPublicLibraryEntryDirectory(topLevelDirectory)) {
          return false;
        }
        return undefined;
      },
    }),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: outputPath,
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
      // Let npm consumers share and deduplicate Lit with other component libraries.
      // A future self-contained CDN distribution can bundle Lit separately.
      external: isLitImport,
      plugins: [
        generatePackageJson({
          inputFolder: __dirname,
          baseContents: (pkg) => {
            const baseExports = pkg.exports as Record<
              string,
              { types?: string; default?: string }
            >;
            const exports = Object.keys(entryPoints)
              .sort()
              .reduce<Record<string, { types?: string; default?: string }>>(
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
                { ...baseExports }
              );

            return {
              ...pkg,
              // Element registration is a side effect of importing entry chunks.
              // Do not set sideEffects:false — bundlers would tree-shake @customElement.
              // Cover all emitted entry and shared JavaScript chunks.
              sideEffects: ['./*.js'],
              exports,
            };
          },
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
