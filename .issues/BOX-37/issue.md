# BOX-37: Configure Expo web for React Strict DOM

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | in-progress                        |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | bug                                |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | high                                |

## Summary

Configure `apps/box-model-native` to run on web with React Strict DOM by adding Expo-compatible Babel and PostCSS setup, a strict CSS entrypoint, and required web bootstrapping.

## Acceptance Criteria
- [ ] Expo web builds include `react-strict-dom/babel-preset` configuration.
- [ ] PostCSS uses `react-strict-dom/postcss-plugin` with correct include globs.
- [ ] App entry imports `strict.css` and `@expo/metro-runtime`.
- [ ] Root layout sets `data-layoutconformance="strict"` when using RSD HTML elements.
