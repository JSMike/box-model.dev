# Session 25

**Date:** 2026-01-24

## Completed
- Removed StyleX SWC `rsOptions.include` globs after Turbopack rejected them (`Failed to create reference on StyleXOptions.include`).

## Current Status
- StyleX config no longer uses include filtering; build needs rerun to see if `defineVars` is now transformed.

## Files Changed
- `apps/box-model-rsd-nextjs/next.config.mjs` - removed `rsOptions.include`.

## Next Steps
- Re-run `npx nx run box-model-rsd-nextjs:build` and confirm whether the `stylex.defineVars` runtime error persists.
