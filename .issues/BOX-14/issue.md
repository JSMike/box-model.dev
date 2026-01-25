# BOX-14: Tooltip anchor positioning needs robust fallback

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | ready                               |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | UI QA                               |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | medium                              |

## Summary
Attempts to anchor tooltips via CSS anchor positioning still misalign in some browsers; need a reliable implementation or vetted example before reintroducing advanced positioning.

## Context
Current fallback (absolute positioning) works, but anchor-aware mode can drift or misplace tooltips near viewport edges.

## Acceptance Criteria
- [ ] Research working anchor-positioning demos/patterns and identify the correct `position-area`/`position-try` combo
- [ ] Prototype a simplified tooltip using the confirmed pattern
- [ ] Reapply the solution to `tooltip-box` once stable, ensuring Storybook coverage

## References
- Related files: `libs/web/src/tooltip/`
