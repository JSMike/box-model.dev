# Plan: BOX-23 - Add Codex slash command docs

<!-- Plan Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Created      | 2026-01-24                          |
| Author       | Agent                               |
| Approach     | Copy .claude command docs to .codex  |

## Approach

Mirror the `.claude/commands` content under `.codex/commands` by creating the directory and copying the issue/workflow markdown files verbatim, keeping any frontmatter intact.

## Files to Modify

- `.codex/commands/issue.md` - new file copied from `.claude/commands/issue.md`
- `.codex/commands/workflow.md` - new file copied from `.claude/commands/workflow.md`
- `.issues/index.md` - update index for BOX-23 status

## Implementation Steps

1. [x] Create `.codex/commands/` directory.
2. [x] Copy `issue.md` and `workflow.md` from `.claude/commands`.
3. [x] Update `.issues/index.md`.
4. [x] Record session summary and finalize issue status.

## Risks & Considerations

- Keep content in sync with `.claude` commands.

## Alternatives Considered

- Reference `.claude/commands` directly (rejected to avoid cross-tool coupling).
