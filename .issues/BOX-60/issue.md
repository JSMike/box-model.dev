# BOX-60: Harden @box-model/web for initial publication

<!-- Metadata -->

| Field      | Value                                      |
| ---------- | ------------------------------------------ |
| Status     | review                                     |
| Owner      | Agent                                      |
| Complexity | high                                       |
| Created    | 2026-07-25                                 |
| Source     | independent pre-release web-library review |
| External   |                                            |
| Blocks     | @box-model/web 0.0.1 publication           |
| Blocked-by |                                            |
| Priority   | high                                       |

## Summary

Resolve the security, packaging, event-contract, slot, and public-API defects found during the
independent `@box-model/web` 0.0.1 release review.

## Acceptance Criteria

- [x] `markdown-box` does not execute raw HTML, event-handler attributes, or unsafe URL protocols
      from ordinary Markdown input
- [x] The documented Sass entry point compiles from an isolated packed package without requiring
      the private `@box-model/tokens` workspace package
- [x] Recommended close-control composition and WYSIWYG text editing emit exactly one public event
      per user activation
- [x] Slot-only legends remain visible and name checkbox/radio fieldsets
- [x] WYSIWYG toolbar controls expose meaningful accessible names and public examples label their
      native form controls
- [x] Misleading pre-release interaction APIs are resolved before consumers depend on them
- [x] Regression tests exercise final behavior rather than prior implementation history
- [x] React, Preact, and Solid JSX declarations are available through type-only package exports
- [x] Framework consumers can enable the declarations through `compilerOptions.types`
- [x] Storybook documents framework-specific setup next to the introduction
- [x] Framework declarations work with Bundler and NodeNext module resolution
- [x] Framework declarations type direct and ancestor listeners for custom events using each
      framework's runtime event-name convention
- [x] The package and Storybook include a 0.0.1 changelog and pre-1.0 SemVer policy
- [x] Shared implementation services remain internal rather than becoming public package exports

## Related Issues

- [BOX-4](../BOX-4/issue.md) - Dialog/drawer backdrop and Escape dismissal
- [BOX-56](../BOX-56/issue.md) - Progress accessible name
- [BOX-57](../BOX-57/issue.md) - Default contrast
