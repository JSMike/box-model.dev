# Plan: BOX-47 - Unify Expo app dependencies under root package.json

<!-- Plan Metadata -->

| Field    | Value      |
| -------- | ---------- |
| Created  | 2026-01-25 |
| Author   | Codex      |
| Approach | In Progress |

## Goal

Determine a safe, supported path to minimize or remove per-app `package.json` usage for the Expo app while keeping Nx/Expo tooling working.

## Work Breakdown

### 1. Confirm Nx/Expo requirements

- Verify how `@nx/expo` infers tasks and which files are required.
- Identify Expo CLI/EAS expectations for app-level `package.json`.

### 2. Choose approach

- Option A: Keep a minimal app `package.json` and document it as required.
- Option B: Remove app `package.json` and add explicit `project.json` targets/config to replace inference.

### 3. Implement and document

- Apply the chosen change.
- Update docs or scripts affected by the change.
- Record outcome and rationale in a session summary.
