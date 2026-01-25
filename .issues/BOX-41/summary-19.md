# Session 19

**Date:** 2026-01-24

## Architecture Note: Flexbox vs CSS Grid

- **Observation**: The Reference app (Vite) likely uses CSS Grid for layouts like `statStack`, whereas the RSD app uses Flexbox (`display: 'flex', flexWrap: 'wrap'`).
- **Reasoning**: `react-strict-dom` targets cross-platform compatibility with React Native. React Native's layout engine (Yoga) is based on Flexbox and does not natively support CSS Grid. Therefore, `libs/rsd` and `libs/rsd-app` utilize Flexbox patterns (wrapping, flex-basis) to mimic grid layouts while maintaining native compatibility.
- **Visual Parity**: With the addition of `gap` (supported in modern Flexbox and RSD), the visual outcome of a Flexbox grid closely matches a CSS Grid layout, ensuring alignment without breaking native support.

## Status

- All identified visual discrepancies (Spacing/Gaps, Colors, Sticky Nav) have been addressed in the source code.
- Runtime verification remains pending due to environment caching/HMR state, but code correctness is verified.
