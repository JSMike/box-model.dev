# BOX-56: progress-box lacks an accessible name

<!-- Metadata -->
| Field        | Value        |
|--------------|--------------|
| Status       | ready        |
| Owner        | Agent        |
| Complexity   | low/medium   |
| Created      | 2026-07-13   |
| Source       | Angular CEM integration (BOX-55) |
| External     |              |
| Blocks       |              |
| Blocked-by   |              |
| Priority     | high         |

## Summary

`progress-box` renders an internal element with `role="progressbar"` and value attributes, but provides no accessible name (`aria-label` / `aria-labelledby`). The default slot (label text) is a sibling of the progressbar, so it does not name it. Real-browser AXE reports `aria-progressbar-name`.

## Context

Surfaced while integrating `@box-model/web` into `../angular-cem-example-app` (see `.issues/BOX-55/summary-3.md`). The demo had to mark the custom element presentation-only and add a visually hidden native `<progress>` as a workaround — that is not acceptable as the library API.

Relevant source: `libs/web/src/progress/progress.ts` (track with `role="progressbar"`, header slot as sibling).

## Acceptance Criteria

- [ ] Add a reflected `label` property/attribute (or equivalent naming API) used to set `aria-label` (or wire `aria-labelledby` to a stable labelled element) on the internal progressbar
- [ ] Document the naming API in Storybook / component docs; clarify relationship to the default slot if both remain
- [ ] Add accessibility unit/integration tests that fail when the progressbar has no accessible name and pass with the new API
- [ ] Confirm AXE `aria-progressbar-name` is cleared for the documented usage pattern

## References

- `libs/web/src/progress/progress.ts`
- `.issues/BOX-55/summary-3.md` (Accessibility Integration Notes)
- Demo workaround: `../angular-cem-example-app/src/app/integrations/box-model/box-model-page.html`
