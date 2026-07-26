import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import styles from './drawer-header.host.scss?inline';
import slotStyles from './drawer-header.slot.scss?inline';

export const DrawerHeaderBox = 'drawer-header-box';

/**
 * Header layout helper for drawers.
 * @slot - Default slot content.
 */
@customElement(DrawerHeaderBox)
export class DrawerHeader extends LitElement {
  static override styles = unsafeCSS(styles);

  override connectedCallback(): void {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: DrawerHeaderBox,
    });
  }

  override render() {
    return html`<slot></slot>`;
  }
}
