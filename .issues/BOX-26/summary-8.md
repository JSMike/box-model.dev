# Session 8

**Date:** 2026-01-24

## Completed
- Added Storybook-only TypeScript path overrides to point `@box-model/web` imports at dist outputs and keep the local shim for `@box-model/storybook-utils`:
  - `libs/rsd/tsconfig.storybook.json` now maps:
    - `@box-model/web/styles/*` → `../../dist/libs/web/styles/_*.scss`
    - `@box-model/web/*` → `../../dist/libs/web/*`
    - `@box-model/web` → `../../dist/libs/web/index.js`
    - `@box-model/storybook-utils` → `../storybook-utils.ts`

## Current Status
- Should prevent docgen from parsing Lit source and resolve the SCSS import for Storybook. Needs a Storybook restart to verify the decorator/SCSS errors are gone.

## Files Changed
- `libs/rsd/tsconfig.storybook.json`

## Next Steps
- Restart `npx nx storybook rsd` and confirm the previous errors are resolved. If any remain, share the new error text.
