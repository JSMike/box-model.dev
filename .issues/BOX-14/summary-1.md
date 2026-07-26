# Session 1

**Date:** 2026-07-26

**Prompt/Ask:** Correct the broken `tooltip-box` left placement, make both Storybook examples
respond to the placement control, and document the CSS Anchor Positioning polyfill for older
browsers.

## Changes

- Replaced the incomplete left-side anchor geometry with the current `position-area` pattern.
- Added `position-try` fallbacks so tooltips can flip when the preferred side would overflow the
  viewport.
- Retained explicit `anchor()` coordinates for Chromium releases that predate `position-area` and
  for the OddBird polyfill.
- Applied the Storybook `default-placement` control to both tooltip examples and corrected the
  documented `--tooltip-offset` default.
- Added unit coverage proving all four placements reach the rendered tooltip surface.
- Added optional OddBird polyfill guidance to Storybook's introduction and the published package
  README, including the constructed-stylesheet initialization required by Lit.

## Verification

- Playwright at `http://localhost:4400/?path=/docs/components-tooltip-box--overview`
  - `top`, `bottom`, `left`, and `right` applied to both examples.
  - Every example was centered on the requested axis with an 8px gap from its trigger.
- `npx nx test web --skip-nx-cache --runInBand`
  - 33 files / 88 tests passed.
- `npx nx run-many -t lint,typecheck -p web --skip-nx-cache --parallel=2`
- `npx nx build web --skip-nx-cache`
- `npx nx run web:test-a11y --skip-nx-cache`
  - 30 Canvas stories passed Axe in light and dark themes.
- `npm publish --dry-run --access public` from `dist/libs/web`
  - 221 files; 135.6 kB compressed / 672.5 kB unpacked.
- `git diff --check`

## Current Status

- Status: **review**
