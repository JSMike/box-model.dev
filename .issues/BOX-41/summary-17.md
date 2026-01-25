# Session 17

**Date:** 2026-01-24

## Refinements & Fixes

- **Visual Discrepancies**:
  - **Spacing**: Increased `statStack` gap to `scale300` (1.5rem) and `sectionBlock` gap to `stackXl` (1.5rem) to resolve "spacing is all wrong" feedback.
  - **Colors**: Updated `Stat` component background to use `colorBackgroundTokens.surface` (`#4a4a4a`) instead of `statTokens.background` (`#777777`) to match the darker card appearance in the reference app.
- **Sticky Nav**:
  - Refactored `AppShell` to move `AppNav` outside the `ScrollView`, ensuring it remains fixed at the top.
  - Added width constraints to `AppNav` to maintain layout parity.
- **Build**: Fixed Next.js build error by using platform-specific extensions for `LogoMark` (`logo.tsx` for web using standard SVG, `logo.native.tsx` for native using `react-native-svg`).

## Verification status

- Code edits verified.
- Runtime verification hampered by stuck dev server/HMR, but code logic aligns with findings.

## Artifacts

- `libs/rsd-app/src/home/home.tsx`
- `libs/rsd/src/stat/stat.tsx`
- `libs/rsd-app/src/components/app-shell.tsx`
- `libs/rsd-app/src/components/app-nav.tsx`
