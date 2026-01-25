# Summary: BOX-24 - Make AI workflow docs tool-agnostic

## Completed
2026-01-24 by Agent

## What Was Done
Refactored shared workflow documentation to describe the `.issues/` process in tool-agnostic terms, and moved provider-specific guidance into the appropriate entrypoints for Claude, Codex, and Copilot. This keeps the workflow consistent across tools while preserving tool-specific instructions where needed.

## Files Changed
- `AI-WORKFLOW.md` - removed provider-specific references and clarified optional command usage and tool entrypoints.
- `.issues/README.md` - clarified optional commands, added `idea` status, and noted index upkeep.
- `CLAUDE.md` - added Claude Code-specific workflow instructions and command doc location.
- `AGENTS.md` - added Codex-specific workflow guidance and `.codex/commands` references.
- `.github/copilot-instructions.md` - added Copilot-specific guidance for manual `.issues/` updates.
- `.issues/BOX-24/issue.md` - marked issue done and checked acceptance criteria.
- `.issues/BOX-24/plan.md` - marked implementation steps complete.
- `.issues/index.md` - added BOX-24 completion entry.
- `.issues/BOX-24/summary-1.md` - session 1 record.
- `.issues/BOX-24/summary-2.md` - session 2 record.

## Key Decisions Made
- Keep shared workflow docs tool-agnostic and move provider-specific instructions into their respective entrypoints.

## Deviations from Plan
- None.

## Acceptance Criteria Results
- [x] `AI-WORKFLOW.md` and `.issues/README.md` are updated to be tool-agnostic (no Claude/Copilot/Codex specifics).
- [x] `CLAUDE.md` contains Claude Code-specific workflow instructions.
- [x] `AGENTS.md` contains Codex-specific workflow instructions and references `.codex/commands`.
- [x] `.github/copilot-instructions.md` contains Copilot-specific workflow guidance.

## Artifacts
- Branch: -
- PR: -
- Commits: -

## Notes
- None.
