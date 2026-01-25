# BOX-17: External issue sync via MCP

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | backlog                             |
| Owner        | TBD                                 |
| Created      | 2026-01-24                          |
| Source       | workflow-improvement                |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   | BOX-16                              |
| Priority     | medium                              |

## Summary
Enable bidirectional sync between `.issues/` and external issue tracking systems (Jira, GitHub Issues) using MCP servers.

## Context
The `.issues/` folder provides a complete audit trail within the repository, but many teams also use external issue tracking systems like Jira or GitHub Issues for project management, sprint planning, and cross-team visibility. This issue addresses the need to keep both systems in sync.

## Potential Features
- `/issue sync` - Pull issues from external system, push local changes
- `/issue link BOX-N <external-id>` - Link local issue to external ticket
- MCP server for Jira integration
- MCP server for GitHub Issues integration
- Conflict resolution when both sides have changes
- Map External field in issue.md to actual ticket references

## Why MCP
MCP servers can authenticate with external systems and perform API calls that Claude Code cannot do directly. This allows seamless integration without exposing credentials.

## Acceptance Criteria
- [ ] Define sync protocol (which fields map between systems)
- [ ] Create MCP server for at least one external system (Jira or GitHub)
- [ ] Implement `/issue sync` command
- [ ] Implement `/issue link` command
- [ ] Handle conflict resolution
- [ ] Document setup and configuration

## References
- Related files: `.claude/commands/issue.md`
- Related issues: BOX-16 (issue tracking system)
