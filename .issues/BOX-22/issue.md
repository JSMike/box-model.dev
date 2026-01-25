# BOX-22: Scaffold @box-model/rsd library for React Strict DOM

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | done                                |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | BOX-20 (deferred)                   |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   | BOX-20                              |
| Priority     | medium                              |

## Summary

Create a minimal placeholder library for `@box-model/rsd` (React Strict DOM). Even a scaffolded package with clear README establishes IP provenance and intent for future multiplatform component development.

## Context

This was identified during BOX-20 (project restructuring for IP timestamping) but deferred to keep that issue focused on the rename operation.

**React Strict DOM (RSD)** is Meta's approach to building components that work across web, iOS, and Android from a single codebase. The `@box-model/rsd` package would eventually provide:
- Multiplatform components using RSD primitives
- Shared design tokens from `@box-model/tokens`
- Consistent API with `@box-model/web` where applicable

## Package Naming Rationale

| Package | Name | Reason |
|---------|------|--------|
| Web Components (Lit) | `@box-model/web` | Implementation-specific acronym |
| React Strict DOM | `@box-model/rsd` | Implementation-specific acronym, parallel with `wc` |

Both use acronyms that developers in those ecosystems will immediately recognize.

**Rejected alternatives for RSD:**
- `@box-model/universal` — too vague, misleading
- `@box-model/native` — doesn't convey web support (RSD supports web + native)
- `@box-model/core` — doesn't communicate what it is

## Structure

Mirror `@box-model/web` library structure:

```
libs/rsd/
├── .eslintrc.json
├── .storybook/           # React Storybook (@storybook/react-vite)
│   ├── main.ts
│   ├── preview.ts
│   └── vite.storybook.ts
├── package.json          # @box-model/rsd, react-strict-dom peer dep
├── project.json          # NX project configuration
├── tsconfig*.json        # TypeScript configs
├── vite.config.ts        # Vite build with RSD babel preset
├── vitest.setup.ts
├── README.md
└── src/
    ├── index.ts
    ├── styles/
    │   ├── tokens.ts     # css.defineVars()
    │   └── theme.ts      # css.createTheme()
    └── [component]/
        ├── index.ts
        ├── index.web.ts      # Optional web override
        ├── index.native.ts   # Optional native override
        ├── [component].tsx
        ├── [component].styles.ts
        ├── [component].spec.ts
        ├── [component].stories.tsx
        └── [component].mdx
```

## Component Pattern

All components must use react-strict-dom patterns:

```tsx
import { css, html } from 'react-strict-dom';

const styles = css.create({
  button: {
    default: { backgroundColor: 'blue', padding: 12 },
    ':hover': { backgroundColor: 'darkblue' },
  },
});

export function Button({ children, onClick }) {
  return (
    <html.button onClick={onClick} style={styles.button}>
      <html.span>{children}</html.span>
    </html.button>
  );
}
```

## Configuration Updates Needed

- `tsconfig.base.json`: Add path alias `"@box-model/rsd/*": ["libs/rsd/src/*"]`

## Acceptance Criteria

- [x] `libs/rsd/` directory mirrors `libs/web/` structure
- [x] Vite configured with react-strict-dom babel preset
- [x] React Storybook (@storybook/react-vite) configured
- [ ] Design tokens via `css.defineVars()` *(deferred - requires StyleX config)*
- [x] Initial components (button, card, badge) using RSD patterns
- [x] Components use `html.*` elements (no div/span/label)
- [x] Styles use `css.create()` (no SCSS)
- [x] Path alias configured in tsconfig.base.json
- [x] `npx nx build rsd` succeeds
- [x] `npx nx storybook rsd` launches
- [x] `npx nx test rsd` passes

## References

- Related issues: BOX-20 (parent restructuring), BOX-21 (LICENSE file)
- React Strict DOM: https://github.com/nicksaunders/react-strict-dom
- RSD documentation: https://reactnative.dev/docs/react-strict-dom

## Notes for Implementation

The goal is IP provenance, not a complete implementation. A minimal scaffold with:
- Clear README stating intent
- Proper package metadata
- Placeholder exports with TODO comments

...is sufficient to establish timestamped evidence of the planned direction.
