# BOX-19: Blog post / change communication command

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | ready                               |
| Owner        | TBD                                 |
| Created      | 2026-01-24                          |
| Source       | workflow-improvement                |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | medium                              |

## Summary
Add an optional `/issue blog <id>` or `/issue post <id>` command that generates a communication-ready write-up explaining what was done, why it matters, and key details for sharing with stakeholders, team members, or the public.

## Context
The issue tracking system captures detailed audit information (issue.md, plan.md, session summaries, summary.md), but this is structured for developers and agents. There's often a need to communicate changes in a more narrative, accessible format:

- Team announcements ("Here's what changed and why")
- Stakeholder updates ("What we delivered")
- Blog posts ("How we solved X")
- Change logs ("What's new in this release")
- Knowledge sharing ("Lessons learned")

This bridges the gap between internal audit trail and external communication.

## Proposed Feature

### Command: `/issue blog <id>` or `/issue post <id>`

Generate a communication-ready write-up from an issue's documentation.

**Inputs:**
- Read `issue.md` for the problem/requirements
- Read `plan.md` for the approach
- Read `summary-N.md` files for the journey
- Read `summary.md` for the outcome

**Output options:**
- `--format blog` - Narrative blog post style
- `--format changelog` - Bullet-point changelog entry
- `--format announcement` - Team announcement
- `--format stakeholder` - Non-technical summary

**Output location:**
- `.issues/BOX-N/blog.md` or
- User-specified path

### Blog Post Template

```markdown
# [Title derived from issue]

## The Problem
[From issue.md Summary and Context - what needed to be solved]

## The Approach
[From plan.md - how we decided to solve it, alternatives considered]

## The Journey
[From session summaries - key milestones, challenges, decisions]

## The Outcome
[From summary.md - what was delivered, impact]

## Key Takeaways
[Synthesized lessons, patterns, insights]

## Technical Details
[Optional deep-dive for technical audiences]
```

## Acceptance Criteria
- [ ] Add `/issue blog <id>` command to slash command
- [ ] Generate narrative from issue documentation
- [ ] Support multiple output formats (blog, changelog, announcement)
- [ ] Save output to issue folder or specified path
- [ ] Include in workflow skill as optional step
- [ ] Document in AI-WORKFLOW.md

## Open Questions
1. Should this be a separate command or part of `/issue done`?
2. What formats are most useful? (blog, changelog, announcement, stakeholder)
3. Should it support custom templates?
4. Where should generated posts be saved?

## References
- Related issues: BOX-16 (issue tracking), BOX-18 (workflow enhancements)
- Use case: Communicating changes transparently to team and stakeholders
