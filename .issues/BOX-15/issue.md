# BOX-15: Angular custom element typings pattern

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | ready                               |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | angular-interop                     |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | medium                              |

## Summary
Angular consumers only have `CUSTOM_ELEMENTS_SCHEMA` to permit our elements; we need a typed integration comparable to the React/Preact typings emitted by the UI library so templates see the component definitions.

## Context
The library already generates React and Preact typings from shared metadata; Angular lacks an equivalent pattern to surface attributes/events and avoid silent template errors.

## Acceptance Criteria
- [ ] Review the existing React/Preact typegen flow to extract the component metadata source we can reuse
- [ ] Research Angular-friendly approaches (e.g., declaration files for template type-checking or a custom schema provider) that attach our component definitions beyond the generic `CUSTOM_ELEMENTS_SCHEMA`
- [ ] Prototype the chosen pattern against a couple of components, document the integration steps for Angular consumers, and decide where the generator should live in Nx

## References
- Related files: `libs/web/generators/react.ts`, `libs/web/generators/preact.ts`
