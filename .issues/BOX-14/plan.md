# Plan

1. Reproduce every tooltip placement in the live Storybook docs and identify the faulty anchor
   geometry.
2. Use `position-area` with `position-try` viewport fallbacks in current browsers, while retaining
   explicit `anchor()` coordinates for intermediate browsers and the OddBird polyfill.
3. Bind both Storybook examples to the placement control and add unit coverage for the placement
   contract.
4. Document the optional application-level polyfill initialization required for Lit constructed
   stylesheets.
5. Verify all four placements on both examples in Playwright, then run focused tests, lint, and
   accessibility checks.
