# Styles

## Load the complete system

```scss
@use '@box-model/web/styles/box-model';
```

This emits the Box Model theme variables, automatic light/dark theme selection, global reset, box
layer helpers, and surface utility classes. Load it once at the application boundary.

To force a theme within a scope:

```scss
@use '@box-model/web/styles/box-model-light';
@use '@box-model/web/styles/box-model-dark';
```

Apply the emitted `.box-model-theme-light` or `.box-model-theme-dark` class to the scoped element.
Prefer the complete stylesheet when automatic `prefers-color-scheme` behavior is sufficient.

## Compiled helper classes

### Theme surface

- `.box-model-theme-surface` applies the base font, canvas background, and primary text color.

### Box-model layers

- `.box-model-margin-container`
- `.box-model-border-container`
- `.box-model-padding-container`
- `.box-model-content-container`

These helpers visualize the four CSS box-model layers with themed background, border, and text
colors. Use them for diagrams and teaching surfaces, not general semantic feedback.

### Framed surfaces

```html
<section class="box-model-surface box-model-surface--prominent">
  <h2>Release status</h2>
  <p>Ready to ship.</p>
</section>
```

- `.box-model-surface` applies the canonical square border, surface colors, padding, and default
  crisp offset shadow.
- `.box-model-surface--subtle` selects the compact offset.
- `.box-model-surface--prominent` selects the strongest offset.
- `.box-model-surface--flat` removes the decorative shadow while retaining the boundary.

Customize a utility surface with `--box-model-surface-background`,
`--box-model-surface-border`, `--box-model-surface-color`,
`--box-model-surface-padding`, and `--box-model-surface-shadow`.

## Sass mixins

### Surface

```scss
@use '@box-model/web/styles/surface';

.feature-panel {
  @include surface.frame(prominent, light);
}
```

- `surface.frame($emphasis: default, $mode: dark)` emits the full framed-surface treatment and
  forced-colors fallback.
- `surface.offset-theme($mode)` scopes the `xs`, `sm`, and `md` offset-shadow variables.

The `surface` module is mixin-only. It does not emit the compiled helper classes.

### Theme

```scss
@use '@box-model/web/styles/theme';

.dark-region {
  @include theme.apply-theme(dark);
}

.notice {
  @include theme.property(color, 'box-model-text-secondary');
  @include theme.custom-property('notice-border', 'box-model-border-strong');
}

.box-diagram {
  @include theme.box-model-margin-container;
}
```

Useful mixins include:

- `theme.apply-theme($mode)` and `theme.force-theme($mode)`
- `theme.property($property, $token)`
- `theme.custom-property($name, $token)`
- `theme.feedback-variant($variant, $prefix)`
- `theme.box-model-margin-container`
- `theme.box-model-border-container`
- `theme.box-model-padding-container`
- `theme.box-model-content-container`

Use only registered semantic token names with the theme helpers.

### Typography and reset

```scss
@use '@box-model/web/styles/reset';
@use '@box-model/web/styles/typography';

.application-shell {
  @include reset.box-model-theme-surface;
}

.section-title {
  @include typography.heading('2xl');
}

.code-sample {
  @include typography.monospace;
}
```

Typography mixins include `base-font()`, `heading($size)`, and `monospace()`.

## Component customization

Query the selected component before styling:

```bash
node scripts/inspect-cem.mjs card-box
```

Prefer, in order:

1. Documented component CSS custom properties
2. Semantic Box Model theme variables in a containing scope
3. Documented CSS parts

Do not target undocumented shadow-DOM classes. Components that wrap native controls apply styles
to their light-DOM control; keep the native element inside the component.

## Shadow semantics and accessibility

- Use `--box-model-shadow-offset-*` for bounded content surfaces.
- Keep blurred elevation for dialogs, drawers, tooltips, and other floating overlays.
- Keep glow shadows for `:focus-visible`; decorative shadows never replace focus indicators.
- Forced-colors removes decorative surface shadows and retains system-colored borders.
- Keep corners square (`border-radius: 0`).
