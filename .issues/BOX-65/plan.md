# Plan: BOX-65 - Migrate workspace to Nx 23 and refresh RSD dependencies

1. Capture the current dependency, Nx, and cross-platform verification baseline.
2. Update Nx 22.7.7 to the final 22.7.8 patch and run any generated migrations.
3. Run the Nx 22 verification baseline before crossing the major boundary.
4. Generate the Nx 23.1.1 migration, install its package changes, and run the generated
   migrations.
5. Review Nx migration output and reconcile configuration for the RSD library, Next.js app,
   Expo app, Storybook, Vite, Vitest, ESLint, and TypeScript.
6. Refresh compatible non-Nx dependencies, prioritizing the RSD runtime and cross-platform app
   toolchains; document intentionally deferred majors.
7. Run focused RSD and web verification followed by the practical workspace build baseline.
8. Update the issue record with exact changes, verification, and remaining parity work.
9. Repair the packed RSD stylesheet subpath and verify it from a standalone Vite consumer.
10. Enable React Strict DOM's strict layout-conformance mode at the Expo application root.
11. Make the Vite application's type-check target build its project references so clean
    type-checks do not depend on stale declaration output.
12. Re-run focused package, web, Next.js, and Expo verification before returning to review.
