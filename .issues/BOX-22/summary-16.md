# Session 16

**Date:** 2026-01-24

## Completed
- Removed the duplicate `@nx/js/typescript` plugin entry to avoid the `configContexts` null crash when building the project graph.

## Current Status
- `nx storybook rsd` no longer fails on the project graph, but Storybook can't be launched here because the environment denies binding to port 4401 (EPERM).

## Files Changed
- `nx.json` - removed the second `@nx/js/typescript` plugin configuration.

## Next Steps
- Run `npx nx storybook rsd` locally where port binding is allowed to capture the actual Storybook/Vite error.
