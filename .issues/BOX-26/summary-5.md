# Session 5

**Date:** 2026-01-24

## Completed
- Added aliases so RSD (and its Storybook) can resolve `@box-model/web` sources for the shared `storybook-utils` package:
  - `@box-model/web/<path>` → `libs/web/src/<path>`
  - `@box-model/web` → `libs/web/src/index.ts`
- Applied aliases in both the library Vite config and the Storybook Vite config.

## Current Status
- This should unblock imports from `storybook-utils` that reference `@box-model/web/*` and its SCSS. Needs a Storybook restart to verify the errors are gone.

## Files Changed
- `libs/rsd/vite.config.ts`
- `libs/rsd/.storybook/vite.storybook.ts`

## Next Steps
- Restart `npx nx storybook rsd` and confirm the `@box-model/web` import and SCSS resolution errors are resolved.
