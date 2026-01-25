# BOX-41: Align RSD screens/components with web reference

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | in-progress                         |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | design-review                       |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | high                                |

## Summary

Align `apps/box-model-rsd-nextjs` + `libs/rsd-app` screens and `libs/rsd` components (especially Card) with the `apps/box-model-web-vite` + `libs/web` reference. Close visual/layout gaps, restore missing content and navigation, and implement responsive breakpoints so layouts adapt at expected widths.

## Observed gaps (Playwright 2026-01-24)
- RSD home lacks header/nav + Storybook link; CTA set differs (buttons vs links).
- Missing or simplified copy/sections (tool-box block, theming mixins code blocks, component lists under "The Boxes").
- Token samples and content cards appear reduced compared to reference.
- No apparent responsive layout shifts at 375px width.

## Scope
- Audit `Home`, `About`, `Blogs`, `BlogArticle` screens in `libs/rsd-app` against `apps/box-model-web-vite/src/pages/*` and align structure, copy, and component usage.
- Update `@box-model/rsd` components used by these screens (prioritize Card) to match `@box-model/web` visual specs (spacing, borders, typography, slots, and layout behavior).
- Implement responsive layout rules in RSD screens/components using StyleX media queries to mirror web breakpoints.
- Validate alignment in `apps/box-model-rsd-nextjs` for both desktop and mobile widths.

## Acceptance Criteria
- [ ] RSD Next.js screens match the web reference content and layout for Home/About/Blogs/BlogArticle (structure, copy, and navigation parity).
- [ ] `@box-model/rsd` Card matches `@box-model/web` card visual/slot behavior where used in the screens.
- [ ] Responsive behavior matches web layout at defined breakpoints (mobile/tablet/desktop) with clear layout shifts.
- [ ] No bespoke UI or styling added to `apps/box-model-rsd-nextjs` beyond screen composition.
