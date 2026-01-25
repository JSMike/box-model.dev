# BOX-23: Add Codex slash command docs

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | done                                |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | user request                        |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | medium                              |

## Summary

Add `.codex/commands` equivalents for the existing `.claude/commands` slash command docs so Codex users have the same integrations.

## Context

The repository already includes slash command documentation under `.claude/commands`, but `.codex` is missing matching files. This causes Codex users to miss the same command guidance.

## Acceptance Criteria

- [x] `.codex/commands/issue.md` exists with content matching `.claude/commands/issue.md`
- [x] `.codex/commands/workflow.md` exists with content matching `.claude/commands/workflow.md`
- [x] `.codex/commands` directory is present and tracked

## References

- Related files: `.claude/commands/issue.md`, `.claude/commands/workflow.md`
