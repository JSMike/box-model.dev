# Session 29

**Date:** 2026-01-24

## Completed
- Identified that `postcss-load-config` does not load `.mjs` configs; Next was skipping the RSD PostCSS plugin so `@react-strict-dom` extraction never ran.
- Converted the Next app PostCSS/Babel config files to CJS so they are discoverable.
- Updated Next.js RSD setup notes to reference the `.cjs` configs and correct `useCSSLayers` option name.

## Current Status
- `postcss.config.cjs` is now detected by `postcss-load-config`; Next builds should include extracted RSD CSS.

## Files Changed
- `apps/box-model-rsd-nextjs/postcss.config.cjs` - CJS config for `react-strict-dom/postcss-plugin`.
- `apps/box-model-rsd-nextjs/babelLoader.config.cjs` - CJS Babel config for RSD CSS extraction.
- `apps/box-model-rsd-nextjs/rsd-nextjs-llms.txt` - updated docs for CJS config usage.
- Removed `apps/box-model-rsd-nextjs/postcss.config.mjs` and `apps/box-model-rsd-nextjs/babelLoader.config.js` (renamed to `.cjs`).

## Next Steps
- Re-run `npx nx run box-model-rsd-nextjs:build` and verify CSS output (padding/color) now matches other apps.
- Re-check http://localhost:3000/ for correct spacing and token colors.
