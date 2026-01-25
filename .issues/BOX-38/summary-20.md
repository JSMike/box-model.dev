# Session 20

**Date:** 2026-01-24

## Completed
- Renamed Next.js config to ESM `.mjs` and removed TS type annotations to avoid Nx plugin `exports is not defined` error.

## Current Status
- Nx should now load Next config via `next.config.mjs`; build needs rerun to verify.

## Files Changed
- `apps/box-model-rsd-nextjs/next.config.mjs` - JS ESM config replacing TS version.
- `apps/box-model-rsd-nextjs/next.config.ts` - removed (renamed to `.mjs`).

## Next Steps
- Re-run `NX_DAEMON=false npx nx run box-model-rsd-nextjs:start`.
