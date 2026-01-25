# BOX-2: Slot layout styles live outside render roots

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | ready                               |
| Owner        | TBD                                 |
| Created      | 2026-01-24                          |
| Source       | Component audit                     |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | medium                              |

## Summary
Structural rules (grids, borders, shadows) for `card-box`, `banner-box`, `progress-box`, `stat-box`, `divider-box`, and `list-box` live in their `*.slot.scss` files, so the elements rendered inside each shadow root never receive those styles.

## Context
`slotStyleService` attaches slot stylesheets to the document/light DOM, not a component's `renderRoot`, so selectors like `.card-box__surface` do not match anything. Moving layout rules into the corresponding `*.host.scss` files (or adopting the slot sheet on `this.renderRoot`) keeps surfaces styled while slot sheets focus on `::slotted` overrides.

## Acceptance Criteria
- [ ] Relocate structural selectors from each `*.slot.scss` file to the matching `*.host.scss`
- [ ] Leave true `::slotted` overrides in the slot stylesheets
- [ ] Re-run `nx test ui` + `nx lint ui` and capture Storybook screenshots for the affected components

## References
- Related files: `libs/web/src/card/`, `libs/web/src/banner/`, `libs/web/src/progress/`, `libs/web/src/stat/`, `libs/web/src/divider/`, `libs/web/src/list/`
