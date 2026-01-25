# BOX-12: Stat trend indicators need clearer affordances

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | ready                               |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | Accessibility QA                    |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | medium                              |

## Summary
`stat-box` exposes a `trend` attribute, but the current visual indicator is too subtle—color contrast and iconography remain nearly identical across states, so screen readers get the info but sighted users (esp. low-vision) can't distinguish trends easily.

## Context
Designs called for box-friendly arrows and color shifts; the existing implementation uses tiny border tweaks that are easy to miss and lack accompanying icons.

## Acceptance Criteria
- [ ] Design a clearer trend icon (e.g., arrow glyph or inline SVG) and ensure up/down/neutral have distinct colors meeting contrast guidelines
- [ ] Update `stat-box` host/slot styles to render the new icon, exposing CSS vars for downstream tweaks
- [ ] Add Storybook examples + tests covering each trend so regressions are caught

## References
- Related files: `libs/web/src/stat/`
