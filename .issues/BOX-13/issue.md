# BOX-13: Storybook stories must import via library entrypoints

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | ready                               |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | Build pipeline                      |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | medium                              |

## Summary
Several `*.stories.ts` files import components via relative paths (e.g., `./tooltip`) which breaks in hosted environments where consumers should bundle `@box-model/web/*` exports; aliasing currently resolves local files only.

## Context
Future builds should support swapping between local code in dev and CDN-served bundles in production. For now, stories should consistently consume the published entrypoints.

## Acceptance Criteria
- [ ] Audit all story files and switch component imports to `@box-model/web/<component>`
- [ ] Update Vite/Storybook alias configuration so local development resolves those entrypoints correctly
- [ ] Document the pattern in `AGENTS.md` to ensure new stories follow the convention

## References
- Related files: `libs/web/src/*/*.stories.ts`, `libs/web/.storybook/`
