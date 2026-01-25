# BOX-50: Regenerate Expo Android project to remove EdgeToEdge theme

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

`expo run:android` failed because `AppTheme` inherited from `Theme.EdgeToEdge`, which no longer exists in SDK 54 (it was provided by `react-native-edge-to-edge` in SDK 53). Remove the checked-in Android folder and rely on Expo prebuild to regenerate the correct AppCompat theme.
