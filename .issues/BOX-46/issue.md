# BOX-46: Fix StyleX Babel config resolution for .stylex tokens

<!-- Metadata -->
| Field        | Value          |
|--------------|----------------|
| Status       | done           |
| Owner        | Codex          |
| Complexity   | low/medium     |
| Created      | 2026-01-25     |
| Source       | build          |
| External     |                |
| Blocks       |                |
| Blocked-by   |                |
| Priority     | high           |

## Summary

Builds that run through Babel (RSD, RSD-app, Next.js) failed to resolve StyleX theme tokens because the preset-provided StyleX plugin instance was not detected, so the `.stylex` module resolution override never applied. Update the Babel configs to detect the StyleX plugin by name and enforce `themeFileExtension: '.stylex'`.
