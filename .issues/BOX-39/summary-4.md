# Session 4

**Date:** 2026-01-24

## Completed
- Restored Storybook preview typings for RSD and RSD-app.
- Switched Storybook docgen to `react-docgen-typescript` to avoid parsing errors on TypeScript-only syntax.

## Current Status
- Storybook build should parse `import type` in preview files.

## Files Changed
- `libs/rsd/.storybook/preview.ts` - restore `Preview` type import and annotation.
- `libs/rsd-app/.storybook/preview.ts` - restore `Preview` type import and annotation.
- `libs/rsd/.storybook/main.ts` - use `react-docgen-typescript`.
- `libs/rsd-app/.storybook/main.ts` - use `react-docgen-typescript`.

## Next Steps
- Re-run `npx nx run rsd:build-storybook` to confirm the docgen parser error is gone.
