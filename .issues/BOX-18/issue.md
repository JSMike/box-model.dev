# BOX-18: AI Workflow Orchestration Enhancements

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | ready                               |
| Owner        | TBD                                 |
| Created      | 2026-01-24                          |
| Source       | workflow-improvement                |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   | BOX-16                              |
| Priority     | high                                |

## Summary
Evolve the issue tracking system from a Claude Code-specific tool into a comprehensive AI workflow orchestration framework that supports multiple models, multiple providers, human and AI reviewers, task decomposition, and cross-agent handoffs.

## Context
The current `.issues/` system solves the basic audit trail problem but is designed around a single-agent, single-provider model. Real-world AI-assisted development involves:
- **Multiple models** - Using Opus for architecture, Sonnet for implementation, Haiku for simple tasks
- **Multiple providers** - Claude, Codex, Gemini, each with different capabilities and rate limits
- **Multiple agents** - Concurrent work, handoffs between sessions, different specializations
- **Multiple reviewers** - Human developers, AI code reviewers, security scanners
- **Complex tasks** - Epics that decompose into subtasks, dependencies between issues

This issue tracks enhancements to support these workflows while maintaining the core audit trail purpose.

## Gap Categories

### Category 1: Session & History Improvements
Current gaps in tracking and resuming work across sessions.

- [ ] **1.1** `/issue work` should display most recent session summary for context
- [ ] **1.2** Add `/issue history <id>` to view all session summaries
- [ ] **1.3** `/issue done` should aggregate content from session summaries
- [ ] **1.4** Session summaries should track acceptance criteria progress
- [ ] **1.5** Index should show session count per issue

### Category 2: Multi-Model Orchestration
Support for choosing and tracking different AI models.

- [ ] **2.1** Add `Model` metadata field (recommended model tier for the task)
- [ ] **2.2** Add `Complexity` metadata field (high/medium/low) to guide model selection
- [ ] **2.3** Session summaries should record which model was used
- [ ] **2.4** Plan.md should include model recommendation with rationale
- [ ] **2.5** Document model tier guidelines (when to use high-reasoning vs fast/cheap)

**Model tiers to consider:**
| Tier | Anthropic | OpenAI | Google |
|------|-----------|--------|--------|
| High reasoning | Opus | o1/o3 | Gemini Ultra |
| Standard | Sonnet | GPT-4o | Gemini Pro |
| Fast/cheap | Haiku | GPT-4o-mini | Gemini Flash |

### Category 3: Multi-Provider Support
Enable handoffs between different AI providers and tools.

- [ ] **3.1** Add `Provider` metadata field to track which tool/provider is working
- [ ] **3.2** Create provider-agnostic issue format documentation
- [ ] **3.3** Add "Execution Instructions" section to plan.md with provider-specific guidance
- [ ] **3.4** Define handoff protocol for switching providers mid-issue
- [ ] **3.5** Document tool availability matrix (which providers have which capabilities)

**Execution instruction example:**
```markdown
## Execution

### Claude Code
Run `/issue work BOX-18` to start.

### Cursor
Open BOX-18/issue.md and use Composer with plan.md context.

### Codex CLI
Reference plan.md implementation steps.

### Manual (no AI)
Follow Implementation Steps in plan.md directly.
```

### Category 4: Agent Identity & Collaboration
Track which agents work on issues and coordinate between them.

- [ ] **4.1** Record agent identity in sessions (model, provider, version)
- [ ] **4.2** Add claim/lock mechanism to prevent concurrent conflicts
- [ ] **4.3** Define agent capability matching (which agents for which tasks)
- [ ] **4.4** Session handoff protocol with context summary
- [ ] **4.5** Track usage/cost metrics per session (tokens, API calls)

**Session metadata expansion:**
```markdown
# Session N

**Date:** 2026-01-24
**Model:** claude-opus-4-5-20251101
**Provider:** Anthropic (Claude Code)
**Tokens:** ~45,000 (estimated)
```

### Category 5: Review & Audit Workflow
Support structured reviews from humans and AI agents.

