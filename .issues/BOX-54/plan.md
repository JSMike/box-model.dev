# Plan: BOX-54 Angular-ready CEM

Decisions (from fable-feedback):

- #1(a): add `.js` export aliases in `generatePackageJson`
- D2: exported alias → reference; unexported → expand
- D3(a): always emit `module` on references
- C3: checker for types; keep Lit `@property` discovery for attributes/reflects
- CEM events = all dispatches; framework typings stay bubbling-only
- D1: single `generate-all.ts` entrypoint

Implementation order: packaging → collector model → events → CEM emitter + envelope → generate-all → verify.
