# libs/storybook-utils - AI Guide

Shared Storybook helpers and documentation components used across multiple Storybook instances.

## Purpose

Provides reusable utilities for Storybook documentation:
- Color palette documentation components
- Documentation layout components and styles

## Exports

```typescript
import { ColorPalette, Docs } from '@box-model/storybook-utils';
```

### Colors

Color documentation components for displaying design token palettes in Storybook.

### Docs

Documentation wrapper components and associated styles for consistent MDX documentation.

## Usage

Import in `.storybook/` configurations or directly in MDX files:

```tsx
// In component.mdx
import { Docs } from '@box-model/storybook-utils';

<Docs>
  Documentation content here
</Docs>
```

## File Structure

```
libs/storybook-utils/src/
├── colors/         # Color palette components
├── docs/           # Documentation components
│   ├── docs.tsx
│   ├── docs.scss
│   └── index.ts
└── index.ts        # Barrel export
```

## Adding New Utilities

1. Create directory under `src/` for the new utility category
2. Add component files and barrel export (`index.ts`)
3. Export from `libs/storybook-utils/src/index.ts`