- [ ] **5.1** Add `Review-type` metadata (human/ai/both)
- [ ] **5.2** Define review request protocol (`/issue review <id>`)
- [ ] **5.3** Structured review feedback format (approval, comments, required changes)
- [ ] **5.4** AI reviewer integration (security, accessibility, code quality)
- [ ] **5.5** Escalation paths when AI reviewer uncertain
- [ ] **5.6** Review audit trail (who approved, when, with what comments)

**Review feedback format:**
```markdown
# Review: BOX-18

**Reviewer:** @developer / ai-security-reviewer
**Date:** 2026-01-24
**Verdict:** Approved / Changes Required / Rejected

## Feedback
- [ ] Required: Fix SQL injection in auth.ts:45
- [ ] Suggested: Consider adding rate limiting

## Files Reviewed
- `src/auth.ts` - security concerns noted
- `src/api.ts` - LGTM
```

### Category 6: Task Decomposition & Hierarchy
Support breaking large issues into subtasks.

- [ ] **6.1** Add `Parent` metadata field for subtask relationship
- [ ] **6.2** Add `Subtasks` metadata field listing child issues
- [ ] **6.3** Parent status aggregates from subtask statuses
- [ ] **6.4** `/issue breakdown <id>` to decompose into subtasks
- [ ] **6.5** Subtask templates based on common patterns
- [ ] **6.6** Dependency graph visualization in index

**Hierarchy example:**
```
BOX-18 (Epic: AI Workflow Orchestration)
├── BOX-19 (Subtask: Session improvements)
├── BOX-20 (Subtask: Multi-model support)
├── BOX-21 (Subtask: Review workflow)
└── BOX-22 (Subtask: Task decomposition)
```

### Category 7: Quality & Verification
Ensure work meets quality standards.

- [ ] **7.1** Add verification commands to issue.md (test commands, checks)
- [ ] **7.2** Definition of Done checklist template
- [ ] **7.3** Regression tracking (related areas to retest)
- [ ] **7.4** Integration with CI/CD status
- [ ] **7.5** Performance benchmark tracking

### Category 8: Metadata & Validation
Improve robustness of issue data.

- [ ] **8.1** Validate metadata format in index generation
- [ ] **8.2** Validate Blocks/Blocked-by references exist
- [ ] **8.3** Issue type templates (bug, feature, refactor, docs)
- [ ] **8.4** Change tracking for metadata updates
- [ ] **8.5** Branching strategy documentation/automation

### Category 9: Knowledge & Learning
Build institutional knowledge over time.

