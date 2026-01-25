# BOX-44: Update web library to bundle CDN targets

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

Create a CDN distribution for `@box-model/web` where the npm package re-exports from a self-hosted CDN URL. Users can `import` as if it's a local library, but assets are fetched remotely.

## Context

Instead of bundling component code into the npm package, the package will re-export from a hosted CDN URL. This allows:
- Smaller npm package size
- Shared caching across consumers
- Simpler version management

Usage remains familiar:
```typescript
import { Button } from '@box-model/web';
```

But internally the package does:
```typescript
export * from 'https://cdn.box-model.dev/web/v1/index.js';
```

## Acceptance Criteria

- [ ] Self-hosted CDN infrastructure set up (S3 + CloudFront)
- [ ] ESM bundles deployed to CDN
- [ ] npm package with conditional exports (node → local, browser → CDN)
- [ ] TypeScript types bundled with npm package (full IDE integration)
- [ ] Documentation for aliasing to `/dist/` in unit tests / SSR environments
- [ ] Fallback strategy if CDN is unavailable (optional)

## Testing / SSR Alias

Unit tests using jsdom resolve to `browser` target even though they run in Node. Document how to alias imports to local `/dist/` files:

**Vitest example:**
```typescript
// vitest.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '@box-model/web': '@box-model/web/dist/index.js'
    }
  }
});
```

**Jest example:**
```javascript
// jest.config.js
module.exports = {
  moduleNameMapper: {
    '^@box-model/web$': '@box-model/web/dist/index.js'
  }
};
```

## Architecture

```
npm package (@box-model/web)
├── dist/
│   └── index.js    → local component code (for Node/SSR)
├── index.d.ts      → full TypeScript definitions
└── package.json    → conditional exports (node → local, browser → CDN)

CDN (cdn.box-model.dev)
└── web/v1/
    ├── index.js    → component code for browser
    └── chunks/     → code-split assets
```

**package.json exports:**
```json
{
  "exports": {
    ".": {
      "types": "./index.d.ts",
      "node": "./dist/index.js",
      "browser": "https://cdn.box-model.dev/web/v1/index.js",
      "default": "./dist/index.js"
    }
  }
}
```

Users get:
- Full IDE autocomplete, type checking, and documentation
- Node/SSR: local assets from npm package
- Browser: runtime assets loaded from CDN (shared caching)

## Decisions

- **CDN hosting** - S3 + CloudFront (domain already registered with AWS)
- **Versioning** - Major version in URL (e.g., `/web/v1/`, `/web/v2/`). Minor/patch updates deploy to same URL.

## References

- Related: BOX-43 (GitHub workflows - would deploy to CDN)
