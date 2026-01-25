# libs/rsd - AI Guide

React Strict DOM component library providing cross-platform UI components for web and React Native.

## Reference Documentation

**Read `rsd-llms.md` in this directory** for comprehensive React Strict DOM API documentation, including:
- Core differences from React DOM (`html.*` elements, `css.create()`)
- Styling system (pseudo-states, media queries, dynamic styles)
- Theming with `css.defineVars()` and `css.createTheme()`
- Cross-platform constraints and limitations
- Migration guide from React DOM
- Common mistakes and best practices

## Technology Stack

- **React Strict DOM**: Cross-platform React using `html.*` elements
- **StyleX**: CSS-in-JS with build-time extraction via `css.create()`
- **Design Tokens**: StyleX variables from `tokens.stylex.ts`

## Component Pattern

```tsx
// libs/rsd/src/<component>/<component>.tsx
import { css, html } from 'react-strict-dom';
import { componentTokens } from '../tokens/tokens.stylex';

export interface ComponentProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const styles = css.create({
  base: {
    // Always use longhand properties for React Native compatibility
    paddingTop: componentTokens.paddingBlock,
    paddingBottom: componentTokens.paddingBlock,
    paddingLeft: componentTokens.paddingInline,
    paddingRight: componentTokens.paddingInline,
    borderRadius: 0, // REQUIRED: no rounded corners
  },
  primary: {
    backgroundColor: componentTokens.primaryBackground,
  },
  secondary: {
    backgroundColor: componentTokens.secondaryBackground,
  },
});

export function Component({ children, variant = 'primary' }: ComponentProps) {
  return (
    <html.div style={[styles.base, styles[variant]]}>
      {children}
    </html.div>
  );
}
```

## Critical Conventions

### StyleX Rules

1. **No shorthand properties** - Use `paddingTop`, `paddingLeft`, etc. instead of `padding`
2. **No `border-radius`** - Always set to `0` (square corners required)
3. **Use design tokens** - Import from `../tokens.stylex` for consistency
4. **Conditional styles via arrays** - `style={[styles.base, disabled && styles.disabled]}`

### Interactive States

Use StyleX pseudo-selectors for interactive states:

```tsx
const styles = css.create({
  button: {
    backgroundColor: {
      default: tokens.backgroundRest,
      ':hover': tokens.backgroundHover,
      ':active': tokens.backgroundActive,
    },
  },
});
```

### Responsive Styles

Use StyleX media queries:

```tsx
const styles = css.create({
  container: {
    flexDirection: {
      default: 'column',
      '@media (min-width: 768px)': 'row',
    },
  },
});
```

## File Structure

Each component in `libs/rsd/src/<component>/`:

| File | Purpose |
|------|---------|
| `<component>.tsx` | Component using `html.*` elements |
| `<component>.stories.tsx` | Storybook stories |
| `<component>.mdx` | Storybook documentation |
| `<component>.spec.tsx` | Vitest unit tests |
| `index.ts` | Barrel export |

## Storybook

Run: `npx nx storybook rsd -o`

Stories should use the component directly without inline styles:

```tsx
// <component>.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './component';

const meta: Meta<typeof Component> = {
  component: Component,
  title: 'Components/Component',
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Content',
  },
};
```

## Testing

Run: `npx nx test rsd`

Tests use Vitest with React Testing Library:

```tsx
// <component>.spec.tsx
import { render, screen } from '@testing-library/react';
import { Component } from './component';

describe('Component', () => {
  it('renders children', () => {
    render(<Component>Test</Component>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

## Adding New Components

1. Create directory: `libs/rsd/src/<component>/`
2. Create files: `<component>.tsx`, `index.ts`, `<component>.stories.tsx`, `<component>.mdx`, `<component>.spec.tsx`
3. Add tokens to `libs/rsd/src/tokens.stylex.ts` if needed
4. Export from `libs/rsd/src/index.ts`

## Token System

Design tokens are defined as StyleX variables in `libs/rsd/src/tokens.stylex.ts`. These are generated from Style Dictionary and imported into each component:

```tsx
import { buttonTokens, cardTokens } from '../tokens/tokens.stylex';
```
