# Session 16

**Date:** 2026-01-24

## Completed
- Added React Strict DOM Babel + PostCSS configs for the Next.js app.
- Wired Turbopack and webpack to use the RSD babel loader.
- Added `babel-loader` dependency for Next.js builds.

## Current Status
- Next.js should compile StyleX output instead of hitting runtime `stylex.create` errors.

## Files Changed
- `apps/box-model-rsd-nextjs/babelLoader.config.js` - RSD babel preset config.
- `apps/box-model-rsd-nextjs/postcss.config.mjs` - RSD PostCSS extraction with shared library includes.
- `apps/box-model-rsd-nextjs/next.config.ts` - add transpilePackages + turbopack rules + babel loader rule.
- `package.json` - add `babel-loader` devDependency.

## Next Steps
- Run `npx nx run box-model-rsd-nextjs:build` to confirm stylex errors are resolved.
- Install dependencies if `babel-loader` is missing locally.
