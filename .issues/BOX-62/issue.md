# BOX-62: Establish crisp offset shadows as a Box Model surface primitive

<!-- Metadata -->

| Field      | Value                           |
| ---------- | ------------------------------- |
| Status     | review                          |
| Owner      | Agent                           |
| Complexity | medium                          |
| Created    | 2026-07-25                      |
| Source     | Angular CEM example integration |
| External   |                                 |
| Blocks     |                                 |
| Blocked-by |                                 |
| Priority   | medium                          |

## Summary

Make crisp, zero-blur offset shadows part of the Box Model visual language while retaining soft
elevation for floating overlays and glow shadows for focus indication.

## Acceptance Criteria

- [x] Theme-aware offset-shadow tokens provide a small, consistent scale
- [x] A public Sass mixin and compiled utility apply the canonical square surface treatment
- [x] Card, stat, terminal, and Markdown fenced-code surfaces use the new offset-shadow system;
      Markdown adopts the shared surface mixin rather than recreating its declarations
- [x] Existing elevation and focus-shadow roles remain available and semantically distinct
- [x] Storybook documents the design principle, tokens, helper API, and accessibility constraints
- [x] Component custom properties allow consumers to override adopted shadows
- [x] Light, dark, forced-colors, package-build, and Angular integration behavior are verified
