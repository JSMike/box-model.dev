# BOX-35: Mirror remaining web components into @box-model/rsd

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | in-progress                        |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | feature-request                     |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   | BOX-22                              |
| Priority     | high                                |

## Summary
Port the remaining components from `libs/web` to `libs/rsd`, using React Strict DOM and StyleX tokens. Achieve feature and docs parity so RSD matches the web library coverage.

## Scope
- Identify components present in `libs/web` that are not yet available in `libs/rsd`.
- Implement RSD counterparts with `html.*` + `css.create()` and existing StyleX tokens.
- Add stories and MDX docs aligned with the web Storybook structure (adjusted for RSD patterns).
- Keep zero border radius and token-driven styling.

## Acceptance Criteria
- [ ] List of missing components created and checked off as implemented.
- [ ] For each missing component:
  - [ ] RSD implementation exists in `libs/rsd/src/<component>/`
  - [ ] Stories and MDX docs mirror web structure, updated for RSD props/styles.
  - [ ] Styles use StyleX tokens; no SCSS or web-only props.
- [ ] Storybook for RSD runs without errors and shows new components with controls/docs.

## Notes
- Follow patterns already established for RSD components (Button, Card, Badge, Terminal, etc.).
- Reuse token mappings from `libs/rsd/src/tokens.stylex.ts`.
- Maintain the square-edge rule (border radius = 0).
