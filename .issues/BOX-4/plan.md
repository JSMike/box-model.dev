# Plan

1. Separate backdrop-click suppression from Escape-key cancellation so the public attribute name
   matches its behavior.
2. Detect genuine native-dialog backdrop clicks without treating clicks inside dialog content as
   backdrop interactions.
3. Apply the same contract to dialog and drawer and preserve one `close` event per dismissal.
4. Update stories, docs, and unit/browser coverage for backdrop, Escape, and suppression behavior.
