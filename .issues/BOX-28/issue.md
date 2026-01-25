# BOX-28: Implement Tag component in libs/rsd

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
Implement the Tag component in the @box-model/rsd library to enable cross-platform (web/native) tag/label UI patterns.

## Context
The BOX-27 audit identified TagBox as a high-priority component for RSD implementation:
- Used in **3 files** in box-model-app (blog-article.tsx, blogs.tsx, home.tsx)
- Primary use cases: blog post tags, component categorization, token labels
- Enables consistent tagging UI across web and future native apps

## Requirements
Based on the existing @box-model/web TagBox:
- Support text content display
- Support variant styles (if applicable)
- Use StyleX tokens for theming consistency
- React Strict DOM compatible (web + native)

## Acceptance Criteria
- [x] Create `libs/rsd/src/tag/` folder structure
- [x] Implement Tag component with StyleX styling
- [x] Add unit tests (`tag.spec.tsx`)
- [x] Add Storybook stories (`tag.stories.tsx`)
- [x] Add MDX documentation (`tag.mdx`)
- [x] Export from `libs/rsd/src/index.ts`
- [x] Verify Storybook renders correctly

## References
- Related files:
  - `libs/web/src/tag/` - Reference implementation
  - `libs/rsd/src/badge/` - Similar RSD component pattern
- Related issues:
  - BOX-27: Audit that identified this component
  - BOX-22: RSD library scaffold
