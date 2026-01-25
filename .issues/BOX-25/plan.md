# Plan: BOX-25 - Clarify Codex workflow quickstart

<!-- Plan Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Created      | 2026-01-24                          |
| Author       | Agent                               |
| Approach     | Update Codex-specific guidance      |

## Approach

Add two bullets to the Codex-specific section in `AGENTS.md`: a concise manual quickstart sequence and a sync reminder for `.codex/commands` vs `.claude/commands`.

## Files to Modify

- `AGENTS.md` - add quickstart snippet and sync note
- `.issues/index.md` - add BOX-25 entry

## Implementation Steps

1. [x] Update `AGENTS.md` with the quickstart snippet.
2. [x] Add a sync reminder for `.codex/commands/*`.
3. [x] Update `.issues/index.md`.
4. [x] Record session summary and finalize issue status.

## Risks & Considerations

- Keep the quickstart short and explicit.

## Alternatives Considered

- Add a new doc under `.codex/` (rejected; prefer central guidance in `AGENTS.md`).
