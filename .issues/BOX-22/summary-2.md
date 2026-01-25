# Session 2

**Date:** 2026-01-24

## Completed
- Fixed Storybook RSD Babel transform to handle Vite query strings so runtime modules are compiled.

## Current Status
- Storybook error should be resolved after restart; not re-verified in this session.

## Files Changed
- `libs/rsd/.storybook/vite.storybook.ts` - strip query params from module IDs before extension checks.

## Next Steps
- Restart Storybook and confirm the stylex runtime error is gone.
