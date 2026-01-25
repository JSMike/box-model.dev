# Session 15

**Date:** 2026-01-24

## Completed
- Adjusted Turbopack alias for `@react-navigation/native` to use a relative path (avoids the unsupported server-relative import error).

## Current Status
- Next.js build should resolve the navigation alias without Turbopack path errors.

## Files Changed
- `apps/box-model-rsd-nextjs/next.config.ts` - use `./src/lib/react-navigation.ts` for Turbopack alias.

## Next Steps
- Re-run `npx nx run box-model-rsd-nextjs:build` to confirm the alias resolves.
