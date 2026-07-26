# Plan: BOX-55 CEM generator hardening

Remediation of review findings from BOX-53/BOX-54, ordered so correctness fixes land before the tests that lock them in, and the CI gate lands last (once the pipeline is clean under strict rules).

## Phase 1 — Collector correctness (`component-metadata.ts`)

1. **Fix `resolveMemberType` dead branch.** When a property has no annotation and `checker.typeToString` output is not self-contained, attempt reference resolution for the named identifiers (reuse the `buildTypeInfoFromNode` symbol path via `checker.getTypeAtLocation` symbols); if unresolvable, push a collector warning instead of emitting bare uncovered text.
2. **Harden `resolveSymbolReference` for third-party types.** If the declaring file path contains `node_modules`, resolve the owning package name (walk up to the nearest `package.json` name) into `ref.package` instead of deriving a bogus `module` from the directory basename. If the package cannot be determined, warn and fall back to expansion. Keep the directory heuristic for workspace-local declarations.
3. **Warn on unresolvable `dispatchEvent` arguments.** In `extractDispatchedEvents`, when the first argument is not a resolvable inline `new` expression (identifier, call result, etc.), push a warning with class name and file:line so refactors to variable-indirection cannot silently drop events from the CEM and framework typings.
4. **JSDoc parsing via public API only.** Replace the internal `(declaration as …).jsDoc` access in `parseClassJsDoc` with `ts.getJSDocCommentsAndTags`; process each tag exactly once. Verify identical output on the current source set (diff generated CEM before/after).
5. **Warn on lossy event merges.** When the same event name is dispatched more than once with differing type text, `bubbles`, or `composed`, push a warning; keep the current bubbling-preferred merge behavior.
6. **`summary`/`description` split.** Always populate `description` with the full class comment; set `summary` to the first paragraph. Update the emitter accordingly (no duplication concern — CEM consumers expect `description` present).
7. **Dead code removal.** Delete the empty `if` branch in `lintAngularCheckType` (same-package cross-module comment) and collapse the duplicate return in `resolveMemberType` once item 1 replaces it.

## Phase 2 — Source and packaging fixes

8. **Typed event details.** Change all current dispatch sites (alert, banner, card, close-control, dialog, drawer, toast: `close`) to `new CustomEvent<void>('close', { … })`. The existing type-argument path in `buildCustomEventType` then emits `CustomEvent<void>` with no generator change. Leave the wysiwyg `input` (`Event`) as-is. Regenerate and spot-check.
9. **`sideEffects` glob.** Replace the per-entry array (with dead extensionless entries) in `vite.config.ts` `generatePackageJson` with `"sideEffects": ["./*.js"]` so the hashed `lit-*.js` chunk is covered. Keep the explanatory comment about `@customElement` registration.
10. **CSS custom-prop convention.** Document in `libs/web` contributor docs (AI-README or lib README, wherever component conventions live) that public custom props must be declared in the base `:host` block of `<name>.host.scss`. Add a collector warning when a stem-prefixed `--<stem>-*` declaration appears in the file outside the primary `:host` block.

## Phase 3 — Tests

11. **Golden-fixture test.** Add a vitest spec under `libs/web/generators/` with a fixture component (test-only directory excluded from build entry discovery, or an inline `ts.createSourceFile`-based harness — prefer a real fixture dir excluded via the existing `index.ts` discovery rule plus explicit test wiring). The fixture exercises: renamed attribute, `attribute: false`, reflected property, getter-only readonly, union type with exported alias (references), un-annotated property, `CustomEvent<T>` with local detail type, `Event` subclass dispatch, JSDoc-only slot/part, `@deprecated`, host-scss custom props with comments (block + multiline), and multi-part `part="a b"`. Snapshot the collector output and the built CEM declaration.
12. **Determinism check.** Test (or CI step) that runs `generate-types` and asserts `git diff --exit-code` on tracked generated files (index barrels, framework typings). The gitignored `custom-elements.json` is covered by the snapshot test instead.

## Phase 4 — CI gate (last, once clean)

13. **Strict mode.** Add `CEM_STRICT=1` (env) handling in `generate-all.ts`/`custom-elements.ts`: any collector warning or envelope issue → non-zero exit. Stop skipping `missing type text` silently — count and report; missing types are warnings (strict-fatal), uncovered identifiers remain the headline errors. Enable strict in the Nx `generate-types` target used by `build-lib`.

## Stretch (only if time permits, non-blocking)

- `superclass` from heritage clause instead of hardcoded `LitElement`/`lit`.
- Warning for non-literal `bubbles`/`composed` values in `hasBooleanOption`.
- Wire `../angular-cem-example-app` template diagnostics as an e2e verification of the envelope contract (fable-feedback C8).

## Verification

- `npx nx run web:generate-types` — zero warnings, zero envelope issues, strict mode passing.
- New vitest spec green: `npx nx run web:test`.
- `npx nx run web:build-lib` — dist `package.json` has `"sideEffects": ["./*.js"]`; `custom-elements.json` copied; `close` events read `CustomEvent<void>`.
- Negative tests: temporarily add a variable-indirection dispatch and a node_modules-typed annotation to the fixture; confirm warnings/strict failure.
