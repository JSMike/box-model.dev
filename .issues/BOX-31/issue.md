# BOX-31: Implement Stat component in libs/rsd

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
Implement the Stat component in the @box-model/rsd library to enable cross-platform metrics/statistics display.

## Context
The BOX-27 audit identified StatBox as a medium-priority component for RSD implementation:
- Used in **1 file** in box-model-app (home.tsx)
- Primary use cases: component category counts, metrics display with trends
- Enables consistent statistics UI across web and future native apps

## Requirements
Based on the existing @box-model/web StatBox:
- Display a numeric value prominently
- Support title/label text
- Support trend indicator (StatTrend) showing up/down/neutral
- Use StyleX tokens for theming consistency
- React Strict DOM compatible (web + native)

## Acceptance Criteria
- [ ] Create `libs/rsd/src/stat/` folder structure
- [ ] Implement Stat component with StyleX styling
- [ ] Implement StatTrend subcomponent (or integrated prop)
- [ ] Add unit tests (`stat.spec.tsx`)
- [ ] Add Storybook stories (`stat.stories.tsx`)
- [ ] Add MDX documentation (`stat.mdx`)
- [ ] Export from `libs/rsd/src/index.ts`
- [ ] Verify Storybook renders correctly

## References
- Related files:
  - `libs/web/src/stat/` - Reference implementation
  - `libs/rsd/src/badge/` - Similar simple display component in RSD
- Related issues:
  - BOX-27: Audit that identified this component
  - BOX-22: RSD library scaffold
  - BOX-3: Stat delta colors need AA audit (related accessibility concern)
  - BOX-11: Stat markdown container needs value/title slots
  - BOX-12: Stat trend indicators need clearer affordances
