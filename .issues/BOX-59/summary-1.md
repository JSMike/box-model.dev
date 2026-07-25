# Session 1

**Date:** 2026-07-25

**Prompt/Ask:** Update Lit to 3.3.3, audit other dependencies that had not been refreshed
recently, and use Nx migrations where appropriate without taking knowingly breaking
major-version upgrades.

## Completed

- Updated the root Lit development dependency and `@box-model/web` runtime dependency from
  `^3.3.1` to `^3.3.3`.
- Used `nx migrate` to update the complete Nx package set from 22.4.1 to the newest Nx 22
  release, 22.7.7, and ran its generated migrations.
- Retained the migration's aligned SWC changes:
  - `@swc-node/register` 1.12.1
  - `@swc/cli` 0.7.10
  - `@swc/core` 1.15.8
  - `@swc/helpers` 0.5.23
- Applied the effective Nx workspace migrations:
  - ignore `.claude/worktrees`
  - ignore `.nx/self-healing` during formatting
- Ran `nx sync` and accepted its missing `rsd-app` to `rsd` TypeScript project reference.
- Refreshed the npm lockfile within every currently declared semver range. Notable resolved
  updates include Expo 54.0.36, Storybook 10.5.4, Vite 7.3.6, Sass 1.102.0,
  TypeScript ESLint 8.65.0, Playwright 1.62.0, and Style Dictionary 5.5.0.
- Updated Next.js and its ESLint packages to 16.2.11. This stays within Next 16, is supported
  by `@nx/next@22.7.7`, and replaces the vulnerable 16.1.7 version selected by the Nx
  migration.
- Removed the transient `migrations.json` after all migrations completed successfully.
- Rebuilt, packed, and installed the exact `@box-model/web@0.0.1` artifact in both a clean
  consumer and the Angular CEM example application.

## Current Status

- BOX-59 is in **review**.
- The release-critical web package path is green and the packed artifact uses Lit 3.3.3 as an
  external runtime dependency.
- No dependency major versions were adopted.
- No staging, commit, push, tag, or npm publication was performed.

## Plan Coverage

- [x] Registry and installed dependency audit
- [x] Nx 22 migration and generated migrations
- [x] Lit 3.3.3 metadata update
- [x] Range-bounded npm lockfile refresh
- [x] Direct/transitive dependency-tree review
- [x] Web package release verification
- [x] Cross-workspace verification
- [x] Deferred-upgrade documentation

## Files Changed

- `package.json` — Lit, Nx, SWC, and Next ecosystem versions
- `package-lock.json` — refreshed direct and transitive dependency resolutions
- `libs/web/package.json` — publish Lit 3.3.3 as the runtime dependency
- `libs/rsd-app/tsconfig.lib.json` — Nx-synchronized reference to the RSD library
- `.gitignore` — Nx migration ignore for `.claude/worktrees`
- `.prettierignore` — Nx migration ignore for `.nx/self-healing`
- `.issues/index.md` — register BOX-59 and move it to review
- `.issues/BOX-59/issue.md` — dependency-refresh requirements and review status
- `.issues/BOX-59/plan.md` — implementation and verification plan
- `.issues/BOX-59/summary-1.md` — this session record

## Verification

- `npx nx migrate 22.7.7 --interactive=false` — generated the expected Nx 22 migrations
- `npx nx migrate --run-migrations=migrations.json` — pass
- `npx nx sync:check` — workspace is up to date
- `npx nx report` — all Nx packages report 22.7.7
- `npx expo install --check` — reported only the pre-existing Jest/React type-version
  alignment concerns listed below
- `npm ls --depth=0` — pass; direct dependency tree is valid
- `npx nx run web:generate-types` — pass; strict CEM generation for 34 components
- `npx nx run web:typecheck` — pass
- `npx nx run web:lint` — pass
- `npx nx run web:test` — pass, 29 files / 58 tests
- `npx nx run web:build-lib` — pass with Vite 7.3.6
- Web Storybook build — pass with Storybook 10.5.4
- RSD and RSD-app Storybook builds — pass with Storybook 10.5.4
- `npx nx build box-model-rsd-nextjs` — pass with Next 16.2.11, including TypeScript,
  static routes, and SSR routes
- RSD, RSD-app, and Expo type-check targets — pass after `nx sync`
- `npm pack ./dist/libs/web` — 124,691 bytes, 214 files, CEM present, no bundled Lit chunk
- `npm publish ./dist/libs/web --dry-run --access public` — pass
- Clean packed-package consumer — resolves one `lit@3.3.3`; zero production audit findings
- Angular CEM example `npm run build` — pass; no Box Model manifest diagnostics
- Angular CEM example `npm test -- --watch=false` — pass, 3 files / 6 tests

## Deferred / Existing Concerns

- Major upgrades remain separate work: Nx 23, Expo 57, Vite 8, TypeScript 7, React Native
  0.86, ESLint 10, Prettier 3, and other reported majors.
- Expo 54 expects Jest 29 and React 19.1 type packages, while this workspace already uses
  Jest 30 and React 19.2 type packages. Expo type-checking passes, but changing these versions
  should be a coordinated test-toolchain decision rather than an automatic update.
- The root production graph still reports three high findings through the newest Next
  16.2.11 (`postcss` and `sharp` transitive ranges). The published `@box-model/web` artifact
  has zero production audit findings. Avoid an unsupported `sharp` override or npm's proposed
  breaking/downgrade fix; reassess when Next publishes a compatible dependency update.
- The repository declares pnpm in `packageManager` but tracks and uses `package-lock.json`.
  Package-manager normalization remains separate workflow work.
- The broad workspace verification exposed existing issues outside this dependency refresh:
  broken/ignored lint configurations in RSD/RSD-app/Next, project-reference output assumptions
  in the Vite demo type-check, Vite test resolution failures in the RSD/Vite apps, and a bad
  Jest preset path in the Next test target. Release-critical web tests pass in isolation; the
  same CEM tests only timed out when run concurrently with three Storybook builds.

## Next Steps

- Review the dependency and migration diff, then commit BOX-55's external-Lit build change and
  BOX-59's dependency refresh in a deliberate commit sequence.
- Keep the major upgrades and existing cross-workspace configuration debt in separate issues.
- Publish `@box-model/web@0.0.1` only after the source commits are pushed and reviewed.
