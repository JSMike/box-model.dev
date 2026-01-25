# Plan: BOX-40 - Platform-specific CloseControl SVG

<!-- Plan Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Created      | 2026-01-24                          |
| Author       | Agent                               |
| Approach     | Proposed                            |

## Steps
1) Add `close-control.web.tsx` with SVG markup.
2) Add `close-control.native.tsx` with compatible fallback.
3) Ensure exports and tooling resolve platform-specific files.
4) Update docs and Storybook notes.
