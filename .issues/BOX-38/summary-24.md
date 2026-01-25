# Session 24

**Date:** 2026-01-24

## Completed
- Explicitly configured StyleX SWC `rsOptions.include` to cover the Next app and RSD/RSD-app sources in the monorepo.

## Current Status
- StyleX transform should now run on `libs/rsd/src/*.stylex.ts` and RSD app components; build needs rerun to confirm.

## Files Changed
- `apps/box-model-rsd-nextjs/next.config.mjs` - added `rsOptions.include` globs for app and libs.

## Next Steps
- Re-run `npx nx run box-model-rsd-nextjs:build` and verify whether the `stylex.defineVars` runtime error is resolved.
