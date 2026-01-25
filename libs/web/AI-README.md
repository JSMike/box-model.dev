# libs/web - AI Guide

Lit-based Web Components library providing custom elements for the Box Model design system.

## Technology Stack

- **Lit**: Web Components with reactive properties
- **SCSS**: Host and slot stylesheets
- **Vitest**: Unit testing with jsdom

## Component Pattern

```typescript
// libs/web/src/<component>/<component>.ts
import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import hostStyles from './<component>.host.scss?inline';
import slotStyles from './<component>.slot.scss?inline';

export const ComponentBox = '<component>-box';

@customElement(ComponentBox)
export class Component extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  @property({ type: String })
  variant: 'primary' | 'secondary' = 'primary';

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: ComponentBox,
    });
  }

  override render() {
    return html`<slot></slot>`;
  }
}
```

## File Structure

Each component in `libs/web/src/<component>/`:

| File | Purpose |
|------|---------|
| `<component>.ts` | LitElement class with `@customElement` |
| `<component>.host.scss` | Host styling, CSS custom properties |
| `<component>.slot.scss` | Light DOM styling via adoptedStyleSheets |
| `<component>.stories.ts` | Storybook stories |
| `<component>.mdx` | Storybook documentation |
| `<component>.spec.ts` | Vitest unit tests |
| `index.ts` | Barrel export |

## Critical Conventions

### Styling

1. **No `::slotted()`** - Use `.slot.scss` with scoped selectors instead
2. **No `border-radius`** - All edges must be square (always `0`)
3. **No inline styles in stories** - All styling via component stylesheets
4. Use `slotStyleService.setSlotStyles()` for light DOM styling

### Host Styles (`<component>.host.scss`)

```scss
:host {
  display: block;
  // CSS custom properties for theming
  --component-bg: var(--box-color-surface);
  background: var(--component-bg);
  border-radius: 0; // REQUIRED: no rounded corners
}

:host([variant="primary"]) {
  --component-bg: var(--box-color-primary);
}
```

### Slot Styles (`<component>.slot.scss`)

For styling slotted content (light DOM):

```scss
// Scoped to component - processed by slotStyleService
.content {
  color: var(--box-color-text);
}
```

### Property Naming

Properties with uppercase letters need explicit attribute mapping:

```typescript
@property({ attribute: 'border-color' })
borderColor: string = 'default';
```

### Element Naming

- Component tags: kebab-case ending in `-box` (`button-box`, `card-box`)
- Export constant for tag name: `export const ButtonBox = 'button-box';`

## Storybook

Run: `npx nx storybook web -o`

Stories should demonstrate real-world usage without inline styles:

```typescript
// <component>.stories.ts
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './<component>';

const meta: Meta = {
  title: 'Components/<Component>',
  component: '<component>-box',
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => html`
    <<component>-box variant="primary">
      Content here
    </<component>-box>
  `,
};
```

### Documentation (MDX)

- First `<Source>` block shows import only
- Multi-line `<Source>` blocks: each attribute on own line
- Canvas markup = how consumers integrate

## Testing

Run: `npx nx test web`

Tests use Vitest with jsdom:

```typescript
// <component>.spec.ts
import { describe, it, expect, beforeEach } from 'vitest';
import './<component>';

describe('<component>-box', () => {
  let element: HTMLElement;

  beforeEach(async () => {
    element = document.createElement('<component>-box');
    document.body.appendChild(element);
    await element.updateComplete;
  });

  it('renders with default variant', () => {
    expect(element.getAttribute('variant')).toBe('primary');
  });
});
```

## Adding New Components

1. Create directory: `libs/web/src/<component>/`
2. Create all files matching the file structure above
3. Export from `libs/web/src/index.ts`
4. Add to Storybook navigation if needed

## Exports

- Keep public exports stable
- Update barrel files (`index.ts`) when adding/renaming components
- Path alias: `@box-model/web/*`
