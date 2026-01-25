# Session Summary: BOX-22 - Scaffold @box-model/rsd library

**Date**: 2026-01-24
**Status**: done

## Objective
Scaffold the `@box-model/rsd` React Strict DOM library with Storybook, token wiring, and initial components.

## Work Completed
- Created full `libs/rsd` project (NX targets, Vite config, Babel/PostCSS config, ESLint, TS configs, vitest setup, README).
- Added Storybook for RSD with Vite + react-strict-dom compilation and theme decorator; base strict.css/storybook.css wired to tokens.
- Implemented initial RSD components (button, card, badge) with `html.*` + `css.create`, zero border radius, token-driven CSS vars, and MDX/docs.
- Integrated design tokens via Style Dictionary output (`tokens.stylex.ts` copied into RSD) and StyleX `css.defineVars` usage in components.
- Fixed StyleX hashing and import resolution:
  - Dropped unexported preset plugin import; derive plugins from `react-strict-dom/babel-preset`.
  - Configured StyleX `unstable_moduleResolution` to accept `.stylex` imports pointing at `tokens.stylex.ts`.
- Resolved Nx project graph crash by removing duplicate `@nx/js/typescript` plugin entry.

## Verification
- `npx nx storybook rsd` now launches; StyleX tokens load without defineVars hashing errors.
- Tokens build copies `tokens.stylex.ts` into `libs/rsd/src` via `tokens:build`.

## Files Changed (high level)
- `libs/rsd/**` (project scaffold, Storybook, Babel/PostCSS config, components, docs).
- `libs/tokens/style-dictionary.config.js`, `libs/tokens/project.json` (generate and copy StyleX tokens).
- `nx.json` (clean plugin duplication).
- `.issues/BOX-22/*` (issue metadata, summaries).

## Follow-ups
- Align RSD Storybook stories/docs with web stories (new issue).
- Continue component parity with `@box-model/web` and add platform-specific variants as needed.
