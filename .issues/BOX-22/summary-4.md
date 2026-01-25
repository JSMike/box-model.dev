# Session 4

**Date:** 2026-01-24

## Completed
- Ensured Storybook dependency scan treats TS/TSX correctly by setting a loader in the Vite Babel plugin.

## Current Status
- Awaiting Storybook restart to confirm dependency scan succeeds and runtime stylex error is resolved.

## Files Changed
- `libs/rsd/.storybook/vite.storybook.ts` - add loader mapping for TS/TSX/JSX files.

## Next Steps
- Restart Storybook and confirm the dependency scan error is gone.
