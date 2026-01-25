import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { composePlugins, withNx } from '@nx/next';
import withStylexTurbopack from '@stylexswc/nextjs-plugin/turbopack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../..');

const dev = process.env.NODE_ENV !== 'production';

// Platform-specific extensions for web
const webOnlyExtensions = ['.web.js', '.web.jsx', '.web.ts', '.web.tsx'];

// Trigger rebuild
const nextConfig = {
  // Use this to set Nx-specific options
  nx: {},
  // Transpile these packages so Turbopack processes them
  transpilePackages: [
    'react-strict-dom',
    'react-native-web',
    'react-native-safe-area-context',
    '@box-model/rsd',
    '@box-model/rsd-app',
    '@box-model/tokens',
  ],
  // Webpack fallback config (used when not using Turbopack)
  webpack: (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.mainFields = ['module', 'main'];
    config.resolve.extensions = [
      ...webOnlyExtensions,
      ...(config.resolve.extensions ?? []),
    ];
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      'react-native': 'react-native-web',
      'react-native$': 'react-native-web',
      '@react-navigation/native': path.resolve(
        __dirname,
        'src/lib/react-navigation.ts'
      ),
    };
    return config;
  },
};

// StyleX SWC configuration for Turbopack
const stylexConfig = {
  rsOptions: {
    dev,
    importSources: [
      '@stylexjs/stylex',
      { from: 'react-strict-dom', as: 'css' },
    ],
    unstable_moduleResolution: {
      type: 'commonJS',
      rootDir: workspaceRoot,
      themeFileExtension: '.stylex',
    },
    aliases: {
      '@box-model/tokens/tokens.stylex': [
        path.join(workspaceRoot, 'dist/libs/tokens/tokens.stylex.ts'),
      ],
      '@box-model/tokens/*': [path.join(workspaceRoot, 'dist/libs/tokens/*')],
    },
  },
  stylexImports: ['@stylexjs/stylex', { from: 'react-strict-dom', as: 'css' }],
};

const plugins = [withNx];

// Compose plugins, then wrap with StyleX
const baseConfig = composePlugins(...plugins)(nextConfig);
const stylexWrapped = withStylexTurbopack(stylexConfig)(baseConfig);

// Apply turbopack config after StyleX plugin wrapper
export default {
  ...stylexWrapped,
  turbopack: {
    ...(stylexWrapped.turbopack ?? {}),
    resolveAlias: {
      ...(stylexWrapped.turbopack?.resolveAlias ?? {}),
      'react-native': 'react-native-web',
      'react-native/Libraries/Utilities/codegenNativeComponent':
        './src/lib/codegenNativeComponent.ts',
      '@react-navigation/native': './src/lib/react-navigation.ts',
    },
    resolveExtensions: [
      ...webOnlyExtensions,
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.mjs',
      '.json',
    ],
  },
};
