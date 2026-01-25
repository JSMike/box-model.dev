# BOX-39: Fix RSD strict-dom type errors

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | in-progress                        |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | build                               |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | high                                |

## Summary

Resolve TypeScript errors in `libs/rsd` caused by strict-dom prop and style constraints (unsupported elements/props and inline styles).

## Scope
- Replace unsupported elements (table, svg, legend) with supported markup and roles.
- Remove inline style objects and use `css.create()` variants.
- Update invalid aria props and other strict-dom attribute mismatches.
- Align component styles with available tokens (motion tokens, spacing tokens).

## Acceptance Criteria
- [ ] `nx run rsd:build-lib` passes without TS errors.
- [ ] RSD components avoid inline style objects and unsupported elements/props.
- [ ] Updated components remain consistent with Box Model UI constraints (no border radius).
