# BOX-30: Implement Markdown component in libs/rsd

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
Implement the Markdown component in the @box-model/rsd library to enable cross-platform rich text rendering.

## Context
The BOX-27 audit identified MarkdownBox as a medium-priority component for RSD implementation:
- Used in **2 files** in box-model-app (blog-article.tsx, about.tsx)
- Primary use cases: blog article content, about page content
- Enables consistent markdown rendering across web and future native apps

## Requirements
Based on the existing @box-model/web MarkdownBox:
- Render markdown content as styled HTML/native elements
- Support common markdown syntax (headings, lists, code blocks, links, etc.)
- Use StyleX tokens for typography and spacing consistency
- React Strict DOM compatible (web + native)

## Technical Considerations
- May require a markdown parsing library (e.g., marked, remark)
- Native implementation may need different rendering approach
- Consider code syntax highlighting support

## Acceptance Criteria
- [ ] Create `libs/rsd/src/markdown/` folder structure
- [ ] Implement Markdown component with StyleX styling
- [ ] Add unit tests (`markdown.spec.tsx`)
- [ ] Add Storybook stories (`markdown.stories.tsx`)
- [ ] Add MDX documentation (`markdown.mdx`)
- [ ] Export from `libs/rsd/src/index.ts`
- [ ] Verify Storybook renders correctly

## References
- Related files:
  - `libs/web/src/markdown/` - Reference implementation
  - `libs/rsd/src/card/` - Similar RSD component pattern
- Related issues:
  - BOX-27: Audit that identified this component
  - BOX-22: RSD library scaffold
