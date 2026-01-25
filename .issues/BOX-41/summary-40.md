# Session 40

**Date:** 2026-01-24

## Completed
- Inspected Expo DevTools (Playwright) for `html.main`; paddingLeft/Right reported as 24 across matches and DisplayInside context shows `flow`.
- Compared rsd-nextjs (3000) vs web-vite (4200) on Home/Blogs with Playwright:
  - `/blogs` active nav link color differs (RSD white vs web accent `rgb(136, 178, 189)`), with heavier font weight in RSD.
  - Tool-box “Docs” links in RSD stay white with no underline, even on hover; web switches to accent and underlines on hover.
  - Hero “Developer Blog” is a button in RSD but a link in web; “Keep reading” is button in RSD vs link in web.
  - Header and main widths match at 1280px viewport (header full-width; main ~1100px).

## Current Status
- Mobile padding issue persists visually even though RSD DevTools reports padding on `html.main`.
- Visual deltas captured for nav active state and link hover/accent styling.

## Files Changed
- `.issues/BOX-41/summary-40.md`

## Next Steps
- Align nav active styling and link hover/accent treatment in RSD with web reference.
- Investigate why `Link` styles aren’t applying on RSD (token resolution vs CSS precedence).
- Determine a cross-platform fix for mobile horizontal padding visibility.
