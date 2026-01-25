# BOX-26: Align RSD Storybook docs with web stories

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | ready                              |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | User request                        |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   | BOX-22                              |
| Priority     | medium                              |

## Summary
RSD Storybook stories/docs currently diverge from the canonical web stories. Align the RSD `.mdx` docs and `.stories.tsx` files with their `libs/web` equivalents while keeping RSD-specific implementation details accurate.

## Context
- Web Storybook (port 4400) is the reference structure and controls.
- RSD Storybook (port 4401) has different story organization and docs content.
- Components in scope: badge, button, card (and Introduction page), mirroring the existing RSD components.

## Goals / Acceptance Criteria
- Story hierarchy, names, and controls for RSD match the web stories for the same components.
- MDX docs copy structure and content from web, updated where RSD APIs differ (html.* elements, css.create(), zero border radius).
- Examples and controls reflect current RSD props/variants; no stale props or missing controls.
- Introduction/overview page mirrors web Storybook structure with RSD-specific notes.
- No regressions to existing RSD styles or Storybook build.

## Non-Goals
- Adding new RSD components beyond badge/button/card.
- Changing visual design tokens.

## Notes
- Ensure Storybook continues to run on port 4401 for RSD.
- Preserve zero border-radius rule and token usage in examples.
