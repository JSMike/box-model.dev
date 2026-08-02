# Summary: BOX-65 - Migrate workspace to Nx 23 and refresh RSD dependencies

## Completed

2026-08-01 by Agent

## What Was Done

Migrated the workspace from Nx 22.7.7 through the final Nx 22 patch to Nx 23.1.1 using the
generated Nx migration workflow. Updated the compatible React Strict DOM, React, Next.js, Expo,
Storybook, Vite, Vitest, TypeScript, ESLint, and supporting toolchains while preserving the web
library baseline and validating the RSD library across its Next.js and Expo consumers.

The migration included flat ESLint configuration, Vite 8/Rolldown-compatible StyleX compilation,
Expo SDK 56 Metro and package compatibility, React Native Web test resolution, corrected RSD
package exports, and refreshed workspace TypeScript configuration. Generated migration manifests
and temporary prompt artifacts were removed after review.

Review remediation corrected the RSD stylesheet subpath so it exports the extracted CSS with
TypeScript declarations and side-effect metadata, added a standalone TypeScript/Vite package
consumer check, enabled strict layout conformance at the Expo application root, and made the Vite
application's clean type-check build its referenced web-library declarations.

## Files Changed

- `package.json`, `package-lock.json`, and `.npmrc` - refreshed dependencies, package-manager
  metadata, and the documented temporary Nx/React Native peer-install policy.
- `nx.json`, `tsconfig.json`, and `tsconfig.base.json` - Nx 23 and TypeScript 6 workspace
  configuration.
- `.eslintignore`, `.eslintrc.json`, `eslint.config.mjs`, and project ESLint configs under
  `apps/**` and `libs/**` - replaced legacy ESLint configuration with flat config.
- `vitest.workspace.ts` and `vitest.config.ts` - migrated workspace-level Vitest configuration.
- `apps/box-model-rsd-expo/**` and `apps/box-model-rsd-expo-e2e/**` - Expo SDK 56 package, Metro,
  TypeScript, lint, and strict layout-conformance updates.
- `apps/box-model-rsd-nextjs/**` and `apps/box-model-rsd-nextjs-e2e/**` - Next.js, TypeScript, and
  flat-lint migration updates.
- `apps/box-model-web-vite/project.json`, `apps/box-model-web-vite/vite.config.ts`, and associated
  application/e2e TypeScript and lint configs - Vite 8 compatibility and reliable clean
  project-reference type-checking.
- `libs/rsd/**` - Vite 8 StyleX compilation, package metadata and exports, extracted stylesheet
  entry, standalone package verification, consumer documentation, test resolution, TypeScript,
  Storybook, and lint migration work.
- `libs/rsd-app/**` - Vite 8 StyleX, Storybook, TypeScript, and lint migration updates.
- `libs/web/**`, `libs/tokens/**`, and `libs/storybook-utils/**` - Vite 8, TypeScript 6, generated
  artifact, and flat-lint compatibility updates.
- `.issues/BOX-65/issue.md`, `.issues/BOX-65/plan.md`, `.issues/BOX-65/summary-1.md`,
  `.issues/BOX-65/summary-2.md`, this summary, and `.issues/index.md` - complete issue audit trail
  and final status.

## Key Decisions Made

- Applied the final Nx 22 patch before crossing to Nx 23, keeping generated migrations as the
  source of truth for framework configuration changes.
- Kept official Nx package versions aligned and accepted only dependency upgrades compatible with
  the selected React, React Native, Expo, and RSD baseline.
- Used `@rolldown/plugin-babel` with the React Strict DOM preset so Vite 8 package builds retain
  compile-time StyleX extraction.
- Exported `@box-model/rsd/styles` directly to CSS instead of relying on an empty JavaScript side
  effect, with declaration metadata for TypeScript consumers.
- Added package-consumer verification rather than relying only on inspecting the generated npm
  manifest.
- Used a strict-layout RSD wrapper at the Expo root and preserved full-height application layout.
- Kept the Vite application's web-library project reference and made its type-check target build
  the reference, preserving Nx's synchronized project graph while eliminating stale-output
  dependence.
- Deferred incompatible or unrelated major upgrades and deprecated inferred-target conversion to
  focused follow-up work.

## Deviations from Plan

- Review identified three follow-up items after the original eight-step migration plan. Plan items
  9-12 were added for stylesheet packaging, Expo strict layout conformance, clean Vite
  type-checking, and regression verification.
- The clean Vite type-check failure may have predated BOX-65, but it was repaired because the
  migration review exposed it and the full workspace verification depended on it.
- Standalone consumer validation revealed that the CSS-only export also needed a TypeScript
  declaration condition; that was added before final acceptance.

## Acceptance Criteria Results

- [x] All official Nx packages are aligned on Nx 23.1.1, confirmed by `npx nx report`.
- [x] The workspace passed through Nx 22.7.8 before the Nx 23 migration.
- [x] Generated Nx migrations were reviewed, executed, and removed after completion.
- [x] Compatible RSD, React, Next.js, Expo, Storybook, Vite, Vitest, TypeScript, and supporting
      dependencies were refreshed; deferred majors are documented in session records.
- [x] RSD, RSD-app, Next.js, and Expo passed lint/type-check and proportionate build/test coverage.
- [x] The web library retained its build baseline and passed 34 test files / 92 tests.
- [x] Deferred majors, existing warnings, four TODO RSD-app tests, and inherited audit findings are
      documented in the session summaries.
- [x] Review remediation passed standalone RSD package consumption, clean Vite type-checking,
      Next production build, and Expo web/iOS/Android export verification.

## Verification

- `npx nx report`
- `npx nx sync:check`
- `npx expo install --check`
- `npx nx run-many -t lint,typecheck --all --skip-nx-cache --outputStyle=static`
- `npx nx run-many -t test -p rsd,web --excludeTaskDependencies --skip-nx-cache --outputStyle=static`
- `npx nx typecheck box-model-web-vite --skip-nx-cache --outputStyle=static`
- `npx nx verify-package rsd --skip-nx-cache --outputStyle=static`
- `npx nx build box-model-rsd-nextjs --skip-nx-cache --outputStyle=static`
- `npx nx export box-model-rsd-expo --skip-nx-cache --outputStyle=static`
- `npx nx format:check` and `git diff --check`

## Artifacts

- Branch: `rsd`
- PR: -
- Commits: - (changes remain in the working tree)

## Notes

- User verification and acceptance was provided explicitly with: "Box-65 is done".
- Existing RSD lint/mock warnings and deferred dependency/tooling upgrades remain separate
  follow-up concerns and do not block BOX-65.
