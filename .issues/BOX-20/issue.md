# BOX-20: Rename @box-model/ui to @box-model/web

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | done                                |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | claude.ai planning session          |
| External     |                                     |
| Blocks       | BOX-22                              |
| Blocked-by   |                                     |
| Priority     | high                                |

## Summary

Rename `@box-model/ui` to `@box-model/web` to establish clear, standards-based package naming that parallels the future `@box-model/rsd` (React Strict DOM) package.

## Context

### Background

The project owner is a design system professional between jobs who declined to sign an IP agreement due to existing open source work. **Primary goal:** Establish timestamped evidence of IP provenance through public commits with meaningful messages.

### Original Proposal (from claude.ai)

A claude.ai planning session proposed:
- Rename to `@box-model/web`
- Create `ai-workflow/` directory
- Restructure `apps/` with separate storybook app

### Reconciled Decisions

After reviewing the actual codebase:

| Original Proposal | Decision | Rationale |
|-------------------|----------|-----------|
| `@box-model/web` | **`@box-model/web`** | RSD also targets web. "web" references W3C standard. |
| `ai-workflow/` directory | **Don't create** | `.issues/` system already exists and is more sophisticated |
| `apps/storybook/` | **Keep current** | Storybook integrated in lib is better pattern |

### Package Naming Strategy

| Package | Name | Rationale |
|---------|------|-----------|
| Design tokens | `@box-model/tokens` | Platform-agnostic, feeds all component libraries |
| Lit web components | **`@box-model/web`** | References W3C Custom Elements standard |
| React Strict DOM | `@box-model/rsd` | Accurate acronym for React Strict DOM |

`web` is explicit and standards-based. `rsd` is a recognized acronym in the React ecosystem.

## Scope

**157 references** to `@box-model/ui` across:
- 9 configuration files
- 27 story files (.stories.ts)
- 35 documentation files (.mdx)
- 7 demo app files
- 2 storybook-utils files

## Acceptance Criteria

- [ ] `libs/web/` renamed to `libs/web/`
- [ ] Package name changed to `@box-model/web`
- [ ] All imports updated from `@box-model/web/*` to `@box-model/web/*`
- [ ] Path aliases updated in tsconfig.base.json
- [ ] NX project configuration updated
- [ ] `npx nx build web` succeeds
- [ ] `npx nx test web` passes
- [ ] `npx nx storybook web` launches
- [ ] AI-README.md updated with new paths
- [ ] No references to `@box-model/ui` remain (except .issues/ history)

## References

- Related issues: BOX-21 (LICENSE file), BOX-22 (RSD scaffold)
- Plan: See plan.md for implementation phases
