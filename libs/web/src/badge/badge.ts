import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import hostStyles from './badge.host.scss?inline';
import slotStyles from './badge.slot.scss?inline';

export const BadgeBox = 'badge-box';

/**
 * Compact badge for labels and counts.
 * @slot - Default slot content.
 */
@customElement(BadgeBox)
export class Badge extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: BadgeBox,
    });
  }

  override render() {
    return html`<slot></slot>`;
  }
}
