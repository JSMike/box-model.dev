import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './close-control.host.scss?inline';

export const CloseControlBox = 'close-control-box';

/**
 * Accessible close button control.
 * @csspart button - Native button element.
 * @csspart icon - Icon region.
 * @fires close - Fired when the component requests to close (bubbles, composed).
 */
@customElement(CloseControlBox)
export class CloseControl extends LitElement {
  static override styles = unsafeCSS(styles);

  /** Accessible label. */
  @property({ type: String }) public label = 'Close';

  private handleClick() {
    this.dispatchEvent(
      new CustomEvent<void>('close', {
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return html`
      <button type="button" aria-label="${this.label}" @click=${this.handleClick} part="button">
        <span aria-hidden="true" class="close-control__icon" part="icon">
          <svg viewBox="0 0 16 16" role="presentation" aria-hidden="true">
            <line x1="1" y1="1" x2="15" y2="15" />
            <line x1="15" y1="1" x2="1" y2="15" />
          </svg>
        </span>
      </button>
    `;
  }
}
