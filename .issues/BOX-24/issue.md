# BOX-24: Make AI workflow docs tool-agnostic

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

Make AI workflow and issue tracking docs tool-agnostic by moving Claude-specific details into `CLAUDE.md`, Codex-specific details into `AGENTS.md`, and Copilot-specific details into `.github/copilot-instructions.md`.

## Context

The goal is to support handoffs between AI tools while keeping the shared workflow neutral and pushing provider-specific instructions into the relevant entrypoints.

## Acceptance Criteria

- [x] `AI-WORKFLOW.md` and `.issues/README.md` are updated to be tool-agnostic (no Claude/Copilot/Codex specifics).
- [x] `CLAUDE.md` contains Claude Code-specific workflow instructions.
- [x] `AGENTS.md` contains Codex-specific workflow instructions and references `.codex/commands`.
- [x] `.github/copilot-instructions.md` contains Copilot-specific workflow guidance.

## References

- Related files: `AI-WORKFLOW.md`, `.issues/README.md`, `CLAUDE.md`, `AGENTS.md`, `.github/copilot-instructions.md`
