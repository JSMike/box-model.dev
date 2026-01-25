# Session 31

**Date:** 2026-01-24

## Completed
- Fixed invalid `:readOnly` CSS pseudo-class in RSD input/textarea styles for Next.js CSS parser compatibility.

## Current Status
- Next.js build should no longer fail on `strict.css` parsing; needs a rebuild to confirm.

## Files Changed
- `libs/rsd/src/input/input.tsx` - switched to `:read-only` pseudo-class.
- `libs/rsd/src/textarea/textarea.tsx` - switched to `:read-only` pseudo-class.

## Next Steps
- Re-run `npx nx run box-model-rsd-nextjs:build` and verify the build completes.
