# Session 30

**Date:** 2026-01-24

## Completed
- Reverted the Next.js project.json override that forced webpack.
- Restored ESM PostCSS/Babel configs for the Next app to mirror RSD Storybook setup.
- Updated RSD Next.js setup notes to reflect the ESM config filenames and `useLayers`.

## Current Status
- Next app now uses `postcss.config.js` and `babelLoader.config.js` aligned with the RSD Storybook config (tokens alias + `useLayers`).
- Needs a rebuild to confirm RSD CSS extraction is now reflected in the Next app output.

## Files Changed
- `apps/box-model-rsd-nextjs/project.json` - removed webpack-only targets.
- `apps/box-model-rsd-nextjs/babelLoader.config.js` - aligned StyleX config with RSD Storybook (tokens alias).
- `apps/box-model-rsd-nextjs/postcss.config.js` - ESM PostCSS config with `useLayers`.
- `apps/box-model-rsd-nextjs/postcss.config.mjs` - removed in favor of `.js`.
- `apps/box-model-rsd-nextjs/rsd-nextjs-llms.txt` - corrected filenames and options.

## Next Steps
- Re-run `npx nx run box-model-rsd-nextjs:build` and verify CSS output in the built page matches RSD Storybook.
- Spot-check http://localhost:3000/ for padding/color parity with RSD Storybook.
