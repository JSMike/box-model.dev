# Session 15

**Date:** 2026-01-24

## Completed
- Swapped react-strict-dom preset for explicit plugins and configured StyleX module resolution to accept `.stylex.ts` theme files.

## Current Status
- Storybook error about StyleX defineVars hashing should be resolved, but needs verification.

## Files Changed
- `libs/rsd/babel.config.js` - configure react-strict-dom and StyleX plugins with `.stylex.ts` support.

## Next Steps
- Run `npx nx storybook rsd` to confirm the StyleX hashing error is gone.
