# Plan: BOX-51 - Migrate deprecated SafeAreaView usage

<!-- Plan Metadata -->

| Field    | Value      |
| -------- | ---------- |
| Created  | 2026-01-25 |
| Author   | Codex      |
| Approach | In Progress |

## Goal

Stop the SafeAreaView deprecation warning by using `react-native-safe-area-context` and providing a SafeAreaProvider where needed.

## Work Breakdown

### 1. Update component usage

- Swap `SafeAreaView` import in `libs/rsd-app/src/components/app-shell.tsx`.

### 2. Add provider in Expo app

- Wrap the Expo app root with `SafeAreaProvider`.

### 3. Update documentation

- Adjust `libs/rsd-app/AI-README.md` to reference `react-native-safe-area-context`.
