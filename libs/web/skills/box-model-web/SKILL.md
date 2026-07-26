---
name: box-model-web
description: Build, review, or troubleshoot accessible interfaces using the @box-model/web Lit custom-element library. Use when an agent needs exact component attributes, properties, events, slots, CSS custom properties, CSS parts, import paths, component composition examples, theme setup, compiled style helpers, or Sass mixins for Box Model web components.
metadata:
  type: core
  library: '@box-model/web'
  library_version: '0.0.1'
---

# Box Model Web

Use the installed package metadata as the API authority and the bundled references as composition
guidance.

## Resolve the package API

1. Query `custom-elements.json` before choosing attributes, bindings, events, slots, CSS custom
   properties, or CSS parts. Do not infer an API from a component name.
2. Run `node scripts/inspect-cem.mjs <tag-name>` from this skill directory. The script locates the
   manifest in either the published package or the Box Model monorepo.
3. Pass `--manifest <path>` when working with a nonstandard installation and `--json` when
   structured output is more useful.
4. Treat the queried manifest as authoritative if a bundled example or prose reference differs.

Examples:

```bash
node scripts/inspect-cem.mjs
node scripts/inspect-cem.mjs alert-box
node scripts/inspect-cem.mjs dialog-box --json
node scripts/inspect-cem.mjs --manifest ./node_modules/@box-model/web/custom-elements.json tag-box
```

## Compose components

1. Read only the relevant sections of [references/components.md](references/components.md).
2. Import the component entrypoint shown by the manifest helper. Import separately slotted
   components that are not registered by the primary entrypoint.
3. Preserve the Storybook-derived slot structure. Many Box Model components style a native
   control placed in their default slot; do not replace that native control with text.
4. Give native controls accessible names, associate labels with form controls, and retain heading
   hierarchy. Treat examples as a composition baseline, not permission to omit task-specific
   accessibility.
5. In Angular, React, or other frameworks, adapt binding and event syntax while preserving the
   custom-element attributes, property types, event names, and light-DOM slot composition.

## Configure JSX types

For TypeScript JSX projects, append the matching declaration entry to `compilerOptions.types`:

- React: `@box-model/web/react`
- Preact: `@box-model/web/preact`
- Solid: `@box-model/web/solid`

Preserve any existing `types` entries. The declaration provides JSX checking only, so still import
`@box-model/web` or the required component entrypoints to register the elements at runtime.

## Apply styles

1. Read [references/styles.md](references/styles.md) when configuring themes, utility classes,
   mixins, surface emphasis, or component customization.
2. Load `@box-model/web/styles/box-model` once for the full theme, reset, tokens, and compiled
   helpers.
3. Prefer semantic theme variables and documented component custom properties over targeting
   shadow-DOM implementation selectors.
4. Use documented CSS parts only when custom properties cannot express the required change.
5. Keep surfaces square. Use crisp offset shadows for bounded surfaces, elevation shadows for
   overlays, and glow shadows only for focus.

## Guardrails

- Do not invent two-way bindings or framework-specific wrappers.
- Do not assume every custom-element property is reflected as an attribute.
- Do not copy Sass fallback strings from the manifest into application CSS; query custom-property
  names and use the published theme or semantic variables.
- Do not style slotted native controls as though they live in the component shadow root.
- Do not suppress accessibility diagnostics to make an example pass.

## Maintainer sources

When refreshing this skill, compare it with `libs/web/src/custom-elements.json`,
`libs/web/src/*/*.stories.ts`, `libs/web/src/styles/`, `libs/web/generators/`, and
`libs/web/README.md` in the Box Model repository.
