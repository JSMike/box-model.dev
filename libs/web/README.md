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

See the [changelog](./CHANGELOG.md) for the complete component inventory and release history.

### Tooltip support in older browsers

`tooltip-box` uses CSS Anchor Positioning. Applications that support browsers without native anchor
positioning can install the
[OddBird CSS Anchor Positioning polyfill](https://github.com/oddbird/css-anchor-positioning):

```bash
npm install @oddbird/css-anchor-positioning
```

Box Model UI uses Lit constructed stylesheets. Initialize the polyfill's constructed-stylesheet
integration before importing any Box Model components:

```ts
if (!('anchorName' in document.documentElement.style)) {
  const { patchAndPolyfillConstructedStylesheets } = await import('@oddbird/css-anchor-positioning/fn');

  patchAndPolyfillConstructedStylesheets();
}

await import('@box-model/web');
```

The polyfill is an application-level compatibility choice and is not bundled with
`@box-model/web`.

## Framework JSX typings

React, Preact, and Solid applications can opt into framework-specific JSX declarations through
`compilerOptions.types`. Append the matching entry to the application's existing type list:

```json
{
  "compilerOptions": {
    "types": ["@box-model/web/react"]
  }
}
```

Use `@box-model/web/preact` for Preact or `@box-model/web/solid` for Solid. These declarations add
the Box Model tags, typed attributes, and component events to the framework's JSX namespace. Event
types apply both to the emitting component and to ancestor elements that listen for a bubbling
event. React and Preact preserve the dispatched custom-event name (`onclose` for `close`); Solid
uses its direct-listener form (`on:close`). The declarations do not register components at
runtime; continue to import the package or individual component entrypoints in application code.

React attaches exact-name custom-event props to custom elements, so declarative React ancestor
listeners must also be placed on a custom element. To listen from a native React ancestor, use a
ref and `addEventListener`. Preact and Solid can attach their documented custom-event forms to
native ancestors.

See the **Framework typings** page in Storybook for complete framework-specific examples.

## Testing with jsdom

jsdom does not implement every browser API used by custom elements. Tests that render Box Model
components may need setup for constructed stylesheets, `adoptedStyleSheets`, resize and
intersection observers, Web Animations, and native dialog methods.

The Storybook **Test setup** page provides complete Vitest and Jest examples based on
`@lit-labs/ssr-dom-shim`, including a narrow native-dialog prototype stub. These shims support
deterministic component unit tests; use browser tests for layout, observer thresholds, animation
timing, focus management, backdrop behavior, and tooltip placement.

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
