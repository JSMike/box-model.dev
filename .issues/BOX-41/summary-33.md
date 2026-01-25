# Session 33

**Date:** 2026-01-24

## Completed
- Removed unsupported Strict DOM style properties (text decoration thickness/offset, list style types/positions, overflowX, whiteSpace, sticky positioning).
- Shifted AppNav into the ScrollView and enabled sticky headers via `stickyHeaderIndices` to avoid CSS sticky warnings.

## Current Status
- Awaiting restart to confirm the Strict DOM warnings are cleared on native.

## Files Changed
- `libs/rsd/src/link/link.tsx`
- `libs/rsd-app/src/components/app-nav.tsx`
- `libs/rsd-app/src/components/app-shell.tsx`
- `libs/rsd-app/src/components/markdown-renderer.tsx`
- `libs/rsd/src/list/list.tsx`
- `libs/rsd/src/table/table.tsx`
- `libs/rsd-app/src/home/home.tsx`

## Next Steps
- Restart the Expo app/bundler and verify the warnings no longer appear.
