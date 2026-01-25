# BOX-11: Stat markdown container needs value/title slots

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
The `:::stat` container passes value/delta/trend attributes but does not expose the `title` slot or supporting markup, so stats render partially.

## Context
Markdown authors need a clear way to provide the title slot and optional description lines.

## Acceptance Criteria
- [ ] Capture heading/paragraph nodes before conversion and map them to `slot="title"` vs. body copy
- [ ] Expand tests/stories showing stats authored entirely from markdown
- [ ] Revisit sanitization for numeric values to prevent injection

## References
- Related files: `libs/web/src/markdown/`, `libs/web/src/stat/`
