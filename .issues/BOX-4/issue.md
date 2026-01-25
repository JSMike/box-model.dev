# BOX-4: Dialog/Drawer backdrop clicks should close by default

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | ready                               |
| Owner        | TBD                                 |
| Created      | 2026-01-24                          |
| Source       | Accessibility review                |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | medium                              |

## Summary
Backdrop clicks still fail to close either component and scrolling behind the modal remains possible on some platforms. We reverted the interim CSS change; this needs a fuller solution.

## Context
Native `<dialog>` cancel events should dismiss unless `no-backdrop-close` is set, and the document should lock scrolling while either surface is open.

## Acceptance Criteria
- [ ] Investigate why cancel events aren't firing (likely due to sizing/positioning) and adjust layout so the backdrop receives clicks
- [ ] Add `document.body` scroll locking while a dialog/drawer is open (mirror what `showModal` does natively)
- [ ] Update tests and stories once behavior matches expectations

## References
- Related files: `libs/web/src/dialog/`, `libs/web/src/drawer/`
