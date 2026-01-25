# Plan: BOX-26 - Align RSD Storybook docs with web stories

<!-- Plan Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Created      | 2026-01-24                          |
| Author       | Agent                               |
| Approach     | Proposed                            |

## Approach
- Compare web vs RSD stories/docs for Introduction, badge, button, and card.
- Mirror story structure and controls from web into RSD `.stories.tsx`, adjusting for RSD props and html.* usage.
- Mirror MDX structure/content from web into RSD `.mdx`, updating text/snippets for RSD patterns (css.create, zero radii, tokens.stylex).
- Verify Storybook (port 4401) builds and stories render with correct controls and docs.

## Steps
1) Audit web stories/docs and list deltas for badge, button, card, Introduction.
2) Update RSD `.stories.tsx` files to match story/controls organization while reflecting RSD props.
3) Update RSD `.mdx` docs to match web structure and examples, adapting code snippets to RSD.
4) Run `npx nx storybook rsd` and spot-check docs/controls for parity.
5) Record session summary and update issue status.
