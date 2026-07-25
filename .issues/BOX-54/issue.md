# BOX-54: Angular-ready CEM typing (fable-feedback)

<!-- Metadata -->
| Field        | Value        |
|--------------|--------------|
| Status       | review       |
| Owner        | Agent        |
| Complexity   | high         |
| Created      | 2026-07-12   |
| Source       | fable-feedback |
| External     |              |
| Blocks       | BOX-15       |
| Blocked-by   | BOX-53       |
| Priority     | high         |

## Summary

Close Angular `customElementsManifests` gaps identified in `fable-feedback.md`: resolvable module paths, `type.references`, full event typing, `attribute: false` members, checker type fallbacks, readonly, envelope lint, and `sideEffects`.

## Acceptance Criteria (blocking gate)

- [x] `.js` export aliases + `sideEffects` in dist package.json
- [x] `type.references` with explicit `module` (or expanded unions) for named types
- [x] All `dispatchEvent` sites captured with real event types / detail generics
- [x] `attribute: false` kept as attribute-less members; dedupe by `propertyName`
- [x] Checker fallback types for un-annotated properties
- [x] `readonly` on readonly modifiers / getter-only accessors
- [x] Angular check-type envelope lint during generation
- [x] Single-collect generate pipeline; summary/description not duplicated; deprecated propagation

## References

- `fable-feedback.md`
- `libs/web/generators/`
- Related: BOX-53, BOX-15
