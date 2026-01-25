# Plan: BOX-50 - Regenerate Expo Android project to remove EdgeToEdge theme

<!-- Plan Metadata -->

| Field    | Value      |
| -------- | ---------- |
| Created  | 2026-01-25 |
| Author   | Codex      |
| Approach | Completed |

## Goal

Remove the stale Android project files so Expo SDK 54 can regenerate the correct default theme.

## Work Breakdown

### 1. Remove generated Android project

- Delete `apps/box-model-rsd-expo/android/`.

### 2. Document regeneration

- Record that `npx expo prebuild --platform android` is required before `run-android`.
