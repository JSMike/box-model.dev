# Session 12

**Date:** 2026-01-24

## Completed
- Reverted Card/Badge/Button MDX imports back to namespace form for Badge and Button to avoid regressions.

## Current Status
- Badge and Button MDX use `* as Stories` again; Card remains default import (previous fix). Needs Storybook restart to verify all Meta blocks render.

## Files Changed
- `libs/rsd/src/badge/badge.mdx`
- `libs/rsd/src/button/button.mdx`

## Next Steps
- Restart `npx nx storybook rsd` and confirm Meta renders correctly for all three components.
