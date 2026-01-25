# Session 12

**Date:** 2026-01-24

## Completed
- Added a Next.js runtime tsconfig to follow the app/spec split pattern.
- Converted the Next.js tsconfig to a references-only root and added app/spec references.
- Left the spec tsconfig independent; common config stays in `tsconfig.json`.

## Current Status
- `box-model-rsd-nextjs` now follows the standard `tsconfig.json` + `tsconfig.app.json` + `tsconfig.spec.json` layout.

## Files Changed
- `apps/box-model-rsd-nextjs/tsconfig.json` - now references `tsconfig.app.json` and removes file globs.
- `apps/box-model-rsd-nextjs/tsconfig.app.json` - new runtime config with includes/excludes.
- `apps/box-model-rsd-nextjs/tsconfig.spec.json` - no app reference.

## Next Steps
- Re-run `npx nx run box-model-rsd-nextjs:start` and allow Nx to sync project references.
