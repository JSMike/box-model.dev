# BOX-7: Card markdown container lacks header/footer/actions support

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
The provisional `:::card` container only emits `<card-box>` with default slot content, so header/footer/actions slots never populate.

## Context
Cards often combine multiple sections; without markdown syntax to indicate them, the component renders as a bare body.

## Acceptance Criteria
- [ ] Define container syntax (e.g., `:::card[header]`, `:::card[footer]`) to map markdown segments to slots
- [ ] Emit the appropriate `<div slot="...">` wrappers during markdown rendering
- [ ] Create tests plus Storybook coverage demonstrating multi-section cards authored from markdown

## References
- Related files: `libs/web/src/markdown/`, `libs/web/src/card/`
