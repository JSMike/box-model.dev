# Plan: BOX-16 - Issue tracking & task orchestration structure

<!-- Plan Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Created      | 2026-01-24                          |
| Author       | Agent                               |
| Approach     | Approved                            |

## Approach
Create a folder-based issue tracking system with:
- Flat `.issues/` folder with one subfolder per issue (BOX-N)
- Status tracked in metadata table (not folder location)
- Three document types: `issue.md` (requirements), `plan.md` (approach), `summary.md` (completion)
- Dependencies via `Blocks`/`Blocked-by` fields
- Auto-generated index via `/issue index`
- Portable `/issue` slash command
- **Complete audit trail** - detailed documentation of what was requested, planned, and done
- **Plan mode integration** - `/issue create` enters plan mode with plan file in issue folder

## Files to Modify
- `.claude/commands/issue.md` - Slash command for issue management
- `.issues/README.md` - System documentation
- `.issues/index.md` - Auto-generated overview
- `.issues/BOX-1/` through `.issues/BOX-15/` - Migrated issues
- `AGENTS.md` - Update to reference new system with workflow guidance
- `CLAUDE.md` - Update to reference new system

## Implementation Steps

### Phase 1: Core Issue Tracking
1. [x] Create `.claude/commands/issue.md` slash command
2. [x] Run `/issue init` to create `.issues/` structure
3. [x] Create BOX-16 (this issue)
4. [x] Migrate existing issues from open-issues.md (BOX-1 through BOX-15)
5. [x] Update AGENTS.md - replace open-issues.md references
6. [x] Update CLAUDE.md - add .issues/ reference
7. [x] Delete open-issues.md
8. [x] Run `/issue index` to generate final index.md

### Phase 2: Workflow Integration & Audit Trail
1. [x] Add `/issue match <description>` action to find related issues
2. [x] Add `/issue work <id>` action to start working on an issue
3. [x] Update `/issue create` to enter plan mode with `.issues/BOX-N/plan.md`
4. [x] Update `/issue done` to create comprehensive summary.md
5. [x] Update AGENTS.md with "check existing issues first" guidance
6. [x] Update AGENTS.md with audit trail expectations
7. [x] Update this plan with Phase 2 content
8. [x] Create BOX-17 (backlog) for external issue sync via MCP
9. [x] Commit all changes

### Phase 3: Session Summaries
1. [x] Add `/issue session <id>` action with numbered summary format
2. [x] Update `.issues/README.md` with session summary convention
3. [x] Update `AGENTS.md` with session guidance
4. [x] Update `.issues/BOX-16/issue.md` with Phase 3 acceptance criteria
5. [x] Update this plan with Phase 3 content
6. [x] Create `.issues/BOX-16/summary-1.md` - first session summary (Phase 1+2 work)
7. [x] Commit Phase 3 changes
8. [x] Create `.issues/BOX-16/summary-2.md` - this session's summary

## Risks & Considerations
- Migration of existing issues requires careful parsing of open-issues.md format
- Need to preserve all context from existing issues
- Agents must be trained to check existing issues before creating new ones
- Summary.md must be comprehensive enough for non-technical stakeholders

## Alternatives Considered
- Swim lane folders (ready/, in-progress/, done/) - rejected in favor of status field to avoid moving folders
- External scripts for index generation - rejected in favor of slash command for portability
- `.claude/plans/` for issue plans - rejected in favor of keeping all issue artifacts together in `.issues/BOX-N/`
