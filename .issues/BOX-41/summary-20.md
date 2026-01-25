# Session 20

**Date:** 2026-01-24

## Configuration Fix

- **Issue**: StyleX tokens (`@box-model/tokens/tokens.stylex`) were not resolving correctly during the Next.js build, leading to undefined style values (e.g., `gap: undefined` resulting in `gap: normal` or 0 at runtime).
- **Diagnosis**: The `aliases` configuration in `next.config.mjs` used a wildcard (`*`) which may not have correctly matched the specific `tokens.stylex.ts` file for the StyleX/SWC compiler resolution, unlike the explicit configuration found in Storybook.
- **Fix**: Updated `apps/box-model-rsd-nextjs/next.config.mjs` to include an explicit alias for `@box-model/tokens/tokens.stylex` pointing to `dist/libs/tokens/tokens.stylex.ts`.

## Outcome

- This should enable the StyleX compiler to properly inject the token values (e.g., `1.5rem` for `scale300`) into the generated CSS.
- Visual alignment (gaps, spacing) should now match the design tokens.

## Status

- Code verified.
- Configuration patched.
- Rebuild triggered.
