# BOX-8: Button hover states fail contrast

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
Primary/secondary/destructive buttons currently shift to adjacent palette stops for hover/active states, so text and outlines barely change lightness and fail WCAG contrast against their surfaces.

## Context
The refreshed palette centers on deep browns/charcoals; nudging by a single stop doesn't yield visible change. We need a repeatable rule (e.g., dedicated hover/active tokens or opacity overlays) that future light/dark themes can override.

## Acceptance Criteria
- [ ] Define accessible hover/active ramps (including text colors) for each interactive variant and document the recipe
- [ ] Update `color.interactive.*` tokens plus `button-box` host variables to consume the new scheme
- [ ] Add Storybook visual regression tests verifying text/background contrast for rest/hover/active/disabled states

## References
- Related files: `libs/web/src/button/button.host.scss`, `libs/tokens/`
- Related: [BOX-57](../BOX-57/issue.md) (primary/tertiary default contrast from Angular CEM integration; expands beyond hover)
