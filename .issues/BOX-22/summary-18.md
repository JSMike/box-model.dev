# Session 18

**Date:** 2026-01-24

## Completed
- Adjusted StyleX module resolution to treat `.stylex` as the theme suffix so imports like `../tokens.stylex` resolve to `tokens.stylex.ts`.

## Current Status
- Storybook needs a restart to pick up the updated Babel config and clear the StyleX import resolution errors.

## Files Changed
- `libs/rsd/babel.config.js` - set `themeFileExtension` to `.stylex`.

## Next Steps
- Restart Storybook and confirm the StyleX import errors are gone.
