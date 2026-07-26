# Session 1

**Date:** 2026-07-25

**Prompt/Ask:** Resolve the dialog and drawer dismissal defects before the initial web-library
publication.

## Completed

- Preserved native `cancel` handling so Escape closes dialog and drawer even when
  `no-backdrop-close` is set.
- Added target-sensitive native-dialog click handling so backdrop clicks close by default while
  content clicks remain open.
- Kept `no-backdrop-close` scoped to backdrop dismissal.
- Normalized close-control composition to emit one bubbling, composed parent `close` event.
- Updated stories and unit tests for the final interaction contract.
- Verified the behavior in real Chromium, including native Escape and modal backdrop behavior.

## Verification

- `npx nx run web:test --skip-nx-cache`
- Real-browser probe: Escape, content click, backdrop click, and close-control activation.

## Current Status

- Status: **review**

## Next Steps

- Review the interaction/API behavior and merge with the 0.0.1 release hardening work.
