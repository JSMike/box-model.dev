# Session 30

**Date:** 2026-01-24

## Completed
- Added native-safe link handling for `Link` and `Button` so `href` is only passed on web and native opens URLs via `Linking`.

## Current Status
- Awaiting restart to confirm the React Strict DOM `<a> href` error is resolved on native.

## Files Changed
- `libs/rsd/src/link/link.tsx`
- `libs/rsd/src/button/button.tsx`

## Next Steps
- Restart the Expo app/bundler and verify link/button navigation works without `<a> href` errors.
