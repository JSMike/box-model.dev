# BOX-61: Isolate alert layout from projected content and consumer styles

<!-- Metadata -->

| Field      | Value                                      |
| ---------- | ------------------------------------------ |
| Status     | review                                     |
| Owner      | Agent                                      |
| Complexity | low/medium                                 |
| Created    | 2026-07-25                                 |
| Source     | Angular CEM example integration            |
| External   |                                            |
| Blocks     | @box-model/web 0.0.1 publication           |
| Blocked-by |                                            |
| Priority   | high                                       |

## Summary

Keep `alert-box` content and its optional close control aligned when consumers style the custom
element host or project multiple text and element nodes into its default slot.

## Acceptance Criteria

- [x] Alert layout is owned by an internal shadow-DOM surface rather than by the custom-element host
- [x] Fragmented default-slot content occupies one content column
- [x] The optional close control stays aligned to the final column
- [x] Consumer `display` styles on `alert-box` do not disable the internal grid
- [x] Regression tests exercise arbitrary projected content and the final shadow-DOM structure
- [x] The Angular integration example renders the close control at the alert's inline end
