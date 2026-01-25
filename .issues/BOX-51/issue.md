# BOX-51: Migrate deprecated SafeAreaView usage to safe-area-context

<!-- Metadata -->
| Field        | Value          |
|--------------|----------------|
| Status       | done           |
| Owner        | Codex          |
| Complexity   | low/medium     |
| Created      | 2026-01-25     |
| Source       | runtime-warning|
| External     |                |
| Blocks       |                |
| Blocked-by   |                |
| Priority     | medium         |

## Summary

Replace deprecated `SafeAreaView` from `react-native` with `react-native-safe-area-context` and ensure the provider is set up in app shells to remove the runtime warning.
