# BOX-40: Add platform-specific CloseControl SVG support

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | backlog                             |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | enhancement                         |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | medium                              |

## Summary

Introduce platform-specific implementations (e.g., `.web.tsx` / `.native.tsx`) for CloseControl so web can use SVG and native can use a compatible fallback. Revisit if React Strict DOM adds SVG support in a future release.

## Scope
- Create `close-control.web.tsx` with SVG-based icon rendering.
- Create `close-control.native.tsx` with a non-SVG fallback (e.g., text or RN-safe icon).
- Ensure exports resolve per platform and Storybook uses the web implementation.
- Document the platform split and note potential future cleanup if RSD adds SVG support.

## Acceptance Criteria
- [ ] Web build uses SVG-based close icon without TS errors.
- [ ] Native build uses a non-SVG fallback without runtime warnings.
- [ ] Storybook renders the web version.
