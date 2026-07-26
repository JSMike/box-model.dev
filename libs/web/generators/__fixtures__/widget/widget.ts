import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type WidgetVariant = 'a' | 'b';

export const WidgetBox = 'widget-box';

export class WidgetOpenEvent extends Event {
  constructor() {
    super('open', { bubbles: true, composed: true });
  }
}

/**
 * Widget summary line.
 *
 * Longer description for consumers that read description first.
 *
 * @slot footer - Footer region documented only via JSDoc
 * @csspart chrome - Chrome region documented only via JSDoc
 * @fires change - Emitted when the widget changes
 * @deprecated Prefer NewWidget
 */
@customElement(WidgetBox)
export class Widget extends LitElement {
  /** Relabeled attribute. */
  @property({ attribute: 'data-label' })
  label = 'x';

  /** Object property with no attribute reflection. */
  @property({ attribute: false })
  model: { id: string } = { id: '1' };

  /** Reflected union variant. */
  @property({ reflect: true })
  variant: WidgetVariant = 'a';

  /** Un-annotated numeric property (inferred). */
  @property({ type: Number })
  count = 0;

  /** Getter-only public API. */
  get computed(): string {
    return this.label;
  }

  notify() {
    this.dispatchEvent(
      new CustomEvent<{ id: string }>('change', {
        detail: { id: '1' },
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchEvent(new WidgetOpenEvent());
    this.dispatchEvent(new Event('focus-ready'));
  }

  override render() {
    return html`
      <div part="root body">
        <slot></slot>
        <slot name="actions"></slot>
      </div>
    `;
  }
}
