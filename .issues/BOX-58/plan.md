# Plan

1. Inventory the browser APIs used by Box Model components that jsdom does not model completely.
2. Align the library's Vitest setup with Lit's `CSSStyleSheet` shim and add a portable
   `adoptedStyleSheets` implementation.
3. Add a Storybook Test setup page with complete Vitest and Jest examples for stylesheets,
   observers, Web Animations, and native dialogs.
4. Document the narrow `HTMLDialogElement` prototype stub and when a real browser test is required.
5. Build Storybook and run the library test, lint, type-check, and accessibility gates.
