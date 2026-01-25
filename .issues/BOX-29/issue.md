# BOX-29: Implement Terminal + TerminalLine components in libs/rsd

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
Implement Terminal and TerminalLine components in the @box-model/rsd library for cross-platform code/command display UI patterns.

## Context
The BOX-27 audit identified Terminal components as high-priority for RSD implementation:
- Used in **2 files** in box-model-app (home.tsx, components/TerminalBox.tsx)
- Primary use cases: installation commands, code examples, terminal-style UI
- Key pattern for developer-focused documentation and landing pages
- Enables consistent terminal UI across web and future native apps

## Requirements
Based on the existing @box-model/web terminal components:

### Terminal
- Container component for terminal-style display
- Support header/title area (optional)
- Monospace font styling
- Dark/themed background

### TerminalLine
- Individual line within Terminal
- Support prefix/prompt indicator
- Support line variants (command, output, comment)
- Copy-to-clipboard affordance (optional)

Both components:
- Use StyleX tokens for theming consistency
- React Strict DOM compatible (web + native)

## Acceptance Criteria
- [ ] Create `libs/rsd/src/terminal/` folder structure
- [ ] Implement Terminal component with StyleX styling
- [ ] Implement TerminalLine component with StyleX styling
- [ ] Add unit tests (`terminal.spec.tsx`)
- [ ] Add Storybook stories (`terminal.stories.tsx`)
- [ ] Add MDX documentation (`terminal.mdx`)
- [ ] Export from `libs/rsd/src/index.ts`
- [ ] Verify Storybook renders correctly

## References
- Related files:
  - `libs/web/src/terminal/` - Reference implementation
  - `libs/rsd/src/card/` - Similar container pattern in RSD
- Related issues:
  - BOX-27: Audit that identified these components
  - BOX-22: RSD library scaffold
