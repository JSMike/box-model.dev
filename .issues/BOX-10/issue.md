# BOX-10: Tooltip markdown container renders unusable DOM

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
Tooltips instantiated via `:::tooltip` currently wrap arbitrary markdown in `<tooltip-box>` with no trigger/target wiring, so they compile but do not function.

## Context
The tooltip component expects a trigger element plus slotted content for the surface; markdown rendering can't yet provide both.

## Acceptance Criteria
- [ ] Decide on markdown syntax that yields both trigger and tooltip body (perhaps fenced blocks with attribute-driven targets)
- [ ] Update the container renderer to emit the expected slot/attribute structure
- [ ] Smoke-test in Storybook to confirm interactions still work

## References
- Related files: `libs/web/src/markdown/`, `libs/web/src/tooltip/`
