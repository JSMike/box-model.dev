# Session 11

**Date:** 2026-01-24

## Completed
- Updated RSD app TypeScript configs to align better with project references.
- Removed cross-project includes from the Expo app tsconfig and added explicit references.
- Added references to the shared RSD app library in the Next.js tsconfig.

## Current Status
- Apps now reference `libs/rsd-app` (and `libs/rsd` for Expo) via project references instead of direct include paths.

## Files Changed
- `apps/box-model-rsd-expo/tsconfig.app.json` - removed direct `libs/rsd` and `libs/rsd-app` includes.
- `apps/box-model-rsd-expo/tsconfig.json` - added references to `libs/rsd-app` and `libs/rsd`.
- `apps/box-model-rsd-nextjs/tsconfig.json` - added `files: []` and references to `libs/rsd-app` and `tsconfig.spec.json`.

## Next Steps
- Run `npx nx run box-model-rsd-nextjs:start` and allow Nx to sync project references.
- Verify Expo builds still resolve `@box-model/rsd-app` without the removed include paths.
