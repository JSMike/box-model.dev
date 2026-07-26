# BOX-57: Default theme/token combinations fail WCAG AA contrast

<!-- Metadata -->

| Field      | Value                            |
| ---------- | -------------------------------- |
| Status     | review                           |
| Owner      | Agent                            |
| Complexity | medium/high                      |
| Created    | 2026-07-13                       |
| Source     | Angular CEM integration (BOX-55) |
| External   |                                  |
| Blocks     |                                  |
| Blocked-by |                                  |
| Priority   | high                             |
| Related    | BOX-3, BOX-8, BOX-9              |

## Summary

Real-browser AXE testing during Angular CEM integration found contrast failures for default (no consumer override) token combinations on:

- Primary and tertiary buttons
- Stat title / value / delta text
- Progress header text

The 0.0.1 pre-release audit additionally found failures in link, Markdown link/CTA, tag, and
informational terminal-line examples. These are part of the same default-token contract.
Visual review later found that terminal success text was indistinguishable from primary text and
that all terminal glyphs used the prompt color regardless of variant.

Built-in fallbacks should meet WCAG AA when components render without page-scoped overrides. Overlaps existing contrast work on BOX-3 (stat deltas) and BOX-8 (button hover/states); this issue captures the integration findings and the broader “defaults without a global theme” question.

## Context

Defaults originate in:

- `libs/web/src/button/button.host.scss`
- `libs/web/src/stat/stat.host.scss`
- `libs/web/src/progress/progress.host.scss`

The Angular demo currently supplies accessible, page-scoped overrides in `../angular-cem-example-app/src/app/integrations/box-model/box-model-page.scss`. See `.issues/BOX-55/summary-3.md`.

## Acceptance Criteria

- [x] Decide and document whether consumers must install a global Box theme / token stylesheet for accessible defaults; if yes, export and document that setup clearly (README / AI-README / Storybook)
- [x] Regardless of theme packaging, built-in host fallback combinations for button (primary/tertiary at minimum), stat (title/value/delta), progress (header), link, Markdown CTA, tag, and terminal info text meet WCAG AA against their default surfaces without consumer overrides
- [x] Re-run AXE against all built Storybook Canvas stories; zero component-level WCAG A/AA violations
- [x] Cross-link resolution with BOX-3 / BOX-8 / BOX-9 so token/hover work does not regress these defaults
- [x] Terminal prompt, info, and success roles are visually distinct; info and success glyphs
      follow their line variant while retaining WCAG AA contrast

## References

- `.issues/BOX-55/summary-3.md`
- `.issues/BOX-3/issue.md`, `.issues/BOX-8/issue.md`, `.issues/BOX-9/issue.md`
- `libs/web/src/button/button.host.scss`, `libs/web/src/stat/stat.host.scss`, `libs/web/src/progress/progress.host.scss`
- `libs/tokens/`
