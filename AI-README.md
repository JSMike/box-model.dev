# AI Project Guide

This document provides project-specific guidance for AI agents working in the `box-model.ui` repository.

## Project Overview

Nx monorepo containing multiple UI component libraries and applications supporting both web (Lit/Web Components) and cross-platform (React Strict DOM) development.

## Required Reading

### AI-WORKFLOW.md (Always Required)

**You MUST read `AI-WORKFLOW.md` before starting any work.** This defines the mandatory issue tracking workflow:

- Every task must be tracked in `.issues/`
- Check for existing issues before creating new ones
- Record session summaries after any work
- Use `/issue` commands if available, or update files manually

This workflow is required at all times, regardless of what app or library you're working on.

### App/Library-Specific Documentation

**Before planning or writing code for any app or library, you MUST read its AI-README.md file.** Each contains critical conventions, patterns, and configuration details specific to that project.

### Libraries

| Library | AI-README.md | Purpose |
|---------|--------------|---------|
| `libs/web/` | `libs/web/AI-README.md` | Lit Web Components |
| `libs/rsd/` | `libs/rsd/AI-README.md` | React Strict DOM components |
| `libs/rsd-app/` | `libs/rsd-app/AI-README.md` | Shared RSD app screens |
| `libs/tokens/` | `libs/tokens/AI-README.md` | Design tokens (Style Dictionary) |
| `libs/storybook-utils/` | `libs/storybook-utils/AI-README.md` | Shared Storybook helpers |

### Applications

| Application | AI-README.md | Purpose |
|-------------|--------------|---------|
| `apps/box-model-web-vite/` | `apps/box-model-web-vite/AI-README.md` | Vite demo app (web components) |
| `apps/box-model-rsd-nextjs/` | `apps/box-model-rsd-nextjs/AI-README.md` | Next.js web app (RSD) |
| `apps/box-model-rsd-expo/` | `apps/box-model-rsd-expo/AI-README.md` | Expo mobile app (RSD) |

## Global Conventions

These apply across all projects:

### Styling

- **No `border-radius`** - All edges must be square (always `0`)
- **No inline styles in stories** - All styling via component stylesheets

### Path Aliases

```typescript
import { Button } from '@box-model/web';
import { Button } from '@box-model/rsd';
import { HomeScreen } from '@box-model/rsd-app';
import { buttonTokens } from '@box-model/tokens';
```

### Git Conventions

- Do not stage/unstage files automatically unless asked
- Commit format: `feat(rsd/button): add success variant`
- Run format, lint, test before PRs

### Nx Guidelines

- Always use `npx nx` (nx may not be installed globally)
- Prefer `npx nx run` and `npx nx run-many` over direct tooling
- Use `nx_workspace` tool for workspace architecture questions
- Use `nx_project_details` for specific project structure

## Common Commands

```bash
# Build
npx nx build <project>
npx nx run-many -t build

# Test
npx nx test <project>
npx nx run-many -t test

# Lint
npx nx lint <project>
npx nx run-many -t lint

# Format
npx nx format:write

# Storybook
npx nx storybook <project> -o

# Apps
npx nx start box-model-rsd-nextjs   # Next.js dev
npx nx start box-model-rsd-expo     # Expo dev
npx nx serve box-model-web-vite     # Vite dev
```
