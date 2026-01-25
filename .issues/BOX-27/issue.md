# BOX-27: Audit box-model-app for RSD component priorities

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | done                                |
| Owner        | TBD                                 |
| Created      | 2026-01-24                          |
| Source       | planning                            |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | medium                              |

## Summary
Review the box-model-app to identify which components from libs/web are currently used. These components should be prioritized for implementation in libs/rsd, enabling a future box-model-native-app that mirrors the web application.

## Context
The libs/rsd library has been scaffolded with initial components (Badge, Button, Card). To maximize the value of the RSD library, the next components to implement should be driven by actual usage in the existing application. This audit will:

1. Identify all @box-model/web component imports in box-model-app
2. Count usage frequency of each component
3. Prioritize the RSD implementation backlog accordingly
4. Inform the future native app scope

## Acceptance Criteria
- [x] List all @box-model/web components imported in apps/box-model-app
- [x] Document usage count for each component
- [x] Identify any component dependencies (components used within other components)
- [x] Create prioritized list of next RSD components to implement
- [x] Document any app-specific patterns that would need RSD equivalents
- [x] Create follow-up issue(s) for implementing priority components

## References
- Related files:
  - `apps/box-model-app/src/**/*`
  - `libs/web/src/**/index.ts`
  - `libs/rsd/src/**/*`
- Related issues:
  - BOX-22: Scaffold @box-model/rsd library
