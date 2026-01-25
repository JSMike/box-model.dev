# apps/box-model-rsd-nextjs - AI Guide

Next.js web application using React Strict DOM components from `@box-model/rsd` and shared screens from `@box-model/rsd-app`.

## Critical: Use Libraries, Not Bespoke Code

**This app is a thin shell. DO NOT create custom components, screens, or styles here.**

- **UI Components**: Use `@box-model/rsd` exclusively. If a component doesn't exist, add it to `libs/rsd/`, not here.
- **Screens**: Use `@box-model/rsd-app` exclusively. If a screen doesn't exist, add it to `libs/rsd-app/`, not here.
- **Styles**: Never create local styles with `css.create()` or CSS files for UI elements. All styling belongs in the libraries.

The only code that belongs in this app:
- Route page files (`src/app/**/page.tsx`) that wrap screens from `@box-model/rsd-app`
- Next.js configuration files (`next.config.mjs`, `postcss.config.mjs`, etc.)
- Platform-specific shims (`src/lib/react-navigation.ts`)
- Layout files for Next.js App Router

**If you find yourself writing a new component or screen in this app, STOP. Add it to the appropriate library instead.**

## Reference Documentation

**Read `rsd-nextjs-llms.md` in this directory** for official React Strict DOM + Next.js setup documentation, including:
- Babel configuration for the RSD preset
- PostCSS configuration for CSS extraction
- Next.js config for Turbopack and Webpack
- Required app files (`strict.css`, layout setup)
- Platform-specific file extensions

**Read `libs/rsd/rsd-llms.md`** for comprehensive React Strict DOM API documentation (styling, theming, cross-platform constraints, best practices).

## Technology Stack

- **Next.js 16** with App Router
- **Turbopack** (default bundler)
- **React Strict DOM** for cross-platform components
- **StyleX** for CSS-in-JS (via `@stylexswc/nextjs-plugin`)
- **react-native-web** as the RN web runtime

## Running the App

```bash
npx nx start box-model-rsd-nextjs    # Dev server with Turbopack
npx nx build box-model-rsd-nextjs   # Production build
```

## Critical Build Configuration

The build setup for StyleX with Turbopack in a monorepo is complex. **DO NOT modify these files without understanding the full pipeline:**

### Configuration Files

| File | Purpose |
|------|---------|
| `next.config.mjs` | Turbopack aliases, StyleX SWC plugin setup |
| `postcss.config.mjs` | CSS extraction for react-strict-dom |
| `babelLoader.config.js` | Babel plugin config for PostCSS |

### Key Configuration Points

#### 1. next.config.mjs

- Uses `@stylexswc/nextjs-plugin/turbopack` for StyleX compilation
- **MUST apply turbopack aliases AFTER the StyleX wrapper** to preserve them
- Requires `transpilePackages` for workspace libraries

```javascript
// Order matters: aliases must be set AFTER StyleX wrapper
const stylexWrapped = withStylexTurbopack(stylexConfig)(baseConfig);
export default {
  ...stylexWrapped,
  turbopack: {
    ...(stylexWrapped.turbopack ?? {}),
    resolveAlias: { /* aliases here */ },
  },
};
```

#### 2. StyleX Token Resolution

StyleX needs to resolve `@box-model/tokens/*` imports. Configuration requires:

```javascript
// In stylexConfig.rsOptions
unstable_moduleResolution: {
  type: 'commonJS',
  rootDir: workspaceRoot,        // Monorepo root, NOT app directory
  themeFileExtension: '.stylex', // For *.stylex.ts token files
},
aliases: {
  '@box-model/tokens/*': [path.join(workspaceRoot, 'dist/libs/tokens/*')],
},
```

#### 3. Platform Aliases

React Native to web aliasing:

```javascript
// turbopack.resolveAlias
'react-native': 'react-native-web',
'@react-navigation/native': './src/lib/react-navigation.ts',
```

The `react-navigation.ts` shim provides web-compatible navigation hooks.

### postcss.config.mjs

CSS extraction for react-strict-dom requires:

- `cwd` set to workspace root
- `include` patterns covering all RSD source files
- `babelConfig` importing from `babelLoader.config.js`

### babelLoader.config.js

Modifies the react-strict-dom preset to:

- Set correct `rootDir` for monorepo
- Set `themeFileExtension: '.stylex'` for token files
- Add `@box-model/tokens/*` alias

## Route Structure

Routes map to screens from `@box-model/rsd-app`:

| Route | Screen |
|-------|--------|
| `/` | `HomeScreen` |
| `/about` | `AboutScreen` |
| `/blogs` | `BlogsScreen` |
| `/blog/[slug]` | `BlogArticleScreen` |

## Adding New Routes

1. Create `src/app/<route>/page.tsx`
2. Import the screen from `@box-model/rsd-app`
3. Wrap with any Next.js-specific providers

```tsx
// src/app/example/page.tsx
import { ExampleScreen } from '@box-model/rsd-app';

export default function ExamplePage() {
  return <ExampleScreen />;
}
```

## Common Issues

### "Unexpected stylex.create call at runtime"

StyleX compilation is not happening. Check:
1. `transpilePackages` includes all RSD libraries
2. `rsOptions.importSources` includes `{ from: 'react-strict-dom', as: 'css' }`
3. Turbopack config is applied correctly

### Token resolution errors

If tokens can't be resolved:
1. Run `npx nx build tokens` to generate token files
2. Check `unstable_moduleResolution.rootDir` points to monorepo root
3. Check `themeFileExtension` is `.stylex`

### react-native import errors

If Turbopack tries to parse react-native directly:
1. Check `turbopack.resolveAlias['react-native']` is set
2. Ensure aliases are applied AFTER the StyleX wrapper

## Important Notes

- **NEVER create screens in this app** - All screens come from `@box-model/rsd-app`
- **NEVER create UI components in this app** - All components come from `@box-model/rsd`
- **NEVER add styles for UI elements** - Styling belongs in the component libraries
- Page files should only import and render screens from `@box-model/rsd-app`
- The `global.css` and `layout.tsx` files are for Next.js App Router setup only

## Testing

```bash
npx nx test box-model-rsd-nextjs     # Unit tests
npx nx e2e box-model-rsd-nextjs-e2e  # E2E tests
```
