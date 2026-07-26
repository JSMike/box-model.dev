# BOX-58: slotStyleService constructable stylesheet portability (jsdom)

<!-- Metadata -->

| Field      | Value                            |
| ---------- | -------------------------------- |
| Status     | ready                            |
| Owner      | Agent                            |
| Complexity | medium                           |
| Created    | 2026-07-13                       |
| Source     | Angular CEM integration (BOX-55) |
| External   |                                  |
| Blocks     |                                  |
| Blocked-by |                                  |
| Priority   | medium                           |

## Summary

`slotStyleService` assumes `Document` and `ShadowRoot` expose mutable `adoptedStyleSheets` arrays and calls `push` / `includes` / `splice` on them. In Angular’s jsdom test environment those arrays are often `undefined`, causing runtime errors. This is a runtime/test portability issue (not a CEM typing defect).

## Context

Surfaced while running Angular unit tests against `@box-model/web` in `../angular-cem-example-app`. Box Model’s `libs/web/vitest.setup.ts` mocks `CSSStyleSheet.replaceSync` but not `adoptedStyleSheets`. The Angular demo added its own shim in `src/test-setup.ts`.

Relevant source: `libs/web/src/common/slot-style.ts` (`getAdoptedStylesheets` / `setSlotStyles` / `removeStyle`).

## Acceptance Criteria

Choose and implement one (or both) of:

- [ ] **Feature-detect + fallback:** `slotStyleService` detects constructable stylesheet / `adoptedStyleSheets` support; when missing, inject a `<style>` (or equivalent) fallback so slot styles still apply without throwing
- [ ] **Reusable test shim:** Export a complete test-environment shim from `@box-model/web` (e.g. `@box-model/web/test-setup` or documented setup helper) that polyfills `adoptedStyleSheets` + `CSSStyleSheet.replaceSync` for jsdom; document usage for Vitest, Jest, and Angular test beds

Also:

- [x] Box Model’s own Vitest setup uses the documented `CSSStyleSheet` and
      `adoptedStyleSheets` shim path so library tests and consumer tests stay aligned
- [x] Document the requirement and Vitest/Jest setup in `libs/web/README.md` and Storybook
- [ ] Angular demo can drop its one-off shim once the library solution lands (verify in follow-up)

## References

- `libs/web/src/common/slot-style.ts`
- `libs/web/vitest.setup.ts`
- `.issues/BOX-55/summary-3.md`
- Demo shim: `../angular-cem-example-app/src/test-setup.ts`
