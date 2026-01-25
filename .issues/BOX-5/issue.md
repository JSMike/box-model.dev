# BOX-5: Alert markdown container needs slot mapping

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
`markdown-box` now emits `<alert-box>` via the `:::alert` container, but the generated markup only feeds the default slot, so heading/details/close slots and dismiss behavior aren't exercised.

## Context
The markdown renderer strips the raw slot content and injects HTML directly into the shadow DOM, so custom containers must mirror the host component's DOM contract; alert still expects optional `close-control`/structured content that markdown currently can't author.

## Acceptance Criteria
- [ ] Extend the container renderer to recognize fenced sections (e.g., `:::alert[summary]`) and map them to named slots
- [ ] Add regression tests plus Storybook examples showing markdown-authored alerts with close controls
- [ ] Validate resulting DOM in Storybook and adjust `markdown-box` sanitizer as needed

## References
- Related files: `libs/web/src/markdown/`, `libs/web/src/alert/`
