# Session 12

**Date:** 2026-01-24

## Investigation Summary

This session investigated visual discrepancies between the web version (localhost:4200) and RSD version (localhost:3000) of the home page.

### Issues Identified

1. **Stat component border style** (FIXED in session 11)
   - Web uses `border-style: dashed`, RSD was using `solid`
   - Fixed in `libs/rsd/src/stat/stat.tsx`

2. **Theming cards not showing light/dark backgrounds** (ROOT CAUSE FOUND)
   - "Light surfaces" card should have `#f4f4f4` background, appears dark
   - Both cards appear with same dark background instead of light vs dark

3. **Tag border visibility** (deferred)
   - Tags in RSD have more visible borders than web version
   - Same token values used, may be perception issue

4. **Tool links spacing** (verified OK)
   - CSS has `gap: 12px` which is applied correctly
   - Links are separated, though appear tighter than web

## Root Cause Analysis: Theming Cards

### StyleX CSS Variable Mismatch

The investigation revealed a **StyleX CSS compilation sync issue**:

1. The `themeLight` style compiles to class `.xps8h92` with:
   ```css
   .xps8h92 { background-color: var(--x1hf93hn); }
   ```

2. However, the CSS variable `--x1hf93hn` is **not defined** on the page

3. The actual `#f4f4f4` value exists in different variables like `--x13wdhle`

4. This mismatch causes the background-color to resolve to nothing (transparent)

### Why This Happens

- StyleX generates atomic CSS classes with hashed variable names
- When the JS and CSS are compiled at different times or from different caches, the hashes can diverge
- The Next.js dev server caches both JS bundles and CSS, which can get out of sync

## Recommended Fix

To resolve the StyleX variable mismatch:

```bash
# 1. Stop the dev server

# 2. Clear Next.js cache
rm -rf apps/box-model-rsd-nextjs/.next

# 3. Rebuild all libraries
npx nx run-many --targets=build --projects=tokens,rsd,rsd-app --skip-nx-cache

# 4. Start dev server fresh
npx nx run box-model-rsd-nextjs:dev
```

## Technical Details

### Element Structure (Theming Cards)
```
Columns (flex container)
  └── Column wrapper (flex: 1 1 0, minWidth: 15rem)
      └── themeCard div (should have padding, bg color, border)
          └── themeHeader, content, tags
```

### Style Definition (home.tsx)
```tsx
themeCard: {
  display: 'flex',
  flexDirection: 'column',
  gap: spaceTokens.stackSm,
  paddingTop: spaceTokens.scale200,
  paddingBottom: spaceTokens.scale200,
  paddingLeft: spaceTokens.scale200,
  paddingRight: spaceTokens.scale200,
  borderWidth: sizeTokens.borderWidthHairline,
  borderStyle: 'solid',
  borderColor: colorBorderTokens.subtle,
},
themeLight: {
  backgroundColor: colorBackgroundTokens.surfaceLight, // #f4f4f4
  color: colorTextTokens.primaryLight,                 // #282828
  borderColor: colorBorderTokens.subtle,
},
```

### Browser Computed Styles (showing the issue)
- Expected padding: ~16px (from scale200)
- Actual padding: 0px (reset by react-strict-dom base styles)
- Expected backgroundColor: rgb(244, 244, 244) / #f4f4f4
- Actual backgroundColor: rgba(0, 0, 0, 0) (transparent due to undefined var)

## Files Examined
- `libs/rsd-app/src/home/home.tsx` - Home page with theming cards
- `libs/rsd/src/columns/columns.tsx` - Columns layout component
- `libs/rsd/src/tokens.stylex.ts` - Token definitions
- `apps/box-model-rsd-nextjs/next.config.mjs` - StyleX configuration
- `dist/libs/rsd-app/home-_WVHibof.js` - Compiled output

## Remaining Tasks
- [ ] Clear cache and rebuild to fix theming cards
- [ ] Verify Tag border appearance after rebuild
- [ ] Compare navigation styling after rebuild
- [ ] Final visual comparison of both sites
