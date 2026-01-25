# Plan: BOX-22 - Scaffold @box-model/rsd library for React Strict DOM

<!-- Plan Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Created      | 2026-01-24                          |
| Author       | Agent                               |
| Approach     | Proposed                            |

## Approach

Create a comprehensive React Strict DOM library that mirrors `@box-model/web` in structure and build strategy. This is a standard React library using Vite for bundling, with React Storybook for component documentation.

All components from `@box-model/web` will be recreated using react-strict-dom patterns:
- Use `html.*` elements instead of native HTML (`html.div`, `html.span`, `html.button`, etc.)
- Use `css.create()` for styles instead of SCSS
- Support platform-specific overrides via `.web.ts` and `.native.ts` file extensions

## Directory Structure

Mirror `libs/web/` structure:

```
libs/rsd/
├── .eslintrc.json
├── .storybook/
│   ├── main.ts              # @storybook/react-vite configuration
│   ├── preview.ts           # Storybook preview config
│   └── vite.storybook.ts    # Vite config for Storybook
├── package.json             # @box-model/rsd, react-strict-dom peer dep
├── project.json             # NX project configuration
├── tsconfig.json
├── tsconfig.lib.json
├── tsconfig.spec.json
├── tsconfig.storybook.json
├── vite.config.ts           # Vite build configuration
├── vitest.setup.ts
├── README.md
└── src/
    ├── index.ts             # Main exports
    ├── styles/
    │   ├── tokens.ts        # CSS variables via css.defineVars()
    │   └── theme.ts         # Theme definitions via css.createTheme()
    └── [component]/
        ├── index.ts         # Default implementation
        ├── index.web.ts     # Web-specific override (optional)
        ├── index.native.ts  # Native-specific override (optional)
        ├── [component].tsx  # Component implementation
        ├── [component].styles.ts  # Styles via css.create()
        ├── [component].spec.ts
        ├── [component].stories.tsx
        └── [component].mdx
```

## Component Pattern

Each component follows react-strict-dom conventions:

```tsx
// src/button/button.tsx
import { css, html } from 'react-strict-dom';
import { tokens } from '../styles/tokens';

const styles = css.create({
  button: {
    default: {
      backgroundColor: tokens.colorPrimary,
      paddingBlock: tokens.spacingMd,
      paddingInline: tokens.spacingLg,
      borderRadius: tokens.radiusMd,
      borderWidth: 0,
      cursor: 'pointer',
    },
    ':hover': {
      backgroundColor: tokens.colorPrimaryHover,
    },
    ':active': {
      backgroundColor: tokens.colorPrimaryActive,
    },
  },
  text: {
    color: tokens.colorOnPrimary,
    fontSize: tokens.fontSizeMd,
    fontWeight: tokens.fontWeightBold,
  },
});

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
}

export function Button({ children, onClick, disabled }: ButtonProps) {
  return (
    <html.button onClick={onClick} disabled={disabled} style={styles.button}>
      <html.span style={styles.text}>{children}</html.span>
    </html.button>
  );
}
```

## Files to Create

### Root Configuration

| File | Purpose |
|------|---------|
| `libs/rsd/package.json` | Package metadata, react-strict-dom peer dependency |
| `libs/rsd/project.json` | NX project config (build, test, storybook targets) |
| `libs/rsd/vite.config.ts` | Vite build with react-strict-dom babel preset |
| `libs/rsd/tsconfig.json` | TypeScript config extending base |
| `libs/rsd/tsconfig.lib.json` | Library build config |
| `libs/rsd/tsconfig.spec.json` | Test config |
| `libs/rsd/tsconfig.storybook.json` | Storybook config |
| `libs/rsd/.eslintrc.json` | ESLint config |
| `libs/rsd/vitest.setup.ts` | Test setup |
| `libs/rsd/README.md` | Documentation |

### Storybook Configuration

| File | Purpose |
|------|---------|
| `libs/rsd/.storybook/main.ts` | @storybook/react-vite setup |
| `libs/rsd/.storybook/preview.ts` | Global decorators, theme provider |
| `libs/rsd/.storybook/vite.storybook.ts` | Vite config with RSD babel preset |

### Initial Components (Placeholders)

Start with a few representative components to establish patterns:

