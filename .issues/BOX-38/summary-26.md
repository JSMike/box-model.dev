# Session 26

**Date:** 2026-01-24

## Completed
- Added `importSources` to the StyleX rsOptions so the SWC compiler recognizes `css` imports from `react-strict-dom` and transforms `defineVars`.

## Current Status
- Expect `stylex.defineVars` runtime error to resolve once build reruns.

## Files Changed
- `apps/box-model-rsd-nextjs/next.config.mjs` - added `rsOptions.importSources` for `@stylexjs/stylex` and `react-strict-dom`.

## Next Steps
- Re-run `npx nx run box-model-rsd-nextjs:build` to confirm StyleX transforms run.
