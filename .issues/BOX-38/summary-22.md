# Session 22

**Date:** 2026-01-24

## Completed
- Switched React Strict DOM Babel plugin reference to an absolute file path to avoid package exports errors.

## Current Status
- Babel config no longer uses the unexported `react-strict-dom/babel/plugin` subpath; Next build needs rerun to confirm.

## Files Changed
- `apps/box-model-rsd-nextjs/babelLoader.config.js` - resolve plugin via `node_modules/react-strict-dom/babel/plugin.js` path.

## Next Steps
- Re-run `NX_DAEMON=false npx nx run box-model-rsd-nextjs:start` and share any new errors.
