# BOX-4: Dialog/Drawer backdrop clicks should close by default

<!-- Metadata -->

| Field      | Value                |
| ---------- | -------------------- |
| Status     | review               |
| Owner      | Agent                |
| Created    | 2026-01-24           |
| Source     | Accessibility review |
| External   |                      |
| Blocks     |                      |
| Blocked-by |                      |
| Priority   | medium               |

## Summary

Backdrop clicks still fail to close either component. The current `no-backdrop-close` implementation
instead suppresses the native `cancel` event and therefore Escape-key dismissal. The public behavior
needs to distinguish these interactions before the first package release.

## Context

Native `<dialog>` cancel events should continue to provide Escape-key dismissal. Backdrop clicks
should dismiss unless `no-backdrop-close` is set. Native modal dialogs already provide page
interaction blocking; any additional document scroll behavior must be verified before adding global
state.

## Acceptance Criteria

- [x] Backdrop clicks close dialog and drawer by default
- [x] `no-backdrop-close` suppresses only backdrop dismissal
- [x] Escape continues to close both components regardless of `no-backdrop-close`
- [x] Clicks inside dialog/drawer content do not dismiss the component
- [x] Each dismissal emits exactly one parent `close` event
- [x] Update tests and stories once behavior matches expectations

## References

- Related files: `libs/web/src/dialog/`, `libs/web/src/drawer/`
