# BOX-43: Add GitHub workflows for build/deploy/publish

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | backlog                             |
| Owner        | TBD                                 |
| Complexity   | low/medium                          |
| Created      | 2026-01-25                          |
| Source       | user-request                        |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | medium                              |

## Summary

Add GitHub Actions workflows for CI/CD including build validation, deployment, and package publishing.

## Context

The monorepo currently lacks automated CI/CD pipelines. GitHub workflows are needed to:
- Validate PRs (lint, test, build)
- Deploy apps to hosting platforms
- Publish packages to npm

## Proposed Workflows

### 1. CI - Pull Request Validation
**Trigger:** PR to main
- Lint all affected projects
- Run tests for affected projects
- Build affected projects
- Type checking

### 2. Build - Main Branch
**Trigger:** Push to main
- Full build of all projects
- Cache artifacts for deployment

### 3. Deploy - Apps
**Trigger:** Push to main (or manual)
- Deploy `box-model-rsd-nextjs` to Vercel/Netlify
- Deploy `box-model-web-vite` to static hosting
- Deploy Storybook to GitHub Pages (optional)

### 4. Publish - Packages
**Trigger:** Release tag or manual
- Publish `@box-model/web` to npm
- Publish `@box-model/rsd` to npm
- Publish `@box-model/tokens` to npm

## Acceptance Criteria

- [ ] `.github/workflows/ci.yml` - PR validation workflow
- [ ] `.github/workflows/build.yml` - Main branch build
- [ ] `.github/workflows/deploy.yml` - App deployment
- [ ] `.github/workflows/publish.yml` - Package publishing
- [ ] Nx caching configured for faster CI
- [ ] Branch protection rules documented

## Technical Considerations

- Use Nx affected commands to only build/test changed projects
- Configure proper caching (node_modules, Nx cache, build artifacts)
- Use GitHub secrets for npm tokens, deploy keys
- Consider using Nx Cloud for distributed caching (optional)

## Open Questions

1. **Hosting platform** - Vercel, Netlify, or GitHub Pages for web apps?
2. **npm org** - Is `@box-model` available on npm?
3. **Nx Cloud** - Worth setting up for distributed caching?
4. **Release strategy** - Semantic versioning? Changesets?

## References

- Nx CI setup: https://nx.dev/ci/intro/ci-with-nx
- GitHub Actions: https://docs.github.com/en/actions
