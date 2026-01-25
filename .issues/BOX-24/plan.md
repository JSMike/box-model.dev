# Plan: BOX-24 - Make AI workflow docs tool-agnostic

<!-- Plan Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Created      | 2026-01-24                          |
| Author       | Agent                               |
| Approach     | Refactor docs by audience/tool      |

## Approach

Update shared workflow docs to describe the `.issues/` process in neutral terms, then add tool-specific instructions to the appropriate entrypoint files (Claude, Codex, Copilot). Keep references to command docs but avoid implying a single provider is required.

## Files to Modify

- `AI-WORKFLOW.md` - make workflow text provider-agnostic
- `.issues/README.md` - remove tool-specific command framing
- `CLAUDE.md` - add Claude-specific workflow instructions
- `AGENTS.md` - add Codex-specific workflow instructions
- `.github/copilot-instructions.md` - add Copilot-specific workflow instructions
- `.issues/index.md` - add BOX-24 entry

## Implementation Steps

1. [x] Update `AI-WORKFLOW.md` to be tool-agnostic.
2. [x] Update `.issues/README.md` to remove provider-specific phrasing.
3. [x] Add Claude Code specifics to `CLAUDE.md`.
4. [x] Add Codex specifics to `AGENTS.md`.
5. [x] Add Copilot specifics to `.github/copilot-instructions.md`.
6. [x] Update `.issues/index.md`.
7. [x] Record session summary and finalize issue status.

## Risks & Considerations

- Ensure commands are described as optional helpers, not requirements for non-Claude tools.

## Alternatives Considered

- Maintain separate workflow docs per tool (rejected to avoid drift).
