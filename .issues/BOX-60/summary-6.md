# Session 6

**Date:** 2026-07-26

**Prompt/Ask:** Keep `slotStyleService` as a shared internal library service rather than exposing
it as an end-user API in the initial npm release.

## Completed

- Added one shared entrypoint-classification helper that identifies `common` as an internal source
  directory.
- Updated root-barrel generation to omit internal directories while continuing to generate their
  internal index files.
- Updated the Vite entrypoint discovery used to build package exports so `./common` and
  `./common.js` are not emitted.
- Kept `slotStyleService` in the TypeScript and runtime module graphs so component-relative imports
  continue to share the same implementation.
- Used the declaration plugin's output hook to suppress orphaned `common/*.d.ts` files without
  excluding the internal source from TypeScript compilation.
- Added a focused classification test so future internal directories can use the same boundary.

## Files Changed

- `libs/web/generators/library-entrypoints.ts` - Define the public/internal directory boundary.
- `libs/web/generators/library-entrypoints.spec.ts` - Verify `common` is internal and component
  directories remain public.
- `libs/web/generators/tag-name-map.ts` - Exclude internal directories from the generated root
  barrel.
- `libs/web/src/index.ts` - Regenerated without the `common` re-export.
- `libs/web/vite.config.ts` - Exclude internal directories from JS/package entrypoints and
  declaration output.
- `.issues/BOX-60/issue.md` - Record the internal-service acceptance criterion.
- `.issues/BOX-60/plan.md` - Record the package-boundary step.

## Verification

- `CEM_STRICT=1 npx tsx libs/web/generators/generate-all.ts`
- `npx nx run-many -t lint,typecheck,test -p web --skip-nx-cache --parallel=2`
  - 34 test files passed.
  - 92 tests passed.
- `npx nx run web:build-lib --skip-nx-cache`
  - Build completed without TypeScript diagnostics.
  - No `./common` package export or `common.js` entrypoint was emitted.
  - No `common/*.d.ts` files were emitted.
- `npm pack --dry-run --json`
  - `@box-model/web@0.0.1`, 217 files.
  - No public or orphaned `common` files.
  - Framework declarations and changelog remain present.
- `npm publish ./dist/libs/web --dry-run --access public --json`
  - Public publication dry run passed for the same 217-file artifact.

## Current Status

- Status: **review**
- `slotStyleService` remains shared by library components but is no longer part of the npm
  package's addressable public API.
