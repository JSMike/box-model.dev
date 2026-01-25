# Plan: BOX-35 - Mirror remaining web components into @box-model/rsd

<!-- Plan Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Created      | 2026-01-24                          |
| Author       | Agent                               |
| Approach     | Proposed                            |

## Approach
- Inventory: Compare `libs/web` vs `libs/rsd` to list missing components.
- Implement: Add RSD versions using `html.*` and `css.create()` with StyleX tokens.
- Docs: Mirror web stories/MDX per component, adjusted for RSD props/behavior.
- Verify: Run RSD Storybook to ensure new components render with controls/docs.

## Steps
1) Audit `libs/web/src` vs `libs/rsd/src` to identify missing components.
2) For each missing component, scaffold RSD implementation + stories + MDX.
3) Align docs/controls with web stories, adapting to RSD props and RN-safe styles (no shorthands).
4) Run `npx nx storybook rsd` to verify no errors and new components visible.
5) Update summaries and mark checklist items.
