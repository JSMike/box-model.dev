# Session 10

**Date:** 2026-01-24

## Completed
- Removed web-only CSS custom property docs from RSD stories to avoid implying unsupported overrides:
  - `badge.stories.tsx`, `button.stories.tsx`, `card.stories.tsx` now document slots/attributes only (no cssProperties).

## Current Status
- RSD API docs will no longer list web component CSS vars. Needs a quick Storybook check to confirm ComponentDocs renders without the custom property section.

## Files Changed
- `libs/rsd/src/badge/badge.stories.tsx`
- `libs/rsd/src/button/button.stories.tsx`
- `libs/rsd/src/card/card.stories.tsx`

## Next Steps
- Restart `npx nx storybook rsd` and verify the API docs reflect the updated metadata.
