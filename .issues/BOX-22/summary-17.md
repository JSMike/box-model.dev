# Session 17

**Date:** 2026-01-24

## Completed
- Reworked the RSD Babel config to derive plugins from `react-strict-dom/babel-preset` and override the StyleX theme file extension without importing unexported preset internals.
- Used Playwright to inspect the iframe response and confirmed the 500 error is due to the PostCSS config failing to load `react-strict-dom/babel/plugin`.

## Current Status
- Storybook still returns a 500 until the server is restarted with the updated Babel config.

## Files Changed
- `libs/rsd/babel.config.js` - build plugin list from the preset and override StyleX module resolution options.

## Next Steps
- Restart Storybook (`npx nx storybook rsd`) and confirm the iframe no longer reports the PostCSS config load error.
