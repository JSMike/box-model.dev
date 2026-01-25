# BOX-6: Banner markdown container misses detail/action slots

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | ready                               |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | Markdown containers                 |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | medium                              |

## Summary
The `:::banner` container simply wraps markdown with `<banner-box>` without wiring `details`, `actions`, or `close-control` slots, so the rendered structure is incomplete.

## Context
Banners rely on multiple named slots that markdown currently can't describe, meaning add-on content is silently ignored.

## Acceptance Criteria
- [ ] Design markdown syntax (front-matter blocks or attribute delimiters) to target the `details`, `actions`, and `close-control` slots
- [ ] Update the container renderer to split content and emit slot-wrapped markup
- [ ] Cover the flow with unit tests and docs so authors know how to supply each section

## References
- Related files: `libs/web/src/markdown/`, `libs/web/src/banner/`
