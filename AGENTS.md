# AGENTS.md

Guidance for OpenAI Codex and other agents reading this file.

## Required Reading

**Read these files before starting work:**
- `AI-WORKFLOW.md` - Workflow and issue tracking (mandatory)
- `AI-README.md` - Project conventions and Nx guidelines

## Codex CLI Specific

- Command docs live in `.codex/commands/` (`issue.md`, `workflow.md`).
- If your Codex environment supports `/issue` or `/workflow` commands, use them; otherwise update `.issues/` files manually per `AI-WORKFLOW.md`.
- When working manually, remember to update `.issues/index.md` and write session summaries after any work.
- Manual quickstart (file sequence): `.issues/BOX-N/issue.md` → `.issues/BOX-N/plan.md` → `.issues/BOX-N/summary-1.md` (after work) → `.issues/BOX-N/summary.md` (when done) → update `.issues/index.md`.
- Keep `.codex/commands/*` synced with `.claude/commands/*` when command docs change.
