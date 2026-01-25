# BOX-25: Clarify Codex workflow quickstart

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
| Priority     | low                                 |

## Summary

Add a Codex manual quickstart and sync note to `AGENTS.md` to make the workflow clearer and reduce drift between `.claude/commands` and `.codex/commands`.

## Context

User requested two improvements after making workflow docs tool-agnostic: a concise manual workflow sequence for Codex users and a reminder to keep Codex command docs synced with Claude command docs.

## Acceptance Criteria

- [x] `AGENTS.md` includes a short Codex manual quickstart snippet with the exact file sequence for creating an issue.
- [x] `AGENTS.md` includes a note to keep `.codex/commands/*` synced with `.claude/commands/*`.

## References

- Related files: `AGENTS.md`, `.codex/commands/issue.md`, `.codex/commands/workflow.md`, `.claude/commands/issue.md`, `.claude/commands/workflow.md`
- Related issues: BOX-24
