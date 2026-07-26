# BOX-64: Ship an agent skill with @box-model/web

<!-- Metadata -->

| Field      | Value                  |
| ---------- | ---------------------- |
| Status     | review                 |
| Owner      | Agent                  |
| Complexity | medium                 |
| Created    | 2026-07-26             |
| Source     | Pre-publication review |
| External   |                        |
| Blocks     | @box-model/web 0.0.1   |
| Blocked-by |                        |
| Priority   | high                   |

## Summary

Package a standards-compatible Agent Skill with `@box-model/web` so coding agents can discover the
component API from `custom-elements.json`, compose components using canonical Storybook-derived
examples, and use the published CSS classes and Sass mixins correctly.

## Acceptance Criteria

- [x] The package contains a valid, concise Agent Skill with appropriate discovery metadata
- [x] The skill treats `custom-elements.json` as the source of truth for component API details
- [x] Every published custom element has a representative composition example derived from its
      canonical Storybook usage
- [x] Published style utilities, Sass mixins, theme setup, and customization boundaries are
      documented for agents
- [x] A deterministic helper can inspect component metadata without loading the complete manifest
- [x] The build and npm package include the complete skill without shipping source-only placeholders
- [x] Skill, package, component, and accessibility validation pass

## References

- `libs/web/src/custom-elements.json`
- `libs/web/src/*/*.stories.ts`
- `libs/web/src/styles/`
- Agent Skills specification: https://agentskills.io
- TanStack Intent maintainer quick start:
  https://tanstack.com/intent/latest/docs/getting-started/quick-start-maintainers
- TanStack Intent registry: https://tanstack.com/intent/latest/docs/registry
