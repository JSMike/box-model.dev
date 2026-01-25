# BOX-47: Unify Expo app dependencies under root package.json

<!-- Metadata -->
| Field        | Value          |
|--------------|----------------|
| Status       | in-progress    |
| Owner        | Codex          |
| Complexity   | low/medium     |
| Created      | 2026-01-25     |
| Source       | user-request   |
| External     |                |
| Blocks       |                |
| Blocked-by   |                |
| Priority     | medium         |

## Summary

Evaluate removing `apps/box-model-rsd-expo/package.json` and other multi-workspace patterns in favor of a centralized monorepo dependency model.

## Context

The repo now has aligned dependency versions at the root. The request is to avoid per-app dependency divergence by removing the Expo app's package.json and relying on Nx inference/centralized dependencies.

## Acceptance Criteria

- [ ] Decide on a supported Nx/Expo approach for removing or minimizing per-app package.json usage.
- [ ] If removal is feasible, update Nx/Expo configuration to preserve inferred targets and Expo tooling behavior.
- [ ] If removal is not feasible, document the minimal package.json strategy and its rationale.
- [ ] Update relevant docs or configs to reflect the chosen approach.
