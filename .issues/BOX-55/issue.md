# BOX-55: CEM generator hardening (review remediation)

<!-- Metadata -->
| Field        | Value        |
|--------------|--------------|
| Status       | review       |
| Owner        | Agent        |
| Complexity   | medium/high  |
| Created      | 2026-07-12   |
| Source       | code review of BOX-53/BOX-54 |
| External     |              |
| Blocks       | BOX-15       |
| Blocked-by   | BOX-54       |
| Priority     | high         |

## Summary

Remedy issues raised in the critical review of the CEM generation work (BOX-53/BOX-54): latent correctness bugs in the metadata collector, packaging risks in `sideEffects`, missing CI gating, absent generator tests, untyped event details, and documentation gaps. None of the bugs fire against current sources — the goal is to keep the pipeline correct as components evolve, not to fix a broken output.

## Raised Issues (from review)

Correctness bugs (latent):
1. `resolveMemberType` dead branch — un-annotated properties whose inferred type prints a named type emit bare text with no `references` and no expansion.
2. `resolveSymbolReference` derives `module` from the declaring file's directory name — produces garbage (e.g. `development.js`) for types declared in `node_modules`; never verifies the type survives the entry barrel.
3. Event extraction only sees inline `this.dispatchEvent(new X(...))`; variable indirection silently drops the event with no warning.
4. `parseClassJsDoc` uses the internal `.jsDoc` node property and additionally iterates `ts.getJSDocTags`, processing tags twice; brittle across TS versions.

Build/packaging risks:
5. `sideEffects` array contains meaningless extensionless entries and excludes the shared hashed `lit-*.js` chunk (declared pure).
6. `lintAngularCheckType` contains a dead empty `if` branch.
7. Warnings and envelope-lint issues never fail the build; `missing type text` is silently skipped.

Gaps / blind spots:
8. No tests for the generators (~1,200 lines of AST/regex heuristics with zero coverage); no CI determinism check for generated files.
9. Events emit bare `CustomEvent` — `$event.detail` is untyped in Angular; sources should use explicit detail generics (`CustomEvent<void>` today).
10. CSS custom properties are only collected from the primary `:host` block; the convention is undocumented and unenforced.
11. Same-name events dispatched with conflicting options/types merge lossily without warning.
12. Single-paragraph class JSDoc lands only in `summary`, leaving `description` empty (some consumers read `description` first).

Small items:
13. `superclass` hardcoded to `LitElement`/`lit` instead of reading the heritage clause.
14. `hasBooleanOption` only recognizes literal `true` (e.g. `bubbles: someFlag` reads as false) with no warning.

## Acceptance Criteria (blocking gate)

- [x] Un-annotated properties with named inferred types get expansion or references (no bare uncovered text)
- [x] Types declared in `node_modules` resolve to `ref.package` (or warn + expand); no directory-name-derived garbage modules
- [x] Unresolvable `dispatchEvent` arguments produce a collector warning naming class and location
- [x] JSDoc parsing uses only public TypeScript APIs; no duplicate tag processing
- [x] `sideEffects` covers all emitted JS including hashed chunks (`["./*.js"]`)
- [x] Strict mode fails generation on warnings/envelope issues and reports missing-type counts; wired into the Nx target
- [x] Golden-fixture test for the collector/emitter covering renamed attribute, `attribute: false`, getter-only, custom-prop comments, JSDoc-only slot, and event variants; determinism check (regenerate + clean diff)
- [x] All current `close` dispatches use `new CustomEvent<void>(...)`; CEM emits `CustomEvent<void>`
- [x] Conflicting duplicate event dispatches warn during collection
- [x] Class `description` always populated (full comment); `summary` remains the first paragraph
- [x] Public-custom-prop convention (declared in the base `:host` block) documented; out-of-block stem-prefixed declarations warn
- [x] Dead code removed (`lintAngularCheckType` empty branch, `resolveMemberType` duplicate return)

Stretch (non-blocking):
- [ ] `superclass` derived from heritage clause
- [ ] Warning for non-literal `bubbles`/`composed` option values
- [x] Angular example-app template-diagnostics verification (C8 from fable-feedback)

## References

- Review delivered 2026-07-12 (chat session following BOX-54)
- `libs/web/generators/component-metadata.ts`
- `libs/web/generators/custom-elements.ts`
- `libs/web/vite.config.ts`
- Related: BOX-53, BOX-54, BOX-15
