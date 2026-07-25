import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import styles from './dialog-header.host.scss?inline';
import slotStyles from './dialog-header.slot.scss?inline';

export const DialogHeaderBox = 'dialog-header-box';

/**
 * Header layout helper for dialogs.
 * @slot - Default slot content.
 */
@customElement(DialogHeaderBox)
export class DialogHeader extends LitElement {
  static override styles = unsafeCSS(styles);

  override connectedCallback(): void {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: DialogHeaderBox,
    });
  }

  override render() {
    return html`<slot></slot>`;
  }
}
