# Session 2

**Date:** 2026-01-24

## Completed
- Removed extra aggregate stories (All Variants/Sizes) to mirror the web Storybook layout.
- Harmonized story controls/args with web:
  - Badge: label, variant, size controls; single Canvas story.
  - Button: label, variant, size, disabled controls; single Canvas story.
  - Card: heading, body, footer, variant, padded controls; single Canvas story.
- Updated MDX to web structure (Source + Canvas + Controls + ComponentDocs) for Badge, Button, Card.
- Added ComponentDocs blocks for API documentation like the web stories.

## Current Status
- RSD story hierarchy and docs should now match the web reference (no All Variants/Sizes stories). Needs a quick Storybook check on 4401.

## Files Changed
- `libs/rsd/src/badge/badge.stories.tsx`
- `libs/rsd/src/badge/badge.mdx`
- `libs/rsd/src/button/button.stories.tsx`
- `libs/rsd/src/button/button.mdx`
- `libs/rsd/src/card/card.stories.tsx`
- `libs/rsd/src/card/card.mdx`
- `libs/rsd/src/Introduction.mdx` (unchanged this session, prior alignment retained)

## Next Steps
- Reload `npx nx storybook rsd` and confirm sidebar/stories and API docs match the web Storybook. Share any remaining deltas for a follow-up tweak.
