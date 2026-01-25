# Session 5

**Date:** 2026-01-24

## Completed
- Aligned RSD Vite/Storybook config with recommended react-strict-dom setup (babel config, react plugin exclude).
- Fixed RSD Babel config structure and added filename normalization for Vite query strings.

## Current Status
- Awaiting Storybook restart to verify runtime and dependency scan errors are resolved.

## Files Changed
- `libs/rsd/babel.config.js` - corrected preset config and added filename normalization plugin.
- `libs/rsd/vite.config.ts` - use react plugin with RSD-compatible exclude and babel config file.
- `libs/rsd/.storybook/vite.storybook.ts` - use react plugin with babel config file and exclude pattern.

## Next Steps
- Restart Storybook and confirm `stylex.create` runtime error is gone.
