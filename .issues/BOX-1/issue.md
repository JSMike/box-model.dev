# BOX-1: Complete component API docs coverage

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | ready                               |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | docs-refresh                        |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | medium                              |

## Summary
The new `ComponentDocs` block renders attribute tables from `argTypes`, but most components still lack explicit docs for events, slots, CSS custom properties/parts, and dependencies in their `*.stories.ts` files.

## Context
Banner now models the desired detail (attributes, events, slots, CSS props/parts, dependencies), and every component MDX now shows an API section; filling the metadata keeps the tables useful.

## Acceptance Criteria
- [ ] For each component story, enumerate public API (attributes, events, slots, CSS vars, parts, dependencies) and populate the `Docs` fields mirroring the banner structure
- [ ] Add any missing named slots/parts to components as needed so docs align with actual markup
- [ ] Re-run Storybook to confirm each API table renders with data and update snapshots/screenshots if used downstream

## References
- Related files: `libs/web/src/*/\*.stories.ts`
