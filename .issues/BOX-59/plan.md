# Plan: BOX-59 - Refresh non-breaking workspace dependencies

1. Audit direct dependencies with the npm registry and identify versions allowed by the current
   package ranges.
2. Check the installed Nx line with `nx migrate`; do not cross the Nx 22 major-version boundary.
3. Update both root development metadata and `@box-model/web` runtime metadata to Lit 3.3.3.
4. Refresh `package-lock.json` and installed packages only within the existing declared ranges.
5. Review the resulting direct and transitive changes for ecosystem alignment and unexpected majors.
6. Verify the web library's generator, build, tests, lint, type-check, and packed npm artifact.
7. Run proportionate workspace verification for the other affected toolchains.
8. Record deferred major updates and the final verification results in a session summary.
