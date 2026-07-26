# Session 1

**Date:** 2026-07-25

**Prompt/Ask:** Apply the independent pre-release review recommendations to `@box-model/web`.

## Completed

- Hardened Markdown rendering by disabling raw HTML, allowlisting generated link and custom
  container attributes, and retaining Markdown-it's unsafe-protocol rejection.
- Made the shipped Sass entrypoint self-contained and added an isolated compilation test.
- Normalized close-control and WYSIWYG event delivery to one host-level event per activation.
- Fixed slot-only checkbox/radio legends and added meaningful WYSIWYG toolbar names and labelled
  form examples.
- Renamed the unpublished card `interactive` appearance flag to the non-semantic `hoverable` API.
- Completed BOX-4, BOX-56, and BOX-57 implementation work.
- Regenerated the CEM and React/Preact/Solid declarations.
- Added a browser Axe gate for all component Canvas stories in both themes.
- Packed and installed the built package in an isolated temporary project; verified root/subpath
  imports, the CEM export, Sass compilation, and required tarball contents.

## Verification

- `npx nx run-many --projects=web -t typecheck,lint,test,build-lib --skip-nx-cache`
- `npx nx run web:test-a11y --skip-nx-cache`
- 30 Vitest files / 72 tests passed.
- 30 Canvas stories passed Axe in both light and dark themes.
- Real Chromium interaction and security probes passed.
- Isolated packed-package smoke test passed.

## Current Status

- Status: **review**

## Next Steps

- Review the public API and token changes.
- Keep tooltip portability/association, framework JSX publication, explicit stat scheme tokens, and
  a future CDN bundle as separate follow-up work.
