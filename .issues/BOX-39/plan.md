# Plan: BOX-39 - Fix RSD strict-dom type errors

<!-- Plan Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Created      | 2026-01-24                          |
| Author       | Agent                               |
| Approach     | Proposed                            |

## Steps
1) Update components with invalid props/elements (dialog/drawer roles, tooltip title, select disabled, svg/table/legend usage).
2) Replace inline style objects with `css.create()` variants (columns, list, toolbar, toast, skeleton, progress).
3) Align motion/spacing tokens (input/select/textarea transitions, alert/banner padding).
4) Update stories/exports if component APIs change.
5) Record session summary and update `.issues/index.md`.
