# BOX-53: Custom Elements Manifest generators refactor

<!-- Metadata -->
| Field        | Value        |
|--------------|--------------|
| Status       | review       |
| Owner        | Agent        |
| Complexity   | high         |
| Created      | 2026-07-12   |
| Source       | user-request |
| External     |              |
| Blocks       | BOX-15       |
| Blocked-by   |              |
| Priority     | medium       |

## Summary

Refactor `libs/web/generators` around a shared TypeScript AST + JSDoc + host SCSS metadata core, emit a Custom Elements Manifest to `libs/web/src/custom-elements.json`, keep framework typings on the same core, align CSS custom-prop prefixes to tag stems, and annotate all web components.

## Acceptance Criteria

- [ ] Shared metadata collects properties, bubbling events, slots, parts, and CSS custom properties
- [ ] CEM written to `libs/web/src/custom-elements.json` (gitignored) and copied to dist on build
- [ ] `libs/web/package.json` includes `"customElements": "custom-elements.json"`
- [ ] React/Preact/Solid typings and tag-name maps consume the shared core
- [ ] CSS prefixes match tag stem (`checkbox-group-box` → `--checkbox-group-*`); mismatched components renamed
- [ ] All components annotated with JSDoc (`@slot`, `@csspart`, `@fires`) and SCSS prop comments

## References

- `libs/web/generators/`
- `node_modules/custom-elements-manifest/schema.d.ts`
- Related: BOX-15 (Angular typings), BOX-1 (Storybook API docs)
