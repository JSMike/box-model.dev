# Plan: BOX-37 - Configure Expo web for React Strict DOM

<!-- Plan Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Created      | 2026-01-24                          |
| Author       | Agent                               |
| Approach     | Proposed                            |

## Steps
1) Add Expo-specific `babel.config.js` in `apps/box-model-native` with RSD preset and StyleX module resolution.
2) Add `postcss.config.js` in `apps/box-model-native` for `react-strict-dom/postcss-plugin`.
3) Create `strict.css` in `apps/box-model-native` and import it (plus `@expo/metro-runtime`) in `index.js`.
4) Add `data-layoutconformance="strict"` at the app root if feasible.
5) Record session summary and update issue index/status.
