# BOX-65: Migrate workspace to Nx 23 and refresh RSD dependencies

<!-- Metadata -->

| Field      | Value        |
| ---------- | ------------ |
| Status     | done         |
| Owner      | Agent        |
| Complexity | high         |
| Created    | 2026-08-01   |
| Source     | user-request |
| External   |              |
| Blocks     |              |
| Blocked-by |              |
| Priority   | high         |

## Summary

Move the workspace from the Nx 22 line deferred by BOX-59 to the current Nx 23 line, then
refresh compatible dependencies used by the React Strict DOM library and its Next.js and Expo
consumers. Use Nx's generated migrations, keep ecosystem versions aligned, and verify the RSD
cross-platform path rather than treating the web library as the only release-critical surface.

## Acceptance Criteria

- [x] All official Nx packages are aligned on the current Nx 23 release
- [x] The workspace first reaches the final Nx 22 patch before crossing the major boundary
- [x] All generated Nx migrations are reviewed, run, and removed when complete
- [x] Compatible RSD, React, Next.js, Expo, Storybook, Vite, Vitest, and supporting dependencies
      are refreshed without accepting unrelated unsupported majors blindly
- [x] `@box-model/rsd`, `rsd-app`, the RSD Next.js app, and the RSD Expo app pass proportionate
      build, type-check, lint, and test verification
- [x] The web library retains its established build and test baseline
- [x] Deferred or blocked dependency majors and pre-existing failures are documented

## Related Work

- BOX-35: RSD component parity
- BOX-37: Expo web RSD configuration
- BOX-39: RSD strict-DOM type errors
- BOX-41: RSD screen and behavior parity
- BOX-59: prior non-breaking dependency refresh that explicitly deferred Nx 23
