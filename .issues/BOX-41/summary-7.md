# Session 7

**Date:** 2026-01-24

## Completed
- Switched RSD library build dependencies to `^build-lib` to avoid pulling Storybook builds into app dependency chains.
- Added a `build-lib` target for `tokens` so dependency graphs can resolve tokens without calling full `build`.
- Overrode `box-model-rsd-nextjs` build dependencies to use `^build-lib` instead of `^build`.

## Current Status
- Dependency graph now builds only library artifacts (no storybooks) when starting or building `box-model-rsd-nextjs`.

## Files Changed
- `libs/rsd-app/project.json` - `build-lib` now depends on `^build-lib`.
- `libs/rsd/project.json` - `build-lib` now depends on `^build-lib`.
- `libs/tokens/project.json` - added `build-lib` target mirroring token build commands.
- `apps/box-model-rsd-nextjs/project.json` - explicit `build` and `build-deps` targets with `^build-lib` dependencies.

## Next Steps
- Run `npx nx run box-model-rsd-nextjs:build` or `npx nx start box-model-rsd-nextjs` to confirm storybooks are no longer built.
