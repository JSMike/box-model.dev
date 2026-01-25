# BOX-3: Stat delta colors need AA audit

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | ready                               |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | Design review                       |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | medium                              |

## Summary
Recent stat tweaks blend the semantic delta colors with `text-primary`, but dark-mode AA is still borderline and the mix relies on `color-mix`, which Safari 15/Edge 112 users lack.

## Context
We introduced a fallback palette earlier in this task; to ship confidently we should either add explicit dark-scheme tokens or precompute accessible values (possibly via CSS vars that toggle per theme) rather than runtime mixing.

## Acceptance Criteria
- [ ] Pair with design to pick explicit success/info/danger text tokens that clear AA on elevated backgrounds
- [ ] Introduce theme variables (e.g., `--stat-delta-color-dark`) populated via `_theme.scss` so we're not dependent on `color-mix` support
- [ ] Update `stat.host.scss`/stories and add a visual regression note in docs

## References
- Related files: `libs/web/src/stat/stat.host.scss`, `libs/tokens/`
