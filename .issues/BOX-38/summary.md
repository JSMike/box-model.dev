# Session Summary: BOX-38 - Rename RSD apps and extract shared app logic

**Date:** 2026-01-24
**Status:** done

## Objective
Rename RSD and web app projects to platform-specific names and extract shared RSD app UI into a reusable library for Expo and Next.js.

## Work Completed
- Renamed applications to platform-aligned names (`box-model-rsd-expo`, `box-model-web-vite`, related e2e apps) and updated Nx project references.
- Extracted shared RSD app UI into `libs/rsd-app`, matching the component/story/test structure used by `libs/rsd`.
- Wired the Expo app and the Next.js app to consume `@box-model/rsd-app`.
- Added/updated Next.js (Turbopack) configuration for StyleX + React Strict DOM extraction, including PostCSS and Babel config alignment with the RSD Storybook setup.
- Fixed RSD component/style compatibility issues surfaced during integration (e.g., read-only pseudo-class).
- Updated documentation and Storybook utilities to align with new structure and paths.

## Verification
- `box-model-rsd-nextjs` builds successfully after config alignment and CSS extraction fixes.
- `box-model-web-vite` and RSD Storybook continue to resolve tokens/styles correctly after the renames.

## Files Touched (high level)
- App renames and Nx config updates under `apps/`.
- Shared RSD app library at `libs/rsd-app/`.
- RSD library updates in `libs/rsd/src/` (style compatibility fixes).
- Next.js RSD setup docs and configs in `apps/box-model-rsd-nextjs/`.

## Next Steps
- None; issue closed.
