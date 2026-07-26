/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import * as path from 'path';

const tokensDistPath = path.resolve(__dirname, '../../dist/libs/tokens');
const workspaceRootPath = path.resolve(__dirname, '../..');

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/box-model-web-vite',
  server: {
    port: 4200,
    host: 'localhost',
    fs: {
      allow: [workspaceRootPath],
    },
  },
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
      {
        find: /^@box-model\/web\/(.+)$/,
        replacement: path.join(__dirname, '../../libs/web/src/$1'),
      },
    ],
  },
  plugins: [
    react({
      // Required for Lit https://github.com/vitejs/vite-plugin-react/issues/430#issuecomment-3010761829
      tsDecorators: true,
      useAtYourOwnRisk_mutateSwcOptions(options) {
        if (options.jsc && options.jsc.transform) {
          options.jsc.transform.useDefineForClassFields = false;
        }
      },
    }),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
  ],
  build: {
    outDir: '../../dist/apps/box-model-web-vite',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    name: 'box-model-web-vite',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/box-model-web-vite',
      provider: 'v8' as const,
    },
  },
}));
