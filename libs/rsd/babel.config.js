import path from 'node:path';
import { fileURLToPath } from 'node:url';
import reactStrictDomPreset from 'react-strict-dom/babel-preset';
import stylexPlugin from '@stylexjs/babel-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../..');

const dev = process.env.NODE_ENV !== "production";

function stripViteVersionFromFilename() {
  return {
    pre(file) {
      if (file.opts.filename) {
        file.opts.filename = file.opts.filename.split("?")[0];
      }
    },
  };
}

const presetConfig = reactStrictDomPreset(null, {
  debug: dev,
  dev,
  platform: 'web',
});

const presetPlugins = Array.isArray(presetConfig?.plugins) ? presetConfig.plugins : [];
const isStylexEntry = (entry) =>
  Array.isArray(entry) &&
  (entry[0] === stylexPlugin || entry[0]?.name === 'styleXTransform');
const plugins = [
  stripViteVersionFromFilename,
  ...presetPlugins.map((entry) => {
    if (isStylexEntry(entry)) {
      const existingOptions = entry[1] ?? {};
      return [
        entry[0],
        {
          ...existingOptions,
          unstable_moduleResolution: {
            type: 'commonJS',
            rootDir: workspaceRoot,
            themeFileExtension: '.stylex',
          },
          aliases: {
            ...(existingOptions.aliases ?? {}),
            '@box-model/tokens/*': [path.join(workspaceRoot, 'dist/libs/tokens/*')],
          },
        },
      ];
    }
    return entry;
  }),
];

export default {
  parserOpts: {
    plugins: ["typescript", "jsx"],
  },
  plugins,
};
