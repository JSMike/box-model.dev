# Plan: BOX-53 CEM Generators Refactor

See Cursor plan `cem_generators_refactor_b91b8e31.plan.md` for the full locked decisions and architecture.

## Approach

1. Expand `component-metadata.ts` into a shared AST/JSDoc/SCSS collector.
2. Add `custom-elements.ts` CEM emitter; wire Nx, gitignore, vite copy, package.json.
3. Point react/preact/solid/tag-name-map at the shared core.
4. Rename mismatched CSS prefixes; annotate all components; fix Storybook name drift.
5. Verify generate-types, schema validation, build-lib, and tests.