| Component | Purpose |
|-----------|---------|
| `src/button/` | Interactive element, demonstrates events |
| `src/card/` | Container component, demonstrates slots/children |
| `src/badge/` | Simple presentational component |
| `src/styles/tokens.ts` | Design token definitions via `css.defineVars()` |
| `src/styles/theme.ts` | Theme overrides via `css.createTheme()` |

## Files to Modify

| File | Changes |
|------|---------|
| `tsconfig.base.json` | Add `"@box-model/rsd/*": ["libs/rsd/src/*"]` |
| `.issues/index.md` | Update BOX-22 status |

## Implementation Steps

### Phase 1: Project Scaffold

1. [ ] Create `libs/rsd/` directory
2. [ ] Create `package.json` with dependencies:
   - `react-strict-dom` as peer dependency
   - `react` and `react-dom` as peer dependencies
3. [ ] Create `project.json` with NX targets:
   - `build` - Vite library build
   - `build-storybook` - Storybook static build
   - `storybook` - Dev server
   - `test` - Vitest
   - `lint` - ESLint
4. [ ] Create TypeScript configs mirroring `libs/web/`
5. [ ] Create `vite.config.ts` with react-strict-dom babel preset
6. [ ] Create `.eslintrc.json`

### Phase 2: Storybook Setup

7. [ ] Create `.storybook/main.ts` using `@storybook/react-vite`
8. [ ] Create `.storybook/preview.ts` with theme provider
9. [ ] Create `.storybook/vite.storybook.ts` with RSD babel config

### Phase 3: Design Tokens

10. [ ] Create `src/styles/tokens.ts` using `css.defineVars()`
11. [ ] Create `src/styles/theme.ts` with light/dark themes via `css.createTheme()`

### Phase 4: Placeholder Components

12. [ ] Create `src/button/` with RSD patterns
13. [ ] Create `src/card/` demonstrating children/composition
14. [ ] Create `src/badge/` as simple presentational component
15. [ ] Create `src/index.ts` with exports

### Phase 5: Configuration Updates

16. [ ] Update `tsconfig.base.json` with path alias
17. [ ] Verify `npx nx build rsd` succeeds
18. [ ] Verify `npx nx storybook rsd` launches
19. [ ] Verify `npx nx test rsd` passes

## Key Dependencies

```json
{
  "peerDependencies": {
    "react": "^18.2.0 || ^19.0.0",
    "react-dom": "^18.2.0 || ^19.0.0",
    "react-strict-dom": "^0.0.x"
  },
  "devDependencies": {
    "@storybook/react-vite": "^8.x",
    "@vitejs/plugin-react": "^4.x",
    "react-strict-dom": "^0.0.x"
  }
}
```

## Vite Configuration Notes

The vite.config.ts needs react-strict-dom babel preset:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: [
          ['react-strict-dom/babel-preset', {
            dev: process.env.NODE_ENV !== 'production',
            rootDir: process.cwd(),
          }]
        ]
      }
    })
  ],
  // ... rest of config mirroring libs/web/vite.config.ts
});
```

## Platform-Specific Overrides

Support optional `.web.ts` and `.native.ts` extensions:

```
src/button/
├── index.ts           # Default/shared implementation
├── index.web.ts       # Web-specific (cursor: pointer, etc.)
├── index.native.ts    # Native-specific (haptic feedback, etc.)
```

Vite resolve config should prioritize platform extensions:

```typescript
resolve: {
  extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.js']
}
```

## Risks & Considerations

| Risk | Mitigation |
|------|------------|
| react-strict-dom version instability | Pin to specific version, document upgrade path |
| Babel preset complexity | Start with web-only, add native support later |
| Storybook RSD compatibility | Use standard @storybook/react-vite, test early |
| Token sync with @box-model/tokens | Import from tokens package or duplicate for now |

## Success Criteria

- [ ] `npx nx build rsd` produces valid ESM output
- [ ] `npx nx storybook rsd` shows components with correct styles
- [ ] `npx nx test rsd` passes
- [ ] Components use `html.*` elements (no div/span/etc.)
- [ ] Styles use `css.create()` (no SCSS)
- [ ] README explains RSD patterns and relationship to @box-model/web
