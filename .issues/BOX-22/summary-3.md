# Session 3

**Date:** 2026-01-24

## Completed
- Updated Storybook Vite config to use `vite-plugin-babel` so RSD runtime gets StyleX compilation during deps optimization.

## Current Status
- Awaiting Storybook restart to verify the runtime error is resolved.

## Files Changed
- `libs/rsd/.storybook/vite.storybook.ts` - replace custom transform with `vite-plugin-babel` using RSD preset.

## Next Steps
- Restart Storybook and confirm the stylex runtime error is gone.
