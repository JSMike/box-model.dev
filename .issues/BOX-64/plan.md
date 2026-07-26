# Plan

1. Define a package-owned skill that uses progressive disclosure: a short workflow, a CEM query
   helper, Storybook-derived component examples, and a focused style API reference.
2. Initialize and implement the skill under `libs/web/skills/box-model-web`, keeping generated API
   facts in the manifest rather than duplicating them in prose.
3. Package the skill with `@box-model/web`, expose its files through the package, add the
   `tanstack-intent` discovery keyword, and document how consumers and agents locate it.
4. Add validation for the skill shape, CEM helper, example coverage, and packed artifact contents.
5. Run skill validation, web tests, lint/typecheck, library build, accessibility checks, and
   `npm pack --dry-run`; record the results for review.
