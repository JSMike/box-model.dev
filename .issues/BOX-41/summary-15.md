# Session 15

**Date:** 2026-01-24

## Fixes

- Addressed Next.js build error caused by `react-native-svg` usage in shared library.
- Refactored `libs/rsd-app/src/components/logo.tsx` to be platform-agnostic:
  - `logo.tsx`: Web implementation using standard React `<svg>`.
  - `logo.native.tsx`: Native implementation using `react-native-svg`.
- This ensures the Next.js app (web) uses the standard SVG implementation and avoids importing native modules.

## Outcome

- Build should pass.
- Visuals on web remain correct (standard SVG renders same as `react-native-svg-web` would).
