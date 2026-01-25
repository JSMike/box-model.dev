# Session 1

**Date:** 2026-01-24

## Completed
- Created BOX-39 to track RSD strict-dom type fixes.
- Updated multiple RSD components to remove inline styles, replace unsupported elements/props, and align with available tokens.
- Adjusted component APIs where needed (Columns, Toolbar, Skeleton) and updated their stories.

## Current Status
- Code changes are in place; build validation still pending.

## Files Changed
- `libs/rsd/src/alert/alert.tsx` - use spacing tokens and remove invalid token references.
- `libs/rsd/src/banner/banner.tsx` - use spacing tokens and remove invalid token references.
- `libs/rsd/src/checkbox/checkbox.tsx` - aria-pressed uses boolean.
- `libs/rsd/src/close-control/close-control.tsx` - remove svg, use text icon, motion tokens.
- `libs/rsd/src/columns/columns.tsx` - gap/minWidth variants with stylex, add minWidth type.
- `libs/rsd/src/columns/columns.stories.tsx` - update minWidth controls and remove inline styles.
- `libs/rsd/src/columns/index.ts` - export ColumnsMinWidth.
- `libs/rsd/src/dialog/dialog.tsx` - role/aria-modal fixes.
- `libs/rsd/src/drawer/drawer.tsx` - role/aria-modal fixes.
- `libs/rsd/src/input/input.tsx` - motion tokens + typed onChange.
- `libs/rsd/src/select/select.tsx` - motion tokens, aria-disabled, typed onChange, disabled style.
- `libs/rsd/src/textarea/textarea.tsx` - motion tokens + typed onChange.
- `libs/rsd/src/list/list.tsx` - ordered/unordered styles moved into css.create.
- `libs/rsd/src/markdown/markdown.tsx` - remove unused token imports.
- `libs/rsd/src/progress/progress.tsx` - width quantized to static style variants.
- `libs/rsd/src/radio/radio.tsx` - replace legend element.
- `libs/rsd/src/skeleton/skeleton.tsx` - width/height variants (no inline styles).
- `libs/rsd/src/skeleton/skeleton.stories.tsx` - update size controls/docs.
- `libs/rsd/src/status-icon/status-icon.tsx` - aria-hidden boolean.
- `libs/rsd/src/table/table.tsx` - replace table elements with divs + roles.
- `libs/rsd/src/toast/toast.tsx` - variant styles moved into css.create.
- `libs/rsd/src/toolbar/toolbar.tsx` - gap variants with new ToolbarGap type.
- `libs/rsd/src/toolbar/toolbar.stories.tsx` - update gap controls/docs.
- `libs/rsd/src/tooltip/tooltip.tsx` - remove title attribute.
- `.issues/BOX-39/issue.md`, `.issues/BOX-39/plan.md` - new issue + plan.
- `.issues/index.md` - add BOX-39.

## Next Steps
- Run `npx nx run rsd:build-lib` to confirm type errors are resolved.
