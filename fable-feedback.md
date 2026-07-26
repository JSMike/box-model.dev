# Remaining Custom Elements Manifest generator follow-ups

The original review of `libs/web/generators/` led to the BOX-54 and BOX-55 implementation work.
Its Angular-integration blockers, architectural decisions, and pre-ship checklist are complete and
have been removed from this file. The implementation record remains in:

- [BOX-54](.issues/BOX-54/issue.md) and its
  [implementation summary](.issues/BOX-54/summary-1.md)
- [BOX-55](.issues/BOX-55/issue.md) and its session summaries

The items below are the remaining non-blocking opportunities.

## Broader Lit declaration patterns

All current components are modeled correctly, but the collector should be extended before the
library adopts these patterns:

- Decorated getter/setter pairs are not emitted. Getter-only properties are supported and emitted
  as readonly.
- Members inherited from future component base classes or mixins are not flattened or represented
  with `inheritedFrom`.
- A custom Lit `converter` can give an attribute a different serialized domain from its property.
  The collector currently mirrors the property type onto the attribute, which would be misleading
  for a converter-backed attribute.

These are not current `0.0.1` defects: the component sources do not presently use these patterns.

## Additional CEM completeness

The manifest does not yet emit the following optional metadata:

- public class methods;
- declaration `source` links;
- `cssStates` for future `ElementInternals.states` usage.

Angular local references receive the real class type from the package declarations, so omitted
method records do not reduce Angular template typing. These additions primarily benefit generic
CEM documentation and analysis tools.

## CSS metadata extraction

CSS custom-property extraction currently reads the primary `:host` block in each
`*.host.scss` file and filters names using the component tag stem. It does not discover properties
introduced only in variant host blocks, slot styles, or nested Sass mixins. It also does not emit
the optional CEM `syntax` field.

This is documentation completeness rather than an Angular integration concern because Angular
does not consume CSS metadata for template checking.

## Dynamic slot and part metadata

Static slots, whitespace-separated part names, and JSDoc-only additions are supported. Dynamic
template values such as `part=${...}` or `<slot name=${...}>` must still be documented with
`@csspart` or `@slot`.

The collector does not currently warn about a dynamic value unless a JSDoc-only entry is merged.
A focused diagnostic and fixture would make an undocumented dynamic slot or part easier to catch.

## Automated cross-consumer verification

Potential additional release/CI guards:

- Import each built component module in a DOM-capable test environment and compare
  `customElements.get(tagName)` with every generated `custom-element-definition` export.
- Run `web:generate-types` as an explicit CI lane rather than relying on `build-lib` to invoke it.
- Add an Angular compile fixture owned by this repository, or automate the existing
  `../angular-cem-example-app` integration, to pin package resolution, referenced type aliases,
  static-value checks, event types, readonly rejection, and local-reference typing.
- Optionally compare the custom generator with `@custom-elements-manifest/analyzer` periodically as
  a gap-detection exercise without adopting its output as authoritative.

None of these items block the initial package release. Strict generation, schema validation,
generator fixtures, package build/packing, and the external Angular integration already cover the
current component and CEM surface.
