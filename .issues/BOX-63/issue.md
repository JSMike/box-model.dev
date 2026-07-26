# BOX-63: Refresh the Vite showcase with the Box Model surface language

<!-- Metadata -->

| Field      | Value              |
| ---------- | ------------------ |
| Status     | review             |
| Owner      | Agent              |
| Complexity | medium             |
| Created    | 2026-07-25         |
| Source     | User visual review |
| External   |                    |
| Blocks     |                    |
| Blocked-by |                    |
| Priority   | medium             |

## Summary

Refresh the `box-model-web-vite` showcase so its shell and page hierarchy demonstrate the
design system's square, layered, offset-shadow aesthetic instead of leaving the component
examples on an otherwise flat canvas.

## Acceptance Criteria

- [x] The app shell, hero, and major content groups establish a clear square surface hierarchy
- [x] The app consumes public `@box-model/web` components and surface helpers instead of bespoke UI
- [x] Component examples remain the visual source of truth and page styles stay layout-focused
- [x] Desktop and narrow layouts remain readable and navigable
- [x] Light and dark color schemes, keyboard focus, and forced-colors behavior remain usable
- [x] App tests, type checking, linting, and production build pass
