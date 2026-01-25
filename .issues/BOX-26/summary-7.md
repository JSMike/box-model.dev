# Session 7

**Date:** 2026-01-24

## Completed
- Restored `@box-model/storybook-utils` to the real utility package and mapped `@box-model/web` imports to built artifacts to avoid parsing Lit source:
  - `@box-model/web/styles/*` → `dist/libs/web/styles/_*.scss`
  - `@box-model/web/*` → `dist/libs/web/*.js`
  - `@box-model/web` → `dist/libs/web/index.js`
- Applied in both `libs/rsd/vite.config.ts` and `.storybook/vite.storybook.ts`.

## Current Status
- Should let Storybook resolve the utils without parsing decorators or missing SCSS. Needs a restart to verify the prior decorator/SCSS errors are cleared.

## Files Changed
- `libs/rsd/vite.config.ts`
- `libs/rsd/.storybook/vite.storybook.ts`

## Next Steps
- Restart `npx nx storybook rsd` and confirm there are no decorator/SCSS resolution errors. If new errors surface, share the exact message.
