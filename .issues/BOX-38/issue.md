# BOX-38: Rename RSD apps and extract shared app logic

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | done                               |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | refactor                            |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | high                                |

## Summary

Rename the RSD Expo app and Vite web app to align with their platforms, and extract shared Box Model RSD app logic into `libs/rsd-app` so Expo and Next.js can reference a unified codebase.

## Scope
- Rename:
  - `apps/box-model-native` → `apps/box-model-rsd-expo`
  - `apps/box-model-native-e2e` → `apps/box-model-rsd-expo-e2e`
  - `apps/box-model-app` → `apps/box-model-web-vite`
  - `apps/box-model-app-e2e` → `apps/box-model-web-vite-e2e`
- Update project names, scripts, and references in configs/docs.
- Create `libs/rsd-app` and move shared app logic from the Expo app into the library.

## Acceptance Criteria
- [x] App folders and Nx project names reflect the new naming.
- [x] References to old project names updated (scripts, configs, docs, e2e).
- [x] Shared app logic lives in `libs/rsd-app` and Expo app references it.
- [x] Next.js app can reference the shared library for future integration.
