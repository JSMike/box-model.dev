# Session 5

**Date:** 2026-07-26

**Prompt/Ask:** Revisit the framework event declarations so bubbling Box Model events can be
handled on ancestor elements instead of being typed only on the component that declares the event.

## Completed

- Confirmed with isolated TypeScript compilation that augmenting `JSX.IntrinsicAttributes` does
  not add event props to React or Preact intrinsic elements.
- Preserved component-specific event props so direct listeners retain the emitting component's
  precise event payload.
- Added a shared event surface for ancestor listeners:
  - Every Box Model React element receives the known custom-event props.
  - Preact's shared `JSX.DOMAttributes` receives the known custom-event props, including native
    ancestors.
  - Solid's documented `JSX.CustomEvents` interface receives the known custom events, producing
    `on:*` listeners on any ancestor.
- Folded event payloads with the same name into deterministic unions for ancestor listeners while
  retaining narrower component-specific overrides.
- Verified the React 19 runtime distinction: `onclose` receives a bubbling `close` event on a
  custom-element ancestor, while React ignores it on a native ancestor. Also verified that
  `onClose` on the native ancestor does not receive that custom event.
- Verified that Preact attaches `onclose` to both native and custom-element ancestors.
- Updated framework compilation fixtures and documentation to describe the supported ancestor
  behavior without advertising a React pattern that fails at runtime.

## Files Changed

- `libs/web/generators/react.ts` - Add known events to every generated Box Model React element.
- `libs/web/generators/preact.ts` - Augment Preact's shared DOM event attributes.
- `libs/web/generators/solid.ts` - Augment Solid's custom-event registry.
- `libs/web/generators/__fixtures__/framework-typings/*.tsx` - Compile direct and ancestor
  listeners.
- `libs/web/src/types/*.d.ts` - Regenerated framework declarations.
- `libs/web/README.md` - Document framework ancestor-listener behavior.
- `libs/web/src/FrameworkTypings.mdx` - Add ancestor guidance and the React native-element caveat.
- `.issues/BOX-60/issue.md` - Clarify the event-typing acceptance criterion.
- `.issues/BOX-60/plan.md` - Record direct and ancestor event coverage.

## Verification

- `CEM_STRICT=1 npx tsx libs/web/generators/generate-all.ts`
- `npx nx test web --skip-nx-cache`
  - 33 test files passed.
  - 91 tests passed, including all six framework/module-resolution combinations.
- `npx nx run web:lint --skip-nx-cache`
- `npx nx run web:typecheck --skip-nx-cache`
- `npx nx run web:build-lib --skip-nx-cache`
- `npx nx run web:build-storybook --skip-nx-cache`
- `npm publish --dry-run --access public --json`
  - `@box-model/web@0.0.1`, 222 files.
  - React, Preact, Solid, and changelog files are present.
- Isolated React 19 jsdom runtime probe:
  - Custom-element ancestor with `onclose`: listener called once.
  - Native ancestor with `onclose`: listener not called; React reports an invalid event prop.
  - Native ancestor with `onClose`: listener not called.
- Isolated Preact jsdom runtime probe:
  - Native ancestor with `onclose`: listener called once.
  - Custom-element ancestor with `onclose`: listener called once.

## Current Status

- Status: **review**
- The revised declarations support bubbling listeners where each framework can attach them
  declaratively and retain precise direct-listener types.
