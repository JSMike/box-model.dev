import path from 'node:path';
import { fileURLToPath } from 'node:url';
import babelConfig from './babelLoader.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../..');

export default {
  plugins: {
    'react-strict-dom/postcss-plugin': {
      cwd: workspaceRoot,
      include: [
        'apps/box-model-rsd-nextjs/src/**/*.{js,jsx,mjs,ts,tsx}',
        'libs/rsd/src/**/*.{js,jsx,mjs,ts,tsx}',
        'libs/rsd-app/src/**/*.{js,jsx,mjs,ts,tsx}',
        'node_modules/react-strict-dom/**/*.js',
      ],
      babelConfig,
      useLayers: true,
    },
  },
};
