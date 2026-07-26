# Plan

1. Add theme-aware `shadow.offset` tokens for subtle, default, and prominent boxed surfaces while
   preserving the existing elevation and glow token families.
2. Register the offset shadows with the web theme and add a public surface Sass mixin plus compiled
   utility classes.
3. Adopt the new shadows in card, stat, terminal, and Markdown fenced-code surfaces through
   documented component custom properties, using the shared surface mixin where the full surface
   treatment is intended.
4. Add focused token/style/component tests and a Storybook styles page covering intended usage,
   light/dark behavior, forced-colors behavior, and the distinction from overlay elevation.
5. Rebuild the token and web packages, refresh `@box-model/web` in the Angular CEM example, replace
   its hard-coded section treatment with the public helper, and run repository verification.
