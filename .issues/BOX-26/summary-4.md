# Session 4

**Date:** 2026-01-24

## Completed
- Added Vite aliases for RSD and RSD Storybook to resolve `@box-model/storybook-utils` to the local helper:
  - `libs/rsd/vite.config.ts`
  - `libs/rsd/.storybook/vite.storybook.ts`
- Switched RSD MDX docs back to the package-style import for `ComponentDocs` now that the alias resolves.

## Current Status
- Alias should remove the import resolution error. Needs a Storybook restart to verify.

## Files Changed
- `libs/rsd/vite.config.ts`
- `libs/rsd/.storybook/vite.storybook.ts`
- `libs/rsd/src/badge/badge.mdx`
- `libs/rsd/src/button/button.mdx`
- `libs/rsd/src/card/card.mdx`

## Next Steps
- Restart `npx nx storybook rsd` and confirm the docs/API render without missing module errors.
