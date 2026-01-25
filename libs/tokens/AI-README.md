# libs/tokens - AI Guide

Design tokens library using Style Dictionary. Generates CSS, SCSS, JS, TypeScript, and StyleX outputs.

## Technology Stack

- **Style Dictionary**: Token transformation and multi-platform output
- **Custom formats**: `rsd/stylex` format for React Strict DOM

## Build Command

```bash
npx nx build tokens
```

Output is generated to `dist/libs/tokens/`:
- `tokens.css` - CSS custom properties
- `_tokens.scss` - SCSS variables
- `tokens.js` - ES6 JavaScript exports
- `tokens.d.ts` - TypeScript declarations
- `tokens.stylex.ts` - StyleX `css.defineVars()` exports

## Token Structure

Tokens are defined in JavaScript files under `src/`:

```
libs/tokens/src/
├── raw/           # Primitive values (colors, spacing scales)
├── semantic/      # Semantic tokens (referencing raw values)
└── theme/         # Theme-specific overrides
    └── box-model-ui/
```

## Token Definition Pattern

```javascript
// libs/tokens/src/semantic/component/button.js
export default {
  component: {
    button: {
      'font-family': { $value: '{typography.font-family.mono}' },
      'font-size-sm': { $value: '{typography.font-size.sm}' },
      'padding-block-sm': { $value: '{space.2}' },
      'primary-background-rest': { $value: '{color.brand.primary}' },
      'primary-background-hover': { $value: '{color.brand.primary-hover}' },
    },
  },
};
```

## StyleX Output Format

The `rsd/stylex` format generates grouped `css.defineVars()` exports:

```typescript
// dist/libs/tokens/tokens.stylex.ts (auto-generated)
import { css } from 'react-strict-dom';

export const buttonTokens = css.defineVars({
  fontFamily: 'var(--typography-font-family-mono)',
  fontSizeSm: 'var(--typography-font-size-sm)',
  paddingBlockSm: 'var(--space-2)',
  primaryBackgroundRest: 'var(--color-brand-primary)',
});
```

## Importing Tokens

### In libs/web (Lit)

```scss
// Use CSS custom properties directly
.button {
  font-family: var(--component-button-font-family);
  padding: var(--component-button-padding-block-sm);
}
```

### In libs/rsd (React Strict DOM)

```typescript
import { buttonTokens } from '@box-model/tokens/tokens.stylex';

const styles = css.create({
  base: {
    fontFamily: buttonTokens.fontFamily,
    paddingTop: buttonTokens.paddingBlockSm,
  },
});
```

## Adding New Tokens

1. Add token definition in appropriate `src/` subdirectory
2. Run `npx nx build tokens`
3. Import in consuming libraries

## Token Naming Conventions

- Use kebab-case in definitions: `font-size-sm`, `padding-block`
- Generated StyleX exports use camelCase: `fontSizeSm`, `paddingBlock`
- Group by category: `component.button.*`, `color.feedback.*`, `typography.*`

## Important Notes

- **Always rebuild tokens** after changes: `npx nx build tokens`
- **StyleX file extension**: Output is `.stylex.ts` (used by StyleX module resolution)
- **libs/rsd imports**: Must use the built output from `dist/libs/tokens/`
