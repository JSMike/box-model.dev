# Session 8

**Date:** 2026-01-24

## Completed
- Updated `rsd-app` tsconfig path mappings to consume built `@box-model/rsd` types from `dist` instead of source files, preventing Storybook files from entering the typecheck program.

## Current Status
- `rsd-app:build-lib` should no longer pull `libs/rsd/src/*.stories.tsx` into the typecheck.

## Files Changed
- `libs/rsd-app/tsconfig.lib.json` - mapped `@box-model/rsd` imports to `dist/libs/rsd` and removed source include.

## Next Steps
- Ensure `dist/libs/rsd` exists (run `npx nx run rsd:build-lib` if needed), then re-run `npx nx run rsd-app:build-lib`.
