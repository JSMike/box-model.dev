# BOX-16: Issue tracking & task orchestration structure

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | in-progress                         |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | workflow-improvement                |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | high                                |

## Summary
Design and implement a folder-based issue tracking system within the repository that supports multiple agents/models working across sessions, with clear requirements and completion tracking for agent handoffs.

## Context
The existing `open-issues.md` file was a useful but crude attempt at issue tracking. To improve coordination between different agents, models, and developers, a more structured approach is needed with:
- Individual folders per issue
- Status tracking via metadata
- Dependency management
- Auto-generated index
- Portable slash command for bootstrapping in any repository

## Acceptance Criteria

### Phase 1: Core Issue Tracking
- [x] Create `/issue` slash command with init, create, list, show, status, plan, done, delete, index actions
- [x] Initialize `.issues/` folder structure with README and index
- [x] Migrate existing issues from open-issues.md (BOX-1 through BOX-15)
- [x] Update AGENTS.md to reference new system
- [x] Update CLAUDE.md to reference new system
- [x] Delete open-issues.md after migration
- [x] Generate final index.md with all issues

### Phase 2: Workflow Integration & Audit Trail
- [x] Add `/issue match <description>` action to find related issues before starting new work
- [x] Add `/issue work <id>` action to start working on an existing issue
- [x] Update `/issue create` to enter plan mode with plan file at `.issues/BOX-N/plan.md`
- [x] Update `/issue done` to create comprehensive summary.md with detailed audit information
- [x] Update AGENTS.md with "check existing issues first" guidance
- [x] Update AGENTS.md with audit trail expectations
- [x] Create BOX-17 (backlog) for future external issue sync via MCP

### Phase 3: Session Summaries
- [x] Add `/issue session <id>` action with numbered summary format
- [x] Update `.issues/README.md` with session summary convention
- [x] Update `AGENTS.md` with session guidance
- [x] Create `summary-1.md` for Phase 1+2 work
- [x] Create `summary-2.md` for Phase 3 work

## References
- Related files: `.claude/commands/issue.md`, `.issues/README.md`
- Plan: See `plan.md` in this folder
