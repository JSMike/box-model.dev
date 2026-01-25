# Session 21

**Date:** 2026-01-24

## Completed
- Reworked Next.js Babel loader config to be Turbopack-serializable (no function plugins) while preserving StyleX and React Strict DOM transforms.

## Current Status
- Turbopack should accept the loader options; Next build needs rerun to confirm.

## Files Changed
- `apps/box-model-rsd-nextjs/babelLoader.config.js` - replaced dynamic preset wiring with plain plugin entries for RSD + StyleX (custom module resolution and tokens alias).

## Next Steps
- Re-run `NX_DAEMON=false npx nx run box-model-rsd-nextjs:start` and share any remaining errors.
