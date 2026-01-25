# Session 14

**Date:** 2026-01-24

## Completed
- Added Turbopack resolve aliases in the Next.js config so `react-native` resolves to `react-native-web` during builds.
- Kept webpack aliases aligned with the Turbopack aliases.

## Current Status
- Next.js build should no longer parse the Flow-based `react-native` entry file.

## Files Changed
- `apps/box-model-rsd-nextjs/next.config.ts` - add `turbopack.resolveAlias` entries and align webpack aliases.

## Next Steps
- Re-run `npx nx run box-model-rsd-nextjs:build` (or `:start`) to confirm the build passes.
