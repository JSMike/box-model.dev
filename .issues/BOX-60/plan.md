# Plan

1. Secure Markdown rendering by disabling raw HTML, constraining generated attributes, and covering
   both raw-markup and Markdown-attribute injection.
2. Make shipped Sass styles self-contained and add an isolated-package compilation test.
3. Publish and document opt-in React, Preact, and Solid JSX declarations; verify attributes,
   precise direct custom-event listeners, bubbling listeners on ancestors, and both Bundler and
   NodeNext module resolution.
4. Define single-delivery close/input event contracts and add count/target/type assertions.
5. Repair slot-only legends, WYSIWYG accessible names, and form-control examples.
6. Resolve the misleading `card-box` interaction name while the package is still unpublished.
7. Regenerate framework typings and the CEM, rebuild the package, and run all web-library checks.
8. Add a packaged 0.0.1 changelog, document the pre-1.0 SemVer policy, and render it directly below
   Introduction in Storybook.
9. Keep shared implementation directories out of the root barrel and generated npm entrypoints.
