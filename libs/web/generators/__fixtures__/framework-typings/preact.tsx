import type {} from '../../../src/types/preact.js';

export const valid = <tag-box variant="success">Ready</tag-box>;
export const validEvent = (
  <alert-box
    onclose={(event) => {
      const detail: void = event.detail;
      return detail;
    }}
  >
    Ready
  </alert-box>
);

export const validBubbledEvent = (
  <section
    onclose={(event) => {
      const detail: void = event.detail;
      return detail;
    }}
  >
    <alert-box>Ready</alert-box>
  </section>
);

// @ts-expect-error Generated JSX types must reject unknown attribute values.
export const invalid = <tag-box variant="not-a-variant">Invalid</tag-box>;
