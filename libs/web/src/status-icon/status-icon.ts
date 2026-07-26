import { html, LitElement, nothing, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import styles from './status-icon.host.scss?inline';
import slotStyles from './status-icon.slot.scss?inline';

export type StatusIconVariant = 'info' | 'success' | 'warning' | 'danger' | 'custom';

export const StatusIconBox = 'status-icon-box';

/**
 * Status glyph for feedback variants.
 * @slot - Default slot content.
 * @csspart glyph - Status glyph.
 */
@customElement(StatusIconBox)
export class StatusIcon extends LitElement {
  static override styles = unsafeCSS(styles);

  /** Visual variant of the component. */
  @property({ type: String, reflect: true }) public variant: StatusIconVariant = 'info';
  /** Accessible label. */
  @property({ type: String }) public label?: string;

  override connectedCallback(): void {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: StatusIconBox,
    });
  }
  private getDefaultIcon(): string {
    switch (this.variant) {
      case 'success':
        return '✓';
      case 'warning':
        return '!';
      case 'danger':
        return '𐌢';
      case 'info':
      default:
        return 'i';
    }
  }

  override render() {
    if (this.variant === 'custom') {
      return html`<slot></slot>`;
    }

    const glyph = this.getDefaultIcon();
    const ariaLabel = this.label ?? nothing;

    return html`
      <span
        class="status-icon__glyph"
        part="glyph"
        role="img"
        aria-label=${ariaLabel}
        aria-hidden=${this.label ? 'false' : 'true'}
      >
        ${glyph}
      </span>
    `;
  }
}
