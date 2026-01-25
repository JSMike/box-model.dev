# @box-model/rsd

React Strict DOM implementation of the Box Model design system.

## Overview

This library provides React components built with [React Strict DOM](https://github.com/nicksaunders/react-strict-dom) for cross-platform compatibility (web, iOS, Android).

## Status

**Scaffold** - This package establishes IP provenance and intent for future multiplatform component development.

## Design Principles

### React Strict DOM Patterns

All components use RSD primitives:

- `html.*` elements instead of native HTML (`html.div`, `html.span`, `html.button`)
- `css.create()` for styles (StyleX-based, compile-time CSS-in-JS)
- `css.defineVars()` for design tokens
- `css.createTheme()` for theme variations

### Example Component

```tsx
import { css, html } from 'react-strict-dom';
import { tokens } from '../styles/tokens';

const styles = css.create({
  button: {
    backgroundColor: tokens.colorPrimary,
    paddingBlock: tokens.spacingMd,
    paddingInline: tokens.spacingLg,
    borderRadius: tokens.radiusMd,
    borderWidth: 0,
    cursor: 'pointer',
  },
});

export function Button({ children, onClick }: ButtonProps) {
  return (
    <html.button onClick={onClick} style={styles.button}>
      <html.span>{children}</html.span>
    </html.button>
  );
}
```

## Platform-Specific Overrides

Components support platform-specific implementations via file extensions:

```
src/button/
├── index.ts           # Default/shared implementation
├── index.web.ts       # Web-specific (optional)
├── index.native.ts    # Native-specific (optional)
```

## Relationship to @box-model/web

| Package | Technology | Use Case |
|---------|-----------|----------|
| `@box-model/web` | Lit Web Components | Web-only, framework-agnostic |
| `@box-model/rsd` | React Strict DOM | Cross-platform React (web + native) |

Both packages share design tokens from `@box-model/tokens`.

## Development

```bash
# Run Storybook
npx nx storybook rsd

# Build library
npx nx build-lib rsd

# Run tests
npx nx test rsd
```

## References

- [React Strict DOM](https://github.com/nicksaunders/react-strict-dom)
- [StyleX Documentation](https://stylexjs.com/)
