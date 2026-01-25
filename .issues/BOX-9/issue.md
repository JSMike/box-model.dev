# BOX-9: Borders/outlines lack contrast against surfaces

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | ready                               |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | Tokens follow-up                    |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | high                                |

## Summary
Cards, dialogs, and other boxed surfaces now pull borders from surface tones that sit only one step away, so edges disappear on the dark canvas; users expect the DevTools margin/border/padding hierarchy to be obvious.

## Context
We need a consistent rule for when to use the "border" palette, when to rely on brighter surface stops, and whether to supplement with drop shadows so themes remain legible.

## Acceptance Criteria
- [ ] Choose a canonical contrast strategy (e.g., always use `color.box.border.*` for outlines) and document it
- [ ] Update `color.border.*` tokens plus component host styles to follow the rule
- [ ] Capture Storybook screenshots showing improved separation for cards, banners, alerts, and dialogs

## References
- Related files: `libs/tokens/`, `libs/web/src/card/`, `libs/web/src/dialog/`, `libs/web/src/banner/`, `libs/web/src/alert/`
