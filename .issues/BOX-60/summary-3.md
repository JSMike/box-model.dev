# Session 3

**Date:** 2026-07-26

**Prompt/Ask:** Include the generated React, Preact, and Solid JSX declarations in 0.0.1 and add
framework setup documentation beside the Storybook introduction.

## Completed

- Added type-only `@box-model/web/react`, `@box-model/web/preact`, and `@box-model/web/solid`
  package exports.
- Corrected latent circular and missing-tag-map errors in all three generated declaration formats
  by deriving framework base props directly from each web component class.
- Added semantic compilation tests proving valid JSX passes and invalid `tag-box` variants fail for
  React, Preact, and Solid.
- Added Preact and Solid as development-only dependencies so all supported declaration formats are
  verified in the repository.
- Documented the requested `compilerOptions.types` setup in the npm README.
- Added a Framework typings Storybook page and pinned it directly after Introduction in the
  sidebar.
- Added the same framework setup guidance to the packaged Agent Skill.
- Rebuilt the 0.0.1 package and verified the requested `types` entries from an isolated tarball
  install with each framework present.

## Verification

- `npx nx run-many -t lint,typecheck,test -p web --skip-nx-cache --parallel=1`
- 33 Vitest files / 87 tests passed
- `npx nx run web:build-lib --skip-nx-cache`
- Isolated packed-package React, Preact, and Solid `tsc` checks passed
- `npx nx run web:test-a11y --skip-nx-cache`
- Storybook build passed; 30 Canvas stories passed Axe in light and dark themes
- `npm publish --dry-run --access public` passed for the 135,219-byte, 221-file tarball

## Current Status

- Status: **review**
