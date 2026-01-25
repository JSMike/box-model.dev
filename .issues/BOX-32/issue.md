# BOX-32: Implement StatusIcon component in libs/rsd

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | done                                |
| Owner        | TBD                                 |
| Created      | 2026-01-24                          |
| Source       | audit (BOX-27)                      |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | high                                |

## Summary
Implement the StatusIcon component in the @box-model/rsd library to enable cross-platform status indicator display.

## Context
The BOX-27 audit identified StatusIconBox as a low-priority component for RSD implementation:
- Used in **1 file** in box-model-app (components/TerminalBox.tsx)
- Primary use cases: visual status indicators (success, error, warning, info)
- Enables consistent status iconography across web and future native apps

## Requirements
Based on the existing @box-model/web StatusIconBox:
- Display status indicator icon
- Support multiple status variants (success, error, warning, info, neutral)
- Appropriate color coding per status type
- Use StyleX tokens for theming consistency
- React Strict DOM compatible (web + native)

## Acceptance Criteria
- [ ] Create `libs/rsd/src/status-icon/` folder structure
- [ ] Implement StatusIcon component with StyleX styling
- [ ] Support all status variants with appropriate icons/colors
- [ ] Add unit tests (`status-icon.spec.tsx`)
- [ ] Add Storybook stories (`status-icon.stories.tsx`)
- [ ] Add MDX documentation (`status-icon.mdx`)
- [ ] Export from `libs/rsd/src/index.ts`
- [ ] Verify Storybook renders correctly

## References
- Related files:
  - `libs/web/src/status-icon/` - Reference implementation
  - `libs/rsd/src/badge/` - Similar simple indicator component in RSD
- Related issues:
  - BOX-27: Audit that identified this component
  - BOX-22: RSD library scaffold