- [ ] **9.1** Pattern library linking similar past issues
- [ ] **9.2** Decision log aggregation across issues
- [ ] **9.3** Agent feedback loop (what worked, what didn't)
- [ ] **9.4** Searchable issue archive after deletion

### Category 10: Quick Idea Capture
Support lightweight issue creation for documenting ideas without full planning.

- [ ] **10.1** `/issue idea <title>` - Create minimal issue for future planning
- [ ] **10.2** Idea template with just title, one-liner summary, optional context
- [ ] **10.3** Status `idea` before `backlog` (not ready for planning yet)
- [ ] **10.4** Bulk idea review workflow to promote or discard
- [ ] **10.5** Ideas section in index (separate from actionable issues)

**Idea template:**
```markdown
# BOX-N: <title>

| Field   | Value    |
|---------|----------|
| Status  | idea     |
| Created | <date>   |

## Idea
<one-liner description>

## Notes (optional)
<any context, links, rough thoughts>
```

This supports the workflow where you need to quickly capture a thought without losing momentum on current work, then return later to flesh it out into a full issue.

## Potential Subtask Breakdown

This epic may spawn focused subtasks:

| Potential Issue | Focus Area | Priority |
|-----------------|------------|----------|
| BOX-19 | Session history & aggregation (1.1-1.5) | high |
| BOX-20 | Multi-model metadata & recommendations (2.1-2.5) | high |
| BOX-21 | Review workflow & AI reviewers (5.1-5.6) | medium |
| BOX-22 | Task decomposition & subtasks (6.1-6.6) | medium |
| BOX-23 | Provider-agnostic execution (3.1-3.5) | medium |
| BOX-24 | Agent identity & collaboration (4.1-4.5) | low |
| BOX-25 | Quality verification integration (7.1-7.5) | low |
| BOX-26 | Quick idea capture workflow (10.1-10.5) | high |

### Category 11: Alternative Storage Backend (Future Investigation)

The current markdown-based storage may cause repository bloat as issues accumulate. Consider alternative architectures:

- [ ] **11.1** SQLite database for issue storage instead of markdown files
- [ ] **11.2** MCP server for database interaction (query, create, update issues)
- [ ] **11.3** Simple web UI for viewing/managing issues outside of IDE
- [ ] **11.4** CLI tool for issue management independent of AI tools
- [ ] **11.5** Sync mechanism between database and markdown (if needed for portability)
- [ ] **11.6** Migration path from current markdown structure

**Potential architecture:**
```
┌─────────────────┐     ┌─────────────────┐
│  Claude Code    │     │  Web UI         │
│  /issue cmd     │     │  (view/manage)  │
└────────┬────────┘     └────────┬────────┘
         │                       │
         ▼                       ▼
┌─────────────────────────────────────────┐
│           MCP Server                    │
│  (issue-tracker-mcp)                    │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│           SQLite Database               │
│  issues.db                              │
│  - issues table                         │
│  - sessions table                       │
│  - plans table                          │
│  - attachments table                    │
└─────────────────────────────────────────┘
```

**Benefits:**
- Reduced repository bloat (no markdown files in git)
- Better querying (SQL vs file scanning)
- Richer UI possibilities
- Scales better with many issues
- Could support multiple repositories

**Trade-offs:**
- Loses git history for issue changes
- Less portable (requires database setup)
- More infrastructure to maintain
- Markdown is more universally readable

**Hybrid approach:** Push/pull model for issues

```
┌─────────────────────────────────────────────────────────────┐
│                    issues.db (SQLite + ORM)                 │
│  - All issues (history, closed, archived)                   │
│  - Full text search                                         │
│  - Web UI / dashboard views                                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
         ┌─────────────┴─────────────┐
         │                           │
    /issue pull BOX-18          /issue push BOX-18
    (checkout to .md)           (commit back to db)
         │                           │
         ▼                           │
┌─────────────────────────────────────────────────────────────┐
│                 .issues/BOX-18/ (local)                     │
│  - issue.md, plan.md, summary-N.md                          │
│  - Editable, git-trackable while working                    │
│  - Visible in IDE                                           │
└─────────────────────────────────────────────────────────────┘
```

**Commands:**
- `/issue pull <id>` - Checkout issue from database to .issues/BOX-N/
- `/issue push <id>` - Commit changes back to database, optionally clean up local
- `/issue sync` - Sync all local changes to database
- `/issue browse` - Open web UI to view all issues (past and present)

**Benefits of this model:**
- Active work visible as .md files (IDE integration, git during work)
- Completed issues archived to database (no repo bloat)
- Full history preserved and queryable
- Web UI for browsing without IDE
- ORM enables migrations, relationships, rich queries

**Local .issues/ contains only:**
- Currently checked-out (active) issues
- README.md and index.md (generated from db)

**Database contains:**
- All issues ever created
- Full session history
- Searchable archive
- Metadata for dashboards

## Open Questions

1. **Provider trigger mechanism** - How to invoke different providers with consistent issue tracking?
   - Shared issue format, provider-specific execution instructions?
   - Webhook/MCP integration for external tools?

2. **Concurrent agent coordination** - How to prevent conflicts when multiple agents work simultaneously?
   - File-level locks?
   - Issue-level claims with TTL?
   - Optimistic concurrency with conflict resolution?

3. **Cost/usage tracking granularity** - How detailed should token/cost tracking be?
   - Per-session estimates?
   - Integration with provider billing APIs?

4. **AI reviewer trust levels** - When can AI reviewer approve without human?
   - Based on change scope?
   - Based on file sensitivity?
   - Always require human for production?

## References
- Related files: `.claude/commands/issue.md`, `.issues/README.md`, `AGENTS.md`
- Related issues: BOX-16 (parent system), BOX-17 (external sync)
- Future considerations: MCP integration for cross-tool orchestration
