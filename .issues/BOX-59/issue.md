# BOX-59: Refresh non-breaking workspace dependencies

<!-- Metadata -->

| Field      | Value                                                        |
| ---------- | ------------------------------------------------------------ |
| Status     | review                                                       |
| Owner      | Agent                                                        |
| Complexity | medium                                                       |
| Created    | 2026-07-25                                                   |
| Source     | dependency audit before initial `@box-model/web` publication |
| External   |                                                              |
| Blocks     |                                                              |
| Blocked-by |                                                              |
| Priority   | medium                                                       |

## Summary

Refresh the workspace's dependencies within their existing compatibility ranges before the initial
`@box-model/web` publication. Explicitly move Lit to 3.3.3 while avoiding major-version migrations or
other knowingly breaking upgrades.

## Acceptance Criteria

- [x] Root and published web-library metadata require Lit 3.3.3 within the existing Lit 3 range
- [x] The npm lockfile is refreshed to currently allowed dependency versions
- [x] Nx packages remain aligned on the latest available Nx 22 release
- [x] Major-version upgrades are documented and deferred
- [x] The web package build, tests, lint, type-check, and package artifact verification pass
- [x] Relevant workspace build/test coverage passes
