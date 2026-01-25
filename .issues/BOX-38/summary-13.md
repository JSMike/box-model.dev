# Session 13

**Date:** 2026-01-24

## Completed
- Removed unused `Pressable` import in About screen.
- Excluded Storybook story files and MDX from the rsd-app lib build tsconfig.

## Current Status
- `rsd-app:build` should no longer pull in storybook-utils during lib builds.

## Files Changed
- `libs/rsd-app/src/about/about.tsx` - drop unused `Pressable` import.
- `libs/rsd-app/tsconfig.lib.json` - exclude `*.stories.*` and `*.mdx`.

## Next Steps
- Re-run `npx nx run rsd-app:build` or `npx nx run box-model-rsd-nextjs:start`.
