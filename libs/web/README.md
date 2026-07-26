# `@box-model/web`

Accessible, framework-agnostic web components for the
[Box Model design system](https://box-model.dev), built with Lit.

## Installation

```bash
npm install @box-model/web
```

Register every component:

```ts
import '@box-model/web';
```

Or import only the components an application uses:

```ts
import '@box-model/web/button.js';
import '@box-model/web/card.js';
```

```html
<button-box variant="primary">Continue</button-box>

<card-box>
  <span slot="header">Account</span>
  <p>Card content</p>
</card-box>
```

Both extensionless (`@box-model/web/button`) and explicit `.js` component subpaths are exported.

## Custom Elements Manifest

The package publishes a standards-based `custom-elements.json` and declares it through
`package.json#customElements`. Tools that support the Custom Elements Manifest specification can
discover component tags, properties, attributes, events, slots, CSS parts, CSS custom properties,
documentation, and referenced TypeScript types automatically.

The manifest is also available through the explicit `@box-model/web/custom-elements.json` export.

## Agent Skill

The package ships a version-matched Agent Skill that teaches coding agents how to inspect the
manifest, compose every component using Storybook-derived examples, and apply the published style
utilities and Sass mixins.

Projects using [TanStack Intent](https://tanstack.com/intent) can discover and load the installed
skill:

```bash
npx @tanstack/intent@latest list
npx @tanstack/intent@latest install
npx @tanstack/intent@latest load @box-model/web#box-model-web
```

The underlying skill is installed at
`node_modules/@box-model/web/skills/box-model-web/SKILL.md`. Its bundled manifest helper can query
the package API without loading the complete JSON file into an agent's context.

Maintainers can validate the source skill and package metadata with:

```bash
npx nx run web:validate-skill
npx nx run web:validate-skill-package
```

The second command rebuilds the library and validates the package-shaped output, including the
skill's final directory structure. The package carries the `tanstack-intent` npm keyword, so the
public Intent registry discovers the skill automatically after publication.

## Styles

Load the theme and foundation stylesheet once in the consuming application:

```scss
@use '@box-model/web/styles/box-model';
```

This initializes the page-level design tokens, light/dark color scheme, typography, and accessible
default surfaces used by the components. The default theme follows `prefers-color-scheme`; apply
`.box-model-theme-light` or `.box-model-theme-dark` to a subtree to force a scheme.

Components use square edges and expose component-specific CSS custom properties documented in the
manifest.

## License

Licensed under the MIT License. The published package includes a copy of the license.
