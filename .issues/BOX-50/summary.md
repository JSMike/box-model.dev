# Summary

**Date:** 2026-01-25

## Outcome

Removed the generated Android project so Expo SDK 54 can re-generate it with the correct default theme (AppCompat) instead of the obsolete `Theme.EdgeToEdge`.

## What Changed

- Deleted `apps/box-model-rsd-expo/android/` to force regeneration via `expo prebuild`.
- Documented the prebuild requirement in `README.md`.

## Verification

- Not re-run in this summary; run `npx expo prebuild --platform android` and then `npx nx run box-model-rsd-expo:run-android`.
